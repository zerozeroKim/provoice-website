import { ChevronDown } from 'lucide-react';
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
  return (
    <div className={styles.root} data-component="LoadMoreControl">
      <p className={styles.status}><strong>{visible}</strong> / 전체 {total}개</p>
      {hasMore && <Button variant="primary" size="md" className={styles.loadMore} trailingIcon={<ChevronDown size={17} />} onClick={onLoadMore}>더 보기</Button>}
      {showViewAll && <a className={styles.viewAll} href={allHref}>전체 포트폴리오 보기 <span aria-hidden="true">→</span></a>}
    </div>
  );
}
