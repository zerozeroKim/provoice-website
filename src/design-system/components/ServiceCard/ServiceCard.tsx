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
  link?: string;
  href?: string;
  layout?: 'standard' | 'compact';
  onOpen?: () => void;
  className?: string;
};

export function ServiceCard({ icon, imageSrc, imageAlt = '', title, description, badge, link, href, layout = 'compact', onOpen, className = '' }: ServiceCardProps) {
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
    <StarBorder as="article" color="#9b6cff" speed="8s" thickness={2} backgroundColor={badge ? 'var(--gradient-deep-purple)' : '#ffffff'} textColor="inherit" borderColor="rgba(128, 56, 255, 0.16)" data-featured={badge ? 'true' : undefined} data-layout={layout} role={onOpen ? 'button' : undefined} tabIndex={onOpen ? 0 : undefined} onClick={open} onKeyDown={onKeyDown} className={`${styles.card} ${onOpen ? styles.interactive : ''} ${activating ? styles.activating : ''} ${className}`}>
      <div className={styles.surface}>
        {badge && <span className={styles.badge}>{badge}</span>}
        {imageSrc && <div className={styles.media}><img src={imageSrc} alt={imageAlt} loading="lazy" /></div>}
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
