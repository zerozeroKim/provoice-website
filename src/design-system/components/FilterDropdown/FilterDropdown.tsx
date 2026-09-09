import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FilterDropdown.module.css';

export type FilterDropdownProps = {
  label: string;
  options: string[];
  selected: string[];
  multiple?: boolean;
  onSelect: (option: string) => void;
};

/** 단일/다중 선택을 모두 지원하는 커스텀 필터 드롭다운. 네이티브 select로는 표현하기 어려운 칩 스타일 옵션 패널을 씁니다. */
export function FilterDropdown({ label, options, selected, multiple = false, onSelect }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener('pointerdown', close);
    return () => window.removeEventListener('pointerdown', close);
  }, [open]);

  const triggerLabel = selected.length === 0 ? label : multiple ? `${label} (${selected.length})` : selected[0];

  const handleOptionClick = (option: string) => {
    onSelect(option);
    if (!multiple) setOpen(false);
  };

  return (
    <div className={styles.filter} ref={ref}>
      <button
        type="button"
        className={`${styles.trigger} ${selected.length ? styles.triggerActive : ''}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{triggerLabel}</span>
        <ChevronDown size={16} className={styles.chevron} />
      </button>
      {open && (
        <div className={styles.panel} role={multiple ? 'group' : 'listbox'} aria-label={`${label} 선택${multiple ? ' (다중 선택 가능)' : ''}`}>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`${styles.option} ${selected.includes(option) ? styles.optionActive : ''}`}
              aria-pressed={multiple ? selected.includes(option) : undefined}
              aria-selected={!multiple ? selected.includes(option) : undefined}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
