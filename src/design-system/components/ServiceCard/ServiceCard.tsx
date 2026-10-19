import { useState, type KeyboardEvent, type ReactNode } from 'react';
import StarBorder from '@/components/reactbits/StarBorder';
import styles from './ServiceCard.module.css';

export type ServiceCardProps = {
  icon?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  description: string;
  badge?: string;
  /** 뱃지와 별개로, 카드 전체를 보라색 강조 배경으로 보여줄지 결정합니다. */
  featured?: boolean;
  /** 보라색 배경 위에서도 뱃지가 묻히지 않도록 쓰는 고채도 강조 스타일입니다. */
  badgeAccent?: boolean;
  link?: string;
  href?: string;
  layout?: 'standard' | 'compact';
  onOpen?: () => void;
  className?: string;
};

export function ServiceCard({ icon, imageSrc, imageAlt = '', title, description, badge, featured = false, badgeAccent = false, link, href, layout = 'compact', onOpen, className = '' }: ServiceCardProps) {
  const [activating, setActivating] = useState(false);
  const open = () => {
    if (!onOpen || activating) return;
    setActivating(true);
    window.setTimeout(() => { setActivating(false); onOpen(); }, 170);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
  };

  return (
    <StarBorder as="article" color="#9b6cff" speed="8s" thickness={2} backgroundColor={featured ? 'var(--gradient-deep-purple)' : '#ffffff'} textColor="inherit" borderColor="rgba(128, 56, 255, 0.16)" data-featured={featured ? 'true' : undefined} data-layout={layout} role={onOpen ? 'button' : undefined} tabIndex={onOpen ? 0 : undefined} onClick={open} onKeyDown={onKeyDown} className={`${styles.card} ${onOpen ? styles.interactive : ''} ${activating ? styles.activating : ''} ${className}`}>
      <div className={styles.surface}>
        {badge && <span className={`${styles.badge} ${badgeAccent ? styles.badgeAccent : ''}`}>{badge}</span>}
        {imageSrc && <div className={styles.media}><img src={imageSrc} alt={imageAlt || `${title} 서비스 이미지`} loading="lazy" /></div>}
        <div className={styles.content}>
          {!imageSrc && icon && <div className={styles.icon}>{icon}</div>}
          <h3>{title}</h3>
          <p>{description}</p>
          {link && (href
            ? <a className={styles.link} href={href}>{link}</a>
            : <span className={styles.link}>{link}</span>)}
        </div>
      </div>
    </StarBorder>
  );
}
