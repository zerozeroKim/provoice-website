import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import { PixelCard } from '../PixelCard';
import styles from './PortfolioCard.module.css';

export type PortfolioItem<T extends string = string> = { category: T; title: string; languages: string[]; tone: string; tags: string[]; highlight?: string; image?: string };

export type PortfolioCardProps = {
  title: string;
  languages: string[];
  category: string;
  tags: string[];
  highlight?: string;
  image?: string;
  /** 제목·태그 없이 이미지만 채워서 보여주는 갤러리형 타일입니다. */
  imageOnly?: boolean;
  onOpen?: (origin: DOMRect) => void;
  className?: string;
};

export function PortfolioCard({ title, languages, category, tags, highlight, image, imageOnly = false, onOpen, className = '' }: PortfolioCardProps) {
  const [activating, setActivating] = useState(false);
  const thumbnailStyle = image ? ({ '--portfolio-image': image } as CSSProperties) : undefined;
  const open = (element?: HTMLElement) => {
    if (!onOpen || activating) return;
    setActivating(true);
    const origin = element?.getBoundingClientRect();
    window.setTimeout(() => {
      setActivating(false);
      if (origin) onOpen(origin);
    }, 70);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(event.currentTarget); }
  };

  return (
    <PixelCard as="article" variant="dark" role={onOpen ? 'button' : undefined} tabIndex={onOpen ? 0 : undefined} onClick={(event) => open(event.currentTarget)} onKeyDown={onKeyDown} className={`${styles.card} ${imageOnly ? styles.imageOnlyCard : ''} ${onOpen ? styles.interactive : ''} ${activating ? styles.activating : ''} ${className}`}>
      <div className={`${styles.thumbnail} ${imageOnly ? styles.thumbnailFill : ''}`} style={thumbnailStyle}>
        <div className={styles.languages}>
          {languages.map((language) => <span key={language}>{language}</span>)}
        </div>
        <span className={styles.category}>{category}</span>
      </div>
      {!imageOnly && (
        <div className={styles.body}>
          <h3>{title}</h3>
          <div className={styles.tags}>
            {tags.map((tag) => <span key={tag}>{tag}</span>)}
            {highlight && <span className={styles.highlight}>{highlight}</span>}
          </div>
        </div>
      )}
    </PixelCard>
  );
}

export type PortfolioFilterProps<T extends string> = {
  items: readonly T[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
  className?: string;
};

export function PortfolioFilter<T extends string>({ items, value, onChange, ariaLabel = '포트폴리오 카테고리', className = '' }: PortfolioFilterProps<T>) {
  return (
    <div className={`${styles.filter} ${className}`} role="tablist" aria-label={ariaLabel}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          role="tab"
          aria-selected={value === item}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
