import type { ElementType, ReactNode } from 'react';
import styles from './SectionHeader.module.css';

export type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  /** 페이지 대표 제목은 1, 일반 섹션은 2, 중첩 섹션은 3을 사용합니다. */
  headingLevel?: 1 | 2 | 3;
};

export function SectionHeader({ eyebrow, title, description, className = '', headingLevel = 2 }: SectionHeaderProps) {
  const Heading = `h${headingLevel}` as ElementType;

  return (
    <header className={`${styles.header} ${className}`}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <Heading>{title}</Heading>
      {description && <p>{description}</p>}
    </header>
  );
}
