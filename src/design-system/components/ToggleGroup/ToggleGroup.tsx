import styles from './ToggleGroup.module.css';

export type ToggleGroupProps<T extends string> = {
  options: readonly T[];
  value: T | '';
  onChange: (value: T) => void;
  ariaLabel?: string;
  className?: string;
};

/** 여러 옵션 중 하나를 고르는 알약 모양 토글 그룹입니다 (회원가입 폼의 성우/번역가, 작업 기간 등). */
export function ToggleGroup<T extends string>({ options, value, onChange, ariaLabel, className = '' }: ToggleGroupProps<T>) {
  return (
    <div className={`${styles.group} ${className}`} role="radiogroup" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={option === value}
          className={option === value ? styles.active : styles.option}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
