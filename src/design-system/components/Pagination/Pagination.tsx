import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.css';

export type PaginationProps = { page: number; totalPages: number; onChange: (page: number) => void };

function getPageList(page: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, '...', totalPages];
  if (page >= totalPages - 3) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  return [1, '...', page - 1, page, page + 1, '...', totalPages];
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const pages = getPageList(page, totalPages);

  return (
    <nav className={styles.root} aria-label="페이지 이동">
      <button type="button" className={styles.arrow} aria-label="이전 페이지" disabled={page <= 1} onClick={() => onChange(page - 1)}><ChevronLeft size={18} /></button>
      <ul className={styles.list}>
        {pages.map((item, index) =>
          item === '...' ? (
            <li key={`ellipsis-${index}`} className={styles.ellipsis} aria-hidden="true">…</li>
          ) : (
            <li key={item}>
              <button type="button" className={`${styles.pageButton} ${item === page ? styles.active : ''}`} aria-current={item === page ? 'page' : undefined} onClick={() => onChange(item)}>{item}</button>
            </li>
          ),
        )}
      </ul>
      <button type="button" className={styles.arrow} aria-label="다음 페이지" disabled={page >= totalPages} onClick={() => onChange(page + 1)}><ChevronRight size={18} /></button>
    </nav>
  );
}
