import type { InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.css';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { label: string };

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return <label className={`${styles.label} ${className}`}><input className={styles.input} type="checkbox" {...props} /><span>{label}</span></label>;
}
