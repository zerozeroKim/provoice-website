import { useEffect, useRef, useState, type ElementType } from 'react';
import { Play, Square } from 'lucide-react';
import { Select } from '../../components';
import styles from './VoicePreviewSection.module.css';

const presets = [
  { label: '게임 안내음성', text: '환영합니다, 모험가여. 새로운 여정이 지금 시작됩니다.' },
  { label: '광고 내레이션', text: '지금 이 순간, 특별한 혜택을 놓치지 마세요.' },
  { label: '캐릭터 대사', text: '이 정도 시련쯤이야, 얼마든지 넘어서 주지.' },
] as const;

const MAX_LENGTH = 180;
const BAR_COUNT = 32;

export function VoicePreviewSection({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const Heading = `h${headingLevel}` as ElementType;
  const [activePreset, setActivePreset] = useState(0);
  const [text, setText] = useState<string>(presets[0].text);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setSupported(false);
      return;
    }
    const loadVoices = () => {
      const all = window.speechSynthesis.getVoices();
      const korean = all.filter((voice) => voice.lang.toLowerCase().startsWith('ko'));
      setVoices(korean.length > 0 ? korean : all);
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const selectPreset = (index: number) => {
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
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setPlaying(true);
  };

  return (
    <section className={styles.section} aria-label="AI 보이스 미리듣기">
      <div className={styles.inner}>
        <div className={styles.eyebrow}><span />AI VOICE PREVIEW</div>
        <Heading className={styles.title}>성우 캐스팅 전, 톤을 먼저 확인해보세요</Heading>
        <p className={styles.description}>문장을 입력하면 브라우저에 내장된 음성 엔진이 즉시 읽어드립니다. 원하는 톤과 스타일을 캐스팅 전에 가늠해보는 용도입니다.</p>

        <div className={styles.panel}>
          <div className={styles.controls}>
            <span className={styles.label}>읽어드릴 문장</span>
            <div className={styles.presetRow}>
              {presets.map((preset, index) => (
                <button key={preset.label} type="button" className={index === activePreset ? styles.presetActive : styles.preset} aria-pressed={index === activePreset} onClick={() => selectPreset(index)}>{preset.label}</button>
              ))}
            </div>
            <textarea
              className={styles.textarea}
              value={text}
              maxLength={MAX_LENGTH}
              onChange={(event) => setText(event.target.value)}
              aria-label="읽어드릴 문장"
            />
            <div className={styles.meta}>
              <span>{text.length} / {MAX_LENGTH}</span>
              <span>브라우저 내장 음성 엔진 사용</span>
            </div>
            <div className={styles.playRow}>
              <Select className={styles.voiceSelect} aria-label="음성 선택" value={voiceIndex} onChange={(event) => setVoiceIndex(Number(event.target.value))} disabled={voices.length === 0}>
                {voices.length === 0 && <option>사용 가능한 음성이 없습니다</option>}
                {voices.map((voice, index) => <option key={`${voice.name}-${voice.lang}`} value={index}>{voice.name} ({voice.lang})</option>)}
              </Select>
              <button type="button" className={styles.playButton} onClick={togglePlay} disabled={!supported || voices.length === 0}>
                {playing ? <Square size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                {playing ? '중지' : '미리듣기'}
              </button>
            </div>
          </div>

          <div className={styles.visualizer}>
            <div className={styles.waveBox} aria-hidden="true">
              <div className={playing ? styles.waveActive : styles.wave}>
                {Array.from({ length: BAR_COUNT }).map((_, index) => <span key={index} style={{ animationDelay: `${index * 0.045}s` }} />)}
              </div>
            </div>
            <p className={styles.status}>{supported ? (playing ? '재생 중 — 목소리를 들어보세요' : '대기 중 — 미리듣기를 눌러보세요') : '이 브라우저에서는 음성 미리듣기를 지원하지 않습니다'}</p>
            <hr className={styles.divider} />
            <p className={styles.disclaimer}>기기에 설치된 음성 엔진을 사용하므로 브라우저·운영체제에 따라 목소리가 다르게 들릴 수 있으며, 실제 성우 캐스팅 품질과는 별개입니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
