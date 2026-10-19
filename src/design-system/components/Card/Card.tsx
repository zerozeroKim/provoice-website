import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.card} ${className}`} {...props} />;
}

export type ActionCardAction = {
  label: string;
  href?: string;
  onClick?: () => void;
  tone?: 'naver' | 'kakao';
};

export type ActionCardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  variant?: 'gradient' | 'light';
  primaryAction: ActionCardAction;
  secondaryDividerLabel?: string;
  secondaryLinks?: ActionCardAction[];
};

function Action({ action, className }: { action: ActionCardAction; className: string }) {
  const icon = action.tone === 'naver'
    ? <span className={styles.socialIcon} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 4h5.05l4.15 6.06V4H19v16h-5.05L9.8 13.94V20H5V4Z" fill="currentColor" /></svg></span>
    : action.tone === 'kakao'
      ? <span className={styles.socialIcon} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 4.25c-5.05 0-9.15 3.17-9.15 7.08 0 2.52 1.7 4.73 4.25 5.98l-.88 3.25a.42.42 0 0 0 .63.47l3.77-2.5c.45.05.91.08 1.38.08 5.05 0 9.15-3.17 9.15-7.08S17.05 4.25 12 4.25Z" fill="currentColor" /></svg></span>
      : null;

  if (action.href) {
    return <a className={className} href={action.href}>{icon}<span>{action.label}</span></a>;
  }

  return <button className={className} type="button" onClick={action.onClick}>{icon}<span>{action.label}</span></button>;
}

export function ActionCard({ icon, title, description, variant = 'light', primaryAction, secondaryDividerLabel, secondaryLinks = [], className = '', ...props }: ActionCardProps) {
  return (
    <article data-component="ActionCard" data-variant={variant} className={`${styles.actionCard} ${styles[variant]} ${className}`} {...props}>
      {icon && <div className={styles.iconBadge} aria-hidden="true">{icon}</div>}
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <Action action={primaryAction} className={styles.primaryAction} />
      {secondaryLinks.length > 0 && (
        <>
          <div className={styles.divider}><span>{secondaryDividerLabel}</span></div>
          <div className={styles.secondaryLinks}>
            {secondaryLinks.map((action) => (
              <Action key={action.label} action={action} className={`${styles.secondaryLink} ${action.tone ? styles[action.tone] : ''}`} />
            ))}
          </div>
        </>
      )}
    </article>
  );
}
