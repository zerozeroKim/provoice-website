import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { SectionHeader } from '../../components';
import styles from './AIHumanSection.module.css';

const stats = [
  { value: '3주 → 5일', label: '일정이 빠듯한 프로젝트도 여유 있게 끝냅니다 (예시 · 프로젝트 규모에 따라 상이)' },
  { value: '약 35% ↓', label: '예산 안에서 더 많은 서브 캐릭터를 채울 수 있습니다 (예시)' },
  { value: '메인 = 성우', label: '핵심 연기는 언제나 사람의 몫입니다' },
] as const;

const AI_SUB_CHARACTER_LINE = '이 대사는 서브 캐릭터를 위해 AI가 생성한 목소리입니다. 톤과 속도는 프로젝트에 맞게 조정할 수 있어요.';

export function AIHumanSection({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const [playing, setPlaying] = useState(false);

  const toggleAIPreview = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(AI_SUB_CHARACTER_LINE);
    const voice = window.speechSynthesis.getVoices().find((item) => item.lang.toLowerCase().startsWith('ko'));
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
    <section className={styles.section} aria-label="AI × Human 제작 방식 비교">
      <div className={styles.inner}>
        <SectionHeader
          className={styles.header}
          headingLevel={headingLevel}
          eyebrow="AI × HUMAN"
          title="같은 대사, 두 가지 제작 방식"
          description="메인 캐릭터는 성우가 그대로 맡고, 대사가 많은 서브 캐릭터 구간만 AI로 채우면 무엇이 달라질까요."
        />

        <div className={styles.comparison}>
          <article className={styles.card}>
            <div className={styles.cardHead}>
              <div><h3>성우 단독 제작</h3><p>모든 대사를 전문 성우가 녹음</p></div>
              <i>A</i>
            </div>
            <div className={styles.track} aria-hidden="true"><span /></div>
            <div className={styles.playRow}>
              <button type="button" disabled aria-label="실제 성우 음원 준비 중"><Play fill="currentColor" size={14} /></button>
              <span>실제 성우 음원 준비 중</span>
            </div>
          </article>

          <article className={`${styles.card} ${styles.hybrid}`}>
            <div className={styles.cardHead}>
              <div><h3>성우 + AI 하이브리드</h3><p>메인은 성우, 서브 캐릭터는 AI</p></div>
              <i>B</i>
            </div>
            <div className={`${styles.track} ${styles.trackActive} ${playing ? styles.trackPlaying : ''}`} aria-hidden="true"><span /></div>
            <div className={styles.playRow}>
              <button type="button" onClick={toggleAIPreview} aria-pressed={playing} aria-label={playing ? 'AI 서브캐릭터 대사 정지' : 'AI 서브캐릭터 대사 미리듣기'}>
                {playing ? <Pause fill="currentColor" size={14} /> : <Play fill="currentColor" size={14} />}
              </button>
              <span>{playing ? '재생 중 — AI 서브캐릭터 목소리' : 'AI 서브캐릭터 대사 미리듣기'}</span>
            </div>
          </article>
        </div>

        <div className={styles.stats}>
          {stats.map((stat) => (
            <div className={styles.stat} key={stat.value}>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
