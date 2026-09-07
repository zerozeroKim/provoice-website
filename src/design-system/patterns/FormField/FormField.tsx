import type { ReactNode } from 'react';
import styles from './FormField.module.css';

type FormFieldProps = { label: string; htmlFor: string; hint?: string; error?: string; children: ReactNode };

export function FormField({ label, htmlFor, hint, error, children }: FormFieldProps) {
  const descriptionId = `${htmlFor}-description`;
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={htmlFor}>{label}</label>
      {children}
      {(error || hint) && <p className={error ? styles.error : styles.hint} id={descriptionId}>{error || hint}</p>}
    </div>
  );
}
