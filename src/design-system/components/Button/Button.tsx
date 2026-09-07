import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'invert';
  size?: 'compact' | 'sm' | 'md' | 'lg';
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
};

export function Button({ variant = 'primary', size = 'md', leadingIcon, trailingIcon, fullWidth = false, loading = false, disabled, className = '', type = 'button', children, ...props }: ButtonProps) {
  return (
    <button type={type} data-component="Button" data-variant={variant} data-size={size} aria-busy={loading || undefined} disabled={disabled || loading} className={`${styles.button} ${styles[variant]} ${styles[size]} ${leadingIcon || loading ? styles.hasLeading : ''} ${trailingIcon ? styles.hasTrailing : ''} ${fullWidth ? styles.fullWidth : ''} ${className}`} {...props}>
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : leadingIcon && <span className={styles.icon}>{leadingIcon}</span>}
      <span>{children}</span>
      {!loading && trailingIcon && <span className={styles.icon}>{trailingIcon}</span>}
    </button>
  );
}
