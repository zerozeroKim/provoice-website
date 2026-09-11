import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../Button';
import styles from './CtaCard.module.css';

export type CtaContactOption = {
  id: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
};

export type CtaCardProps = Omit<HTMLAttributes<HTMLElement>, 'onClick' | 'title'> & {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: ReactNode;
  primaryLabel: string;
  onPrimaryClick?: () => void;
  contactOptions?: CtaContactOption[];
  /** 'strong'은 진한 그라디언트로 더 강하게 강조합니다. */
  tone?: 'default' | 'strong';
};

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m0 0-5.5-5.5M19 12l-5.5 5.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export function CtaCard({ icon, eyebrow, title, description, primaryLabel, onPrimaryClick, contactOptions = [], tone = 'default', className = '', ...props }: CtaCardProps) {
  return (
    <article data-component="CtaCard" data-tone={tone} className={`${styles.card} ${tone === 'strong' ? styles.strong : ''} ${className}`} {...props}>
      <span className={styles.iconWrap}>{icon}</span>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <Button className={styles.primaryButton} variant={tone === 'strong' ? 'secondary' : 'primary'} fullWidth trailingIcon={<ArrowIcon />} onClick={onPrimaryClick}>{primaryLabel}</Button>

      {contactOptions.length > 0 && (
        <>
          <div className={styles.divider}><span />다른 방법으로 문의하기<span /></div>
          <div className={styles.contactRow}>
            {contactOptions.map((option) => (
              <button type="button" className={styles.contactButton} onClick={option.onClick} key={option.id}>
                <span className={styles.contactIcon}>{option.icon}</span>{option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </article>
  );
}
