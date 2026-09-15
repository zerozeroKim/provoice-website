import { useEffect, useState, type CSSProperties } from 'react';
import { Gamepad2, Megaphone, Smile, Play, Square } from 'lucide-react';
import { Button, Chip, SectionHeader, Select } from '../../components';
import styles from './VoicePreviewSection.module.css';

const presets = [
  { icon: Gamepad2, label: '게임 안내음성', text: '환영합니다, 모험가여. 새로운 여정이 지금 시작됩니다.' },
  { icon: Megaphone, label: '광고 내레이션', text: '지금 이 순간, 특별한 혜택을 놓치지 마세요.' },
  { icon: Smile, label: '캐릭터 대사', text: '이 정도 시련쯤이야, 얼마든지 넘어서 주지.' },
] as const;

const MAX_LENGTH = 180;
const BAR_COUNT = 32;

export function VoicePreviewSection({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const [activePreset, setActivePreset] = useState(0);
  const [text, setText] = useState<string>(presets[0].text);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setSupported(false);
      return;
    }
    const loadVoices = () => {
      const all = window.speechSynthesis.getVoices();
      const byName = (a: SpeechSynthesisVoice, b: SpeechSynthesisVoice) => a.name.localeCompare(b.name);
      const korean = all.filter((voice) => voice.lang.toLowerCase().startsWith('ko')).sort(byName);
      const others = all.filter((voice) => !voice.lang.toLowerCase().startsWith('ko')).sort(byName);
      setVoices([...korean, ...others]);
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const selectPreset = (index: number) => {
    if (supported) window.speechSynthesis.cancel();
    setPlaying(false);
    setProgress(0);
    setActivePreset(index);
    setText(presets[index].text);
  };

  const togglePlay = () => {
    if (!supported) return;
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    if (!text.trim()) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices[voiceIndex];
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }
    setProgress(0);
    utterance.onboundary = (event) => setProgress(Math.min(100, (event.charIndex / text.length) * 100));
    utterance.onend = () => { setPlaying(false); setProgress(100); };
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setPlaying(true);
  };

  return (
    <section className={styles.section} aria-label="AI 보이스 미리듣기">
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.blob1} />
        <span className={styles.blob2} />
        <span className={styles.blob3} />
      </div>
      <div className={styles.inner}>
        <SectionHeader
          headingLevel={headingLevel}
          eyebrow="AI VOICE PREVIEW"
          title="성우 캐스팅 전, 톤을 먼저 확인해보세요"
          description="문장을 입력하면 브라우저에 내장된 음성 엔진이 즉시 읽어드립니다. 원하는 톤과 스타일을 캐스팅 전에 가늠해보는 용도입니다."
        />

        <div className={styles.panel}>
          <div className={styles.controls}>
            <div className={styles.controlHeader}><span className={styles.label}>읽어드릴 문장</span><span className={styles.stepHint}>01 · 문장과 목소리 선택</span></div>
            <div className={styles.presetRow} role="group" aria-label="예시 문장 선택">
              {presets.map((preset, index) => (
                <Chip className={styles.presetChip} leadingIcon={<preset.icon size={15} />} key={preset.label} selected={index === activePreset} onClick={() => selectPreset(index)}>{preset.label}</Chip>
              ))}
            </div>
            <textarea
              className={styles.textarea}
              value={text}
              maxLength={MAX_LENGTH}
              onChange={(event) => { window.speechSynthesis?.cancel(); setPlaying(false); setProgress(0); setActivePreset(-1); setText(event.target.value); }}
              aria-label="읽어드릴 문장"
            />
            <div className={styles.meta}>
              <span>{text.length} / {MAX_LENGTH}</span>
              <span>브라우저 내장 음성 엔진 사용</span>
            </div>
            <div className={styles.playRow}>
              <Select className={styles.voiceSelect} aria-label="음성 선택" value={voiceIndex} onChange={(event) => { window.speechSynthesis.cancel(); setPlaying(false); setProgress(0); setVoiceIndex(Number(event.target.value)); }} disabled={voices.length === 0}>
                {voices.length === 0 && <option>사용 가능한 음성이 없습니다</option>}
                {voices.map((voice, index) => <option key={`${voice.name}-${voice.lang}`} value={index}>{voice.name} ({voice.lang})</option>)}
              </Select>
              <Button className={styles.playButton} leadingIcon={playing ? <Square size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />} onClick={togglePlay} disabled={!supported || voices.length === 0 || !text.trim()}>
                {playing ? '중지' : '미리듣기'}
              </Button>
            </div>
          </div>

          <div className={styles.visualizer}>
            <div className={styles.monitorHeader}>VOICE STUDIO</div>
            <div className={styles.waveBox} aria-hidden="true">
              <span className={styles.previewLabel}>{activePreset >= 0 ? presets[activePreset].label : '직접 입력한 문장'}</span>
              <div className={playing ? styles.waveActive : styles.wave}>
                {Array.from({ length: BAR_COUNT }).map((_, index) => <span key={index} style={{ '--bar-height': `${18 + Math.sin(index * 1.8) ** 2 * 52 + Math.sin(index * .35) ** 2 * 28}px`, animationDelay: `${-index * .17}s`, animationDuration: playing ? `${.65 + (index % 5) * .16}s` : '4s' } as CSSProperties} />)}
              </div>
            </div>
            <p key={text} className={styles.scriptPreview}>{text.trim() || '왼쪽에 문장을 입력해보세요'}</p>
            <div className={styles.progressTrack} aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
            <div className={styles.visualizerFooter}>
              <p className={styles.status} role="status">{supported ? (playing ? '재생 중 — 목소리를 들어보세요' : progress === 100 ? '다른 문장으로도 비교해보세요' : '미리듣기를 누르면 선택한 문장을 읽어드려요') : '이 브라우저에서는 음성 미리듣기를 지원하지 않습니다'}</p>
              <hr className={styles.divider} />
              <p className={styles.disclaimer}>기기에 설치된 음성 엔진을 사용하므로 브라우저·운영체제에 따라 목소리가 다르게 들릴 수 있으며, 실제 성우 캐스팅 품질과는 별개입니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
