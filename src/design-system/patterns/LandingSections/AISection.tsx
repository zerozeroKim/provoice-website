import { ArrowRight, BarChart3, Globe2, Layers3, Mic2, Play, ShieldCheck, Sparkles, Users } from 'lucide-react';
import GradientWaves from '@/components/reactbits/GradientWaves';
import { Button } from '../../components';
import styles from './AISection.module.css';

const metrics = [
  { icon: Users, value: '3주 → 5일', label: '제작 일정에 여유를 더하세요' },
  { icon: BarChart3, value: '약 35% ↓', label: '예산을 효율적으로 사용하세요' },
  { icon: Globe2, value: '100개+ 언어', label: '더 많은 시장으로 확장하세요' },
  { icon: Layers3, value: '서브 캐릭터 제작', label: '다양한 캐릭터 톤을 빠르게' },
];

export function AISection() {
  return (
    <section className={styles.aiHero} aria-label="PROVOICE × AI">
      <div className={styles.aiWave} aria-hidden="true">
        <GradientWaves horizonColor="#ffffff" waveColor="#7047eb" crestColor="#d95fe8" speed={0.4} amplitude={2.4} waveScale={0.55} waveRatio={0.9} swell={30} turbulence={18} tilt={1.15} zoom={1.05} height={4.2} fogDepth={23} detail="medium" brightness={1.06} opacity={0.86} mouseInteraction parallaxStrength={0.5} grain grainIntensity={0.018} />
      </div>
      <div className={styles.inner}>
        <div className={styles.contentGrid}>
          <div className={styles.copy}>
            <div className={styles.eyebrow}><span />PROVOICE × AI</div>
            <h1>물량이 많아도, 마감이 촉박해도<br /><em>성우의 품질은 그대로</em> 지킵니다</h1>
            <p>서브 캐릭터·다국어 대사처럼 분량이 많은 구간에 AI를 더해 <br />더 많은 언어와 캐릭터를 빠르게 제작해보세요. <br />핵심 연기는 언제나 계약된 성우가 직접 말합니다.</p>
            <div className={styles.actions}>
              <Button size="lg" trailingIcon={<ArrowRight />}>AI 보이스 체험하기</Button>
              <Button size="lg" variant="secondary">제작 방식 알아보기</Button>
            </div>
            <div className={styles.license}><ShieldCheck aria-hidden="true" /><span>모든 AI 음성은 성우 본인의 동의와 정식 라이선스를 기반으로 제작됩니다.</span><button type="button">자세히 보기 <ArrowRight /></button></div>
          </div>
          <div className={styles.productionComparison} aria-label="성우 제작 방식 비교">
            <article className={styles.productionCard}>
              <div className={styles.cardHeader}><span className={styles.cardIcon}><Mic2 /></span><div><strong>성우 단독 제작</strong><p>모든 대사를 전문 성우가 녹음</p></div><i>A</i></div>
              <div className={styles.timeline}><span /><span /><span /><span /><span /></div>
              <div className={styles.cardFooter}><button type="button" disabled aria-label="실제 성우 음원 준비 중"><Play fill="currentColor" /></button><p><strong>실제 성우 음원</strong><span>현재 샘플을 준비하고 있습니다</span></p></div>
            </article>
            <span className={styles.vsBadge} aria-hidden="true">VS</span>
            <article className={`${styles.productionCard} ${styles.hybridCard}`}>
              <div className={styles.cardHeader}><span className={styles.cardIcon}><Sparkles /></span><div><strong>성우 + AI 하이브리드</strong><p>메인은 성우, 서브 캐릭터는 AI</p></div><i>B</i></div>
              <div className={styles.timeline} aria-label="AI가 활용되는 서브 캐릭터 제작 구간"><span /><span /><span /><span /><span /></div>
              <div className={styles.cardFooter}><button type="button" aria-label="AI 서브 캐릭터 대사 미리듣기"><Play fill="currentColor" /></button><p><strong>AI 서브 캐릭터 대사</strong><span>발주 전에 빠르게 미리 들어보세요</span></p></div>
            </article>
          </div>
        </div>
        <div className={styles.metrics}>{metrics.map(({ icon: Icon, value, label }) => <div className={styles.metric} key={value}><span><Icon /></span><p><strong>{value}</strong><small>{label}</small></p></div>)}</div>
      </div>
    </section>
  );
}
