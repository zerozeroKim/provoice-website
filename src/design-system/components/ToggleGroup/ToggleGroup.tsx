import type { ReactNode } from 'react';
import styles from './ToggleGroup.module.css';

export type ToggleGroupProps<T extends string> = {
  options: readonly T[];
  value: T | '';
  onChange: (value: T) => void;
  /** 표시 라벨을 값과 분리하고 싶을 때(예: 다국어 전환) 사용합니다. 생략하면 값을 그대로 보여줍니다. */
  labelFor?: (option: T) => ReactNode;
  ariaLabel?: string;
  className?: string;
};

/** 여러 옵션 중 하나를 고르는 알약 모양 토글 그룹입니다 (회원가입 폼의 성우/번역가, 작업 기간 등). */
export function ToggleGroup<T extends string>({ options, value, onChange, labelFor, ariaLabel, className = '' }: ToggleGroupProps<T>) {
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
          {labelFor ? labelFor(option) : option}
        </button>
      ))}
    </div>
  );
}
