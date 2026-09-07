import { forwardRef, type InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ invalid, className = '', ...props }, ref) {
  return <input ref={ref} aria-invalid={invalid || undefined} className={`${styles.input} ${invalid ? styles.invalid : ''} ${className}`} {...props} />;
});
