import { ArrowDown, AudioLines, Globe2, Sparkles } from 'lucide-react';
import { useT } from '@/lib/i18n';
import { SectionHeader } from '../../components';
import styles from './AIProductsSection.module.css';

const products = [
  {
    icon: Sparkles,
    title: '브랜드보이스',
    titleEn: 'Brand Voice',
    description: '브랜드에 맞는 성우를 캐스팅한 뒤 TTS로 제작합니다. 성우 IP 음성은 라이선스 계약을 거쳐 안전하게 활용합니다.',
    descriptionEn: 'Cast a voice actor that fits your brand, then produce with TTS. The voice actor’s IP voice is used safely under a licensing contract.',
    targetId: undefined,
  },
  {
    icon: Globe2,
    title: '다국어더빙팩',
    titleEn: 'Multilingual Dubbing Pack',
    description: '원본 톤은 그대로 유지하며 3~10개 언어를 동시에 제작합니다. AI×Human 더빙 방식도 포함됩니다.',
    descriptionEn: 'Keep the original tone while producing 3-10 languages at once, including the AI×Human dubbing approach.',
    targetId: 'ai-dubbing-pack',
  },
  {
    icon: AudioLines,
    title: '보이스데이터',
    titleEn: 'Voice Data',
    description: 'AI 학습에 필요한 다국어 음성데이터를 수집·정제해 제공합니다.',
    descriptionEn: 'We collect and refine multilingual voice data for AI training.',
    targetId: 'ai-voice-data',
  },
] as const;

/** RQ-FR-017: GNB·메인 서비스카드와 이름을 통일한 AI 서비스 3종 요약. 다국어더빙팩/보이스데이터는 아래 상세 섹션으로 스크롤 이동합니다. */
export function AIProductsSection() {
  const t = useT();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className={styles.section} aria-label={t('AI 서비스 라인업', 'AI service lineup')}>
      <div className={styles.inner}>
        <SectionHeader className={styles.header} eyebrow="AI SERVICE LINEUP" title={t('3가지 AI 서비스', '3 AI Services')} />
        <div className={styles.grid}>
          {products.map((product) => {
            const Icon = product.icon;
            const clickable = Boolean(product.targetId);
            return (
              <button
                key={product.title}
                type="button"
                className={styles.card}
                disabled={!clickable}
                onClick={clickable ? () => scrollTo(product.targetId as string) : undefined}
              >
                <span className={styles.icon}><Icon strokeWidth={1.75} /></span>
                <span className={styles.cardBody}>
                  <strong>{t(product.title, product.titleEn)}</strong>
                  <span className={styles.cardDescription}>{t(product.description, product.descriptionEn)}</span>
                </span>
                {clickable && <ArrowDown className={styles.arrow} size={18} />}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
