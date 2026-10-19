import { useLanguage, useT } from '@/lib/i18n';
import { SectionHeader, TestimonialCard, type TestimonialCardProps } from '../../components';
import styles from './TestimonialSection.module.css';

export type TestimonialSectionProps = {
  testimonials: TestimonialCardProps[];
  className?: string;
};

export function TestimonialSection({ testimonials, className = '' }: TestimonialSectionProps) {
  const t = useT();
  const { language } = useLanguage();
  return (
    <section className={`${styles.section} ${className}`} aria-label={t('고객 후기', 'Client testimonials')}>
      <div className={styles.ambient} aria-hidden="true">
        <span />
        <span />
      </div>
      <div className={styles.inner}>
        <SectionHeader
          className={styles.header}
          eyebrow="CLIENT VOICES"
          title={language === 'en'
            ? <>What clients say about <span className={styles.accent}>Provoice</span></>
            : <>고객사가 말하는 <span className={styles.accent}>프로보이스</span></>}
        />
        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
