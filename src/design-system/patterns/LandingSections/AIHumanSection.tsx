import { useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { Pause, Play } from 'lucide-react';
import { useLanguage, useT } from '@/lib/i18n';
import { SectionHeader } from '../../components';
import styles from './AIHumanSection.module.css';

const WAVE_BAR_COUNT = 28;

const stats = [
  { value: '3주 → 5일', valueEn: '3 weeks → 5 days', label: '일정이 빠듯한 프로젝트도 여유 있게 끝냅니다 (예시 · 프로젝트 규모에 따라 상이)', labelEn: 'Even tight-deadline projects finish with room to spare (example — varies by project size)' },
  { value: '약 35% ↓', valueEn: '~35% ↓', label: '예산 안에서 더 많은 서브 캐릭터를 채울 수 있습니다 (예시)', labelEn: 'Fill more supporting characters within budget (example)' },
  { value: '메인 = 성우', valueEn: 'Lead = Voice Actor', label: '핵심 연기는 언제나 사람의 몫입니다', labelEn: 'The key performance is always a human’s job' },
] as const;

const AI_SUB_CHARACTER_LINE_KO = '이 대사는 서브 캐릭터를 위해 AI가 생성한 목소리입니다. 톤과 속도는 프로젝트에 맞게 조정할 수 있어요.';
const AI_SUB_CHARACTER_LINE_EN = 'This line is an AI-generated voice for a supporting character. Tone and pace can be tuned to fit the project.';

export function AIHumanSection({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const t = useT();
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [burst, setBurst] = useState(0);

  const moveGlow = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--glow-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--glow-y', `${event.clientY - bounds.top}px`);
  };

  const toggleAIPreview = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    setBurst((value) => value + 1);
    const utterance = new SpeechSynthesisUtterance(language === 'en' ? AI_SUB_CHARACTER_LINE_EN : AI_SUB_CHARACTER_LINE_KO);
    const voice = window.speechSynthesis.getVoices().find((item) => item.lang.toLowerCase().startsWith(language === 'en' ? 'en' : 'ko'));
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
    <section
      id="ai-dubbing-pack"
      ref={sectionRef}
      className={styles.section}
      onPointerMove={moveGlow}
      onPointerLeave={() => { sectionRef.current?.style.removeProperty('--glow-x'); sectionRef.current?.style.removeProperty('--glow-y'); }}
      aria-label={t('AI × Human 제작 방식 비교', 'AI × Human production comparison')}
    >
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.blob1} />
        <span className={styles.blob2} />
        <span className={styles.blob3} />
        <div className={styles.pointerGlow} />
        {burst > 0 && <div key={burst} className={styles.burst} />}
      </div>
      <div className={styles.inner}>
        <SectionHeader
          className={styles.header}
          headingLevel={headingLevel}
          eyebrow="AI × HUMAN"
          title={t('같은 대사, 두 가지 제작 방식', 'Same lines, two production methods')}
          description={t('메인 캐릭터는 성우가 그대로 맡고, 대사가 많은 서브 캐릭터 구간만 AI로 채우면 무엇이 달라질까요.', "What changes when the lead character stays with the voice actor, but AI fills in the dialogue-heavy supporting roles?")}
        />

        <div className={styles.comparison}>
          <article className={styles.card}>
            <span className={styles.kicker}>{t('기존 방식', 'Traditional')}</span>
            <div className={styles.cardHead}>
              <div><h3>{t('성우 단독 제작', 'Voice actor only')}</h3><p>{t('모든 대사를 전문 성우가 녹음', 'A professional voice actor records every line')}</p></div>
              <i>A</i>
            </div>
            <div className={styles.track} aria-hidden="true"><span /></div>
            <div className={styles.playRow}>
              <button type="button" disabled aria-label={t('실제 성우 음원 준비 중', 'Real voice sample coming soon')}><Play fill="currentColor" size={14} /></button>
              <span>{t('실제 성우 음원 준비 중', 'Real voice sample coming soon')}</span>
            </div>
          </article>

          <span className={styles.vsBadge} aria-hidden="true">VS</span>

          <article className={`${styles.card} ${styles.hybrid}`}>
            <span className={`${styles.kicker} ${styles.kickerHybrid}`}>{t('AI 적용 시', 'With AI')}</span>
            <div className={styles.cardHead}>
              <div><h3>{t('성우 + AI 하이브리드', 'Voice actor + AI hybrid')}</h3><p>{t('메인은 성우, 서브 캐릭터는 AI', 'Lead by a voice actor, supporting characters by AI')}</p></div>
              <i>B</i>
            </div>
            {playing ? (
              <div className={styles.waveRow} aria-hidden="true">
                {Array.from({ length: WAVE_BAR_COUNT }).map((_, index) => (
                  <span key={index} style={{ '--bar-height': `${10 + ((Math.sin(index * 2.1 + .6) + 1) / 2) ** 1.4 * 34}px`, animationDelay: `${-index * .15}s` } as CSSProperties} />
                ))}
              </div>
            ) : (
              <div className={`${styles.track} ${styles.trackActive}`} aria-hidden="true"><span /></div>
            )}
            <div className={styles.playRow}>
              <button type="button" onClick={toggleAIPreview} aria-pressed={playing} aria-label={playing ? t('AI 서브캐릭터 대사 정지', 'Stop AI supporting-character line') : t('AI 서브캐릭터 대사 미리듣기', 'Preview AI supporting-character line')}>
                {playing ? <Pause fill="currentColor" size={14} /> : <Play fill="currentColor" size={14} />}
              </button>
              <span>{playing ? t('재생 중 — AI 서브캐릭터 목소리', 'Playing — AI supporting-character voice') : t('AI 서브캐릭터 대사 미리듣기', 'Preview AI supporting-character line')}</span>
            </div>
          </article>
        </div>

        <div className={styles.stats}>
          {stats.map((stat) => (
            <div className={styles.stat} key={stat.value}>
              <strong>{t(stat.value, stat.valueEn)}</strong>
              <p>{t(stat.label, stat.labelEn)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
