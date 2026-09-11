import Particles from '@/components/reactbits/Particles';
import styles from './HeroSection.module.css';
import type { HeroStat } from './types';
import type { ElementType } from 'react';
import shared from './HeroShared.module.css';

const particleColors = ['#1c1030', '#8038ff', '#fe6fff'];

export function HeroSection({ stats, headingLevel = 1 }: { stats: HeroStat[]; headingLevel?: 1 | 2 }) {
  const Heading = `h${headingLevel}` as ElementType;
  return (
    <section className={styles.hero} aria-label="프로보이스 히어로 섹션">
      <div className={styles.heroWave} aria-hidden="true">
        <Particles
          particleColors={particleColors}
          particleCount={500}
          particleSpread={10}
          speed={0.7}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles
          disableRotation={false}
        />
      </div>
      <div className={shared.heroInner}>
        <div className={shared.copy}>
          <div className={shared.kicker}>MULTILINGUAL VOICE LOCALIZATION</div>
          <Heading className={shared.title}>
            <span>글로벌 성우 더빙 No.1</span>
            <span className={shared.gradientText}>&amp; ISO 인증 전문 번역</span>
          </Heading>
          <p className={shared.description}>
            ISO 17100 인증 번역부터 30개국 원어민 성우 녹음,
            <br />
            게임 사운드 제작까지 — 프로보이스의 원스탑 로컬라이징 솔루션.
          </p>
          <div className={shared.ctaRow}>
            <button type="button" className={shared.primaryButton}>프로젝트 의뢰하기</button>
            <button type="button" className={shared.secondaryButton}>성우 디렉토리 보기</button>
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
