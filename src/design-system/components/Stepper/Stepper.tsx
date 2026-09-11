import { Check } from 'lucide-react';
import styles from './Stepper.module.css';

export type StepperProps = { steps: readonly string[]; currentIndex: number; className?: string };

/** 여러 단계로 나뉜 폼(회원가입 등)의 진행 상태를 보여주는 스텝 인디케이터입니다. */
export function Stepper({ steps, currentIndex, className = '' }: StepperProps) {
  return (
    <ol className={`${styles.stepper} ${className}`}>
      {steps.map((label, index) => (
        <li key={label} className={index === currentIndex ? styles.active : index < currentIndex ? styles.done : ''}>
          <span className={styles.number}>{index < currentIndex ? <Check size={14} /> : index + 1}</span>
          {label}
        </li>
      ))}
    </ol>
  );
}
