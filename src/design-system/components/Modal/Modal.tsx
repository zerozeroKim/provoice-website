import { useEffect, type PropsWithChildren } from 'react';
import { Button } from '../Button';
import styles from './Modal.module.css';

type ModalProps = PropsWithChildren<{ open: boolean; title: string; onClose: () => void }>;

export function Modal({ open, title, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header className={styles.header}><h2 id="modal-title">{title}</h2><Button variant="ghost" aria-label="닫기" onClick={onClose}>✕</Button></header>
        <div className={styles.body}>{children}</div>
      </section>
    </div>
  );
}
