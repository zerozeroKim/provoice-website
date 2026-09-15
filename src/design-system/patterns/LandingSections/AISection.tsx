import { Info } from 'lucide-react';
import GradientWaves from '@/components/reactbits/GradientWaves';
import { SectionHeader } from '../../components';
import styles from './AISection.module.css';

export function AISection({ headingLevel = 1 }: { headingLevel?: 1 | 2 }) {
  return (
    <section className={styles.aiHero} aria-label="PROVOICE × AI">
      <div className={styles.aiWave} aria-hidden="true">
        <GradientWaves horizonColor="#ffffff" waveColor="#7047eb" crestColor="#d95fe8" speed={0.4} amplitude={2.4} waveScale={0.55} waveRatio={0.9} swell={30} turbulence={18} tilt={1.15} zoom={1.05} height={4.2} fogDepth={23} detail="medium" brightness={1.06} opacity={0.86} mouseInteraction parallaxStrength={0.5} grain grainIntensity={0.018} />
      </div>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <SectionHeader
            className={styles.header}
            headingLevel={headingLevel}
            eyebrow={
              <span className={styles.eyebrowRow}>
                <span className={styles.eyebrowDash} />PROVOICE × AI
                <span className={styles.engineBadge}><i />AI 엔진 연결됨</span>
              </span>
            }
            title={<>물량이 많아도, 마감이 촉박해도<br /><em>성우의 품질은 그대로 지킵니다</em></>}
            description="서브 캐릭터·다국어 대사처럼 분량이 많은 구간에 AI를 더해 예산 안에서 더 많은 언어와 캐릭터를 채우면서도, 핵심 연기는 언제나 계약된 성우가 맡습니다."
          />
          <div className={styles.noteBox}>
            <span className={styles.noteIcon} aria-hidden="true"><Info /></span>
            <p><strong>모든 AI 산출물은 성우 본인의 동의와 라이선스 계약을 거친 음성만 사용합니다.</strong> 저작권 걱정 없이 안심하고 도입할 수 있습니다. 아래 기능은 발주 전 미리 체험해보는 도구이며, 최종 납품물의 품질을 대신하지 않습니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
