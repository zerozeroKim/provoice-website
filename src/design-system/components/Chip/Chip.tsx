import type { ButtonHTMLAttributes, HTMLAttributes, MouseEvent, ReactNode } from 'react';
import styles from './Chip.module.css';

export type ChipProps = {
  children: ReactNode;
  variant?: 'choice' | 'filter' | 'input' | 'status' | 'assist';
  size?: 'sm' | 'md';
  tone?: 'neutral' | 'purple' | 'success' | 'warning' | 'danger';
  selected?: boolean;
  disabled?: boolean;
  /** 어두운 배경 위에 올릴 때 사용하는 반투명 라이트 스타일입니다. */
  inverted?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  count?: number;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  onRemove?: () => void;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'onClick'>;

export function Chip({ children, variant = 'choice', size = 'md', tone = 'neutral', selected = false, disabled = false, inverted = false, leadingIcon, trailingIcon, count, onClick, onRemove, className = '', ...props }: ChipProps) {
  const content = <>{leadingIcon && <span className={styles.icon}>{leadingIcon}</span>}<span className={styles.label}>{children}</span>{typeof count === 'number' && <span className={styles.count}>{count}</span>}{trailingIcon && <span className={styles.icon}>{trailingIcon}</span>}</>;
  const classes = `${styles.chip} ${styles[variant]} ${styles[size]} ${styles[tone]} ${selected ? styles.selected : ''} ${disabled ? styles.disabled : ''} ${inverted ? styles.inverted : ''} ${className}`;

  if (variant === 'choice' || variant === 'filter' || variant === 'assist') {
    return <button type="button" data-component="Chip" data-variant={variant} data-size={size} className={classes} aria-pressed={variant === 'choice' ? selected : undefined} disabled={disabled} onClick={onClick} {...props as ButtonHTMLAttributes<HTMLButtonElement>}>{content}</button>;
  }

  if (variant === 'input') {
    const remove = (event: MouseEvent<HTMLButtonElement>) => { event.stopPropagation(); onRemove?.(); };
    return <span data-component="Chip" data-variant={variant} data-size={size} className={classes} {...props}>{content}<button className={styles.remove} type="button" aria-label={`${String(children)} 제거`} disabled={disabled} onClick={remove}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m5 5 6 6M11 5l-6 6" /></svg></button></span>;
  }

  return <span data-component="Chip" data-variant={variant} data-size={size} className={classes} {...props}>{content}</span>;
}
