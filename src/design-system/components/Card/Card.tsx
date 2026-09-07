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
  title: ReactNode;
  description: ReactNode;
  variant?: 'gradient' | 'light';
  primaryAction: ActionCardAction;
  secondaryActions?: ActionCardAction[];
  secondaryLabel?: string;
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

export function ActionCard({ title, description, variant = 'light', primaryAction, secondaryActions = [], secondaryLabel = '간편 연결', className = '', ...props }: ActionCardProps) {
  return (
    <article data-component="ActionCard" data-variant={variant} className={`${styles.actionCard} ${styles[variant]} ${className}`} {...props}>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <Action action={primaryAction} className={styles.primaryAction} />
      {secondaryActions.length > 0 && (
        <div className={styles.secondaryGroup}>
          <span className={styles.secondaryLabel}>{secondaryLabel}</span>
          <div className={styles.secondaryActions}>
            {secondaryActions.map((action) => (
              <Action key={action.label} action={action} className={`${styles.secondaryAction} ${action.tone ? styles[action.tone] : ''}`} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
