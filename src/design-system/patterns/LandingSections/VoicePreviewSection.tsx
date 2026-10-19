import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Gamepad2, Megaphone, Smile } from 'lucide-react';
import { useLanguage, useT } from '@/lib/i18n';
import { Chip, SectionHeader, Select } from '../../components';
import styles from './VoicePreviewSection.module.css';

const presets = [
  { icon: Gamepad2, label: '게임 안내음성', labelEn: 'Game Guide Voice', text: '환영합니다, 모험가여. 새로운 여정이 지금 시작됩니다.', textEn: 'Welcome, adventurer. A new journey begins now.' },
  { icon: Megaphone, label: '광고 내레이션', labelEn: 'Ad Narration', text: '지금 이 순간, 특별한 혜택을 놓치지 마세요.', textEn: "Right now, don't miss this special offer." },
  { icon: Smile, label: '캐릭터 대사', labelEn: 'Character Line', text: '이 정도 시련쯤이야, 얼마든지 넘어서 주지.', textEn: "A trial like this? I'll overcome it, no matter how many times it takes." },
] as const;

const MAX_LENGTH = 180;

export function VoicePreviewSection({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const t = useT();
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [burst, setBurst] = useState(0);
  const moveGlow = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--glow-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--glow-y', `${event.clientY - bounds.top}px`);
  };
  const [activePreset, setActivePreset] = useState(0);
  const [text, setText] = useState<string>(language === 'en' ? presets[0].textEn : presets[0].text);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceIndex, setVoiceIndex] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const loadVoices = () => {
      const all = window.speechSynthesis.getVoices();
      const byName = (a: SpeechSynthesisVoice, b: SpeechSynthesisVoice) => a.name.localeCompare(b.name);
      const korean = all.filter((voice) => voice.lang.toLowerCase().startsWith('ko')).sort(byName);
      const others = all.filter((voice) => !voice.lang.toLowerCase().startsWith('ko')).sort(byName);
      setVoices([...korean, ...others]);
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const selectPreset = (index: number) => {
    setBurst(value => value + 1);
    setActivePreset(index);
    setText(language === 'en' ? presets[index].textEn : presets[index].text);
  };

  return (
    <section ref={sectionRef} className={styles.section} onPointerMove={moveGlow} onPointerLeave={() => { sectionRef.current?.style.removeProperty('--glow-x'); sectionRef.current?.style.removeProperty('--glow-y'); }} aria-label={t('AI 보이스 미리듣기', 'AI voice preview')}>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.blob1} />
        <span className={styles.blob2} />
        <span className={styles.blob3} />
        <div className={styles.pointerGlow} />
        {burst > 0 && <div key={burst} className={styles.burst} />}
      </div>
      <div className={styles.inner}>
        <SectionHeader
          headingLevel={headingLevel}
          eyebrow="AI VOICE PREVIEW"
          title={t('성우 캐스팅 전, 톤을 먼저 확인해보세요', 'Check the tone before you cast a voice actor')}
          description={t('문장을 입력하면 브라우저에 내장된 음성 엔진이 즉시 읽어드립니다. 원하는 톤과 스타일을 캐스팅 전에 가늠해보는 용도입니다.', 'Type a sentence and your browser’s built-in voice engine reads it back instantly — a quick way to gauge tone and style before casting.')}
        />

        <div className={styles.panel}>
          <div className={styles.controls}>
            <div className={styles.controlHeader}><span className={styles.label}>{t('읽어드릴 문장', 'Sentence to read')}</span><span className={styles.stepHint}>{t('01 · 문장과 목소리 선택', '01 · Choose sentence and voice')}</span></div>
            <div className={styles.presetRow} role="group" aria-label={t('예시 문장 선택', 'Choose a sample sentence')}>
              {presets.map((preset, index) => (
                <Chip className={styles.presetChip} leadingIcon={<preset.icon size={15} />} key={preset.label} selected={index === activePreset} onClick={() => selectPreset(index)}>{t(preset.label, preset.labelEn)}</Chip>
              ))}
            </div>
            <textarea
              className={styles.textarea}
              value={text}
              maxLength={MAX_LENGTH}
              onChange={(event) => { setActivePreset(-1); setText(event.target.value); }}
              aria-label={t('읽어드릴 문장', 'Sentence to read')}
            />
            <div className={styles.meta}>
              <span>{text.length} / {MAX_LENGTH}</span>
              <span>{t('브라우저 내장 음성 엔진 사용', "Uses your browser's built-in voice engine")}</span>
            </div>
            <div className={styles.playRow}>
              <Select className={styles.voiceSelect} aria-label={t('음성 선택', 'Choose a voice')} value={voiceIndex} onChange={(event) => setVoiceIndex(Number(event.target.value))} disabled={voices.length === 0}>
                {voices.length === 0 && <option>{t('사용 가능한 음성이 없습니다', 'No voices available')}</option>}
                {voices.map((voice, index) => <option key={`${voice.name}-${voice.lang}`} value={index}>{voice.name} ({voice.lang})</option>)}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
