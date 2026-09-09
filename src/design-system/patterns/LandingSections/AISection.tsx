import GradientWaves from '@/components/reactbits/GradientWaves';
import shared from './HeroShared.module.css';
import styles from './AISection.module.css';

export function AISection() {
  return (
    <section className={styles.aiHero} aria-label="PROVOICE × AI">
      <div className={styles.aiWave} aria-hidden="true">
        <GradientWaves
          horizonColor="#ffffff"
          waveColor="#e8dcff"
          crestColor="#f3d8ff"
          speed={0.4}
          amplitude={2.4}
          waveScale={0.55}
          waveRatio={0.9}
          swell={30}
          turbulence={18}
          tilt={1.15}
          zoom={1.05}
          height={4.2}
          fogDepth={19}
          detail="medium"
          brightness={1.08}
          opacity={0.72}
          mouseInteraction
          parallaxStrength={0.5}
          grain
          grainIntensity={0.015}
        />
      </div>
      <div className={shared.heroInner}>
        <div className={shared.copy}>
          <div className={`${shared.kicker} ${styles.kicker}`}>PROVOICE × AI</div>
          <h1 className={`${shared.title} ${styles.title}`}>
            <span>AI와 사람이 함께 완성하는</span>
            <span className={shared.gradientText}>다음 세대의 목소리</span>
          </h1>
          <p className={`${shared.description} ${styles.description}`}>
            대사가 많은 서브 캐릭터와 반복 작업은 AI로 속도를 높이고,
            <br />
            감정이 중요한 장면은 성우의 연기로 완성하는 하이브리드 더빙입니다.
          </p>
          <div className={shared.ctaRow}>
            <button type="button" className={shared.primaryButton}>AI 하이브리드 더빙 문의하기</button>
            <button type="button" className={`${shared.secondaryButton} ${styles.secondaryButton}`}>적용 사례 보기</button>
          </div>
        </div>
      </div>
    </section>
  );
}
