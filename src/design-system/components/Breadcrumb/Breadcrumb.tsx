import { ChevronRight } from 'lucide-react';
import styles from './Breadcrumb.module.css';

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumb({ items, className = '' }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label="현재 위치" className={`${styles.breadcrumb} ${className}`}>
      {items.map((item, index) => (
        <span key={item.label} className={styles.item}>
          {item.href
            ? <a href={item.href}>{item.label}</a>
            : <span className={styles.current} aria-current="page">{item.label}</span>}
          {index < items.length - 1 && <ChevronRight size={14} className={styles.separator} aria-hidden="true" />}
        </span>
      ))}
    </nav>
  );
}
