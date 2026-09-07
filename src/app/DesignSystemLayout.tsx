import type { PropsWithChildren } from 'react';
import styles from './DesignSystemLayout.module.css';

const navigation = [
  { label: 'Typography', id: 'typography', enabled: true },
  { label: 'Colors', id: 'colors', enabled: true },
  { label: 'Components', id: 'components', enabled: true },
  { label: 'Templates', id: 'templates', enabled: true },
  { label: 'Layout', id: 'layout', enabled: true },
];

export function DesignSystemLayout({ children, current }: PropsWithChildren<{ current: string }>) {
  return (
    <div className={styles.shell}>
      <header className={styles.gnb}>
        <a className={styles.brand} href="#typography">Design System</a>
        <nav className={styles.navigation} aria-label="디자인 시스템 메뉴">
          {navigation.map((item) => item.enabled ? (
            <a className={current === item.id ? styles.active : ''} href={`#${item.id}`} aria-current={current === item.id ? 'page' : undefined} key={item.label}>{item.label}</a>
          ) : (
            <span className={styles.upcoming} title="추후 추가 예정" key={item.label}>{item.label}</span>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
