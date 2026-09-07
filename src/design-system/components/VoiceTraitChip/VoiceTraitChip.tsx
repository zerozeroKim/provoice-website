import type { HTMLAttributes } from 'react';
import styles from './VoiceTraitChip.module.css';

export type VoiceTraitChipProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  label: string;
};

export function VoiceTraitChip({ label, className = '', ...props }: VoiceTraitChipProps) {
  return <span data-component="VoiceTraitChip" className={`${styles.chip} ${className}`} {...props}>{label}</span>;
}
