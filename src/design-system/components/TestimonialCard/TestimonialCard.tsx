import { Quote, Star } from 'lucide-react';
import { PixelCard } from '../PixelCard';
import styles from './TestimonialCard.module.css';

export type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
  rating?: number;
  className?: string;
};

export function TestimonialCard({ quote, name, role, rating = 5, className = '' }: TestimonialCardProps) {
  const safeRating = Math.max(0, Math.min(5, rating));

  return (
    <PixelCard as="article" variant="purple" className={`${styles.card} ${className}`} aria-label={`${name} 고객 후기`}>
      <div className={styles.header}>
        <div className={styles.profile}>
          <span className={styles.label}>PROJECT REVIEW</span>
          <h3>{name}</h3>
          <span>{role}</span>
        </div>
        <div className={styles.rating} aria-label={`별점 ${safeRating}점`}>
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} aria-hidden="true" data-active={index < safeRating} />
          ))}
        </div>
      </div>
      <div className={styles.quoteBody}>
        <span className={styles.quoteIcon}><Quote aria-hidden="true" /></span>
        <blockquote>{quote}</blockquote>
      </div>
    </PixelCard>
  );
}
