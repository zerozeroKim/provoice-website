import MagicRings from '@/components/reactbits/MagicRings';
import { useIsMobile } from '@/hooks/use-mobile';
import styles from './LandingSections.module.css';
import type { HeroStat } from './types';

export function HeroSection({ stats }: { stats: HeroStat[] }) {
  const isMobile = useIsMobile();
  return (
    <section className={styles.hero} aria-label="프로보이스 히어로 섹션">
      <div className={styles.heroWave} aria-hidden="true">
        <MagicRings
          color="#8038FF"
          colorTwo="#C34DFF"
          ringCount={isMobile ? 3 : 4}
          speed={0.55}
          attenuation={8}
          lineThickness={isMobile ? 1.4 : 2}
          baseRadius={isMobile ? 0.22 : 0.6}
          radiusStep={isMobile ? 0.05 : 0.09}
          scaleRate={0.12}
          opacity={0.7}
          blur={3}
          noiseAmount={0.04}
          ringGap={1.4}
        />
      </div>
      <div className={styles.heroInner}>
        <div className={styles.copy}>
          <div className={styles.kicker}>MULTILINGUAL VOICE LOCALIZATION</div>
          <h1 className={styles.title}>
            <span>글로벌 성우 더빙 No.1</span>
            <span className={styles.gradientText}>&amp; ISO 인증 전문 번역</span>
          </h1>
          <p className={styles.description}>
            ISO 17100 인증 번역부터 30개국 원어민 성우 녹음,
            <br />
            게임 사운드 제작까지 — 프로보이스의 원스탑 로컬라이징 솔루션.
          </p>
          <div className={styles.ctaRow}>
            <button type="button" className={styles.primaryButton}>프로젝트 의뢰하기</button>
            <button type="button" className={styles.secondaryButton}>성우 디렉토리 보기</button>
          </div>
          <div className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
