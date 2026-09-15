import { Play } from 'lucide-react';
import { SectionHeader } from '../../components';
import styles from './AIHumanSection.module.css';

const stats = [
  { value: '3주 → 5일', label: '일정이 빠듯한 프로젝트도 여유 있게 끝냅니다 (예시 · 프로젝트 규모에 따라 상이)' },
  { value: '약 35% ↓', label: '예산 안에서 더 많은 서브 캐릭터를 채울 수 있습니다 (예시)' },
  { value: '메인 = 성우', label: '핵심 연기는 언제나 사람의 몫입니다' },
] as const;

export function AIHumanSection({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
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
            <div className={`${styles.track} ${styles.trackActive}`} aria-hidden="true"><span /></div>
            <div className={styles.playRow}>
              <button type="button" aria-label="AI 서브캐릭터 대사 미리듣기"><Play fill="currentColor" size={14} /></button>
              <span>AI 서브캐릭터 대사 미리듣기</span>
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
