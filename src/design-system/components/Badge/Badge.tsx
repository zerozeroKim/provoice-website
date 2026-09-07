import type { HTMLAttributes } from 'react';
import styles from './Badge.module.css';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & { tone?: 'brand' | 'neutral' | 'success' };

export function Badge({ tone = 'brand', className = '', ...props }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[tone]} ${className}`} {...props} />;
}
