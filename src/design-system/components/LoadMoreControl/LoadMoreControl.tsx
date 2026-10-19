import { ChevronDown } from 'lucide-react';
import { useT } from '@/lib/i18n';
import { Button } from '../Button';
import styles from './LoadMoreControl.module.css';

export type LoadMoreControlProps = {
  visible: number;
  total: number;
  hasMore: boolean;
  onLoadMore?: () => void;
  showViewAll?: boolean;
  allHref?: string;
};

export function LoadMoreControl({ visible, total, hasMore, onLoadMore, showViewAll = true, allHref = '#portfolio' }: LoadMoreControlProps) {
  const t = useT();
  return (
    <div className={styles.root} data-component="LoadMoreControl">
      <p className={styles.status}><strong>{visible}</strong> {t(`/ 전체 ${total}개`, `/ ${total} total`)}</p>
      {hasMore && <Button variant="primary" size="md" className={styles.loadMore} trailingIcon={<ChevronDown size={17} />} onClick={onLoadMore}>{t('더 보기', 'Load more')}</Button>}
      {showViewAll && <a className={styles.viewAll} href={allHref}>{t('전체 포트폴리오 보기', 'View full portfolio')} <span aria-hidden="true">→</span></a>}
    </div>
  );
}
