import { forwardRef, type SelectHTMLAttributes } from 'react';
import styles from './Select.module.css';

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select({ className = '', ...props }, ref) {
  return <select ref={ref} className={`${styles.select} ${className}`} {...props} />;
});
