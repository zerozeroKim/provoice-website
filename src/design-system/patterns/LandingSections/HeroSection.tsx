import Particles from '@/components/reactbits/Particles';
import { useT } from '@/lib/i18n';
import styles from './HeroSection.module.css';
import type { HeroStat } from './types';
import type { ElementType } from 'react';
import shared from './HeroShared.module.css';

const particleColors = ['#1c1030', '#8038ff', '#fe6fff'];

const statEn: Record<string, { value: string; label: string }> = {
  '글로벌 성우': { value: '1,000+', label: 'Global Voice Actors' },
  '서비스 언어': { value: '30 Countries', label: 'Languages Served' },
  '국제 인증': { value: 'ISO 17100', label: 'International Certification' },
  '수출바우처 공정 수혜기관': { value: '4 Years Running', label: 'Export Voucher Program Partner' },
};

export function HeroSection({ stats, headingLevel = 1 }: { stats: HeroStat[]; headingLevel?: 1 | 2 }) {
  const t = useT();
  const Heading = `h${headingLevel}` as ElementType;
  return (
    <section className={styles.hero} aria-label={t('프로보이스 히어로 섹션', 'Provoice hero section')}>
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
            <span>{t('글로벌 성우 더빙 No.1', 'The #1 Global Voice Dubbing')}</span>
            <span className={shared.gradientText}>{t('& ISO 인증 전문 번역', '& ISO-Certified Translation')}</span>
          </Heading>
          <p className={shared.description}>
            {t('ISO 17100 인증 번역부터 30개국 원어민 성우 녹음,', 'From ISO 17100-certified translation to native voice recording in 30 countries,')}
            <br />
            {t('게임 사운드 제작까지 — 프로보이스의 원스탑 로컬라이징 솔루션.', 'to game sound production — Provoice is your one-stop localization solution.')}
          </p>
          <div className={shared.ctaRow}>
            <button type="button" className={shared.primaryButton}>{t('프로젝트 의뢰하기', 'Start a Project')}</button>
            <button type="button" className={shared.secondaryButton}>{t('성우 디렉토리 보기', 'Browse Voice Actors')}</button>
          </div>
          <div className={styles.stats}>
            {stats.map((stat) => {
              const en = statEn[stat.label];
              return (
                <div key={stat.label} className={styles.statItem}>
                  <strong>{en ? t(stat.value, en.value) : stat.value}</strong>
                  <span>{en ? t(stat.label, en.label) : stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
