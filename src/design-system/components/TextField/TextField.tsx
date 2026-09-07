import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import styles from './TextField.module.css';

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label: string;
  fieldSize?: 'md' | 'lg';
  helperText?: string;
  error?: string;
  optional?: boolean;
  hideLabel?: boolean;
  leadingIcon?: ReactNode;
  trailingElement?: ReactNode;
  containerClassName?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField({ label, fieldSize = 'lg', helperText, error, optional, hideLabel = false, leadingIcon, trailingElement, containerClassName = '', id, required, disabled, readOnly, ...props }, ref) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;

  return (
    <div data-component="TextField" data-variant={hideLabel ? 'label-less' : 'inset'} data-size={fieldSize} className={`${styles.root} ${styles[fieldSize]} ${hideLabel ? styles.labelLess : ''} ${error ? styles.hasError : ''} ${disabled ? styles.isDisabled : ''} ${readOnly ? styles.isReadOnly : ''} ${containerClassName}`}>
      <div className={styles.surface}>
        {leadingIcon && <span className={styles.leading} aria-hidden="true">{leadingIcon}</span>}
        <div className={styles.content}>
          <label className={hideLabel ? styles.srOnly : ''} htmlFor={inputId}>{label}{required && <i>*</i>}{optional && !required && <span>(선택)</span>}</label>
          <input ref={ref} id={inputId} required={required} disabled={disabled} readOnly={readOnly} aria-invalid={error ? true : undefined} aria-describedby={error || helperText ? messageId : undefined} {...props} />
        </div>
        {trailingElement && <span className={styles.trailing}>{trailingElement}</span>}
      </div>
      {(error || helperText) && <p className={error ? styles.error : styles.helper} id={messageId}>{error ?? helperText}</p>}
    </div>
  );
});
