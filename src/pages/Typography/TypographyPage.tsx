import type { CSSProperties } from 'react';
import styles from './TypographyPage.module.css';

type StyleItem = { name: string; size: string; sizeLabel: string; weight: number; lineHeight: string; lineHeightLabel: string; tracking: string; preview?: string };

const desktop: StyleItem[] = [
  { name: 'Title / Header 1', size: 'var(--text-h1)', sizeLabel: '--text-h1', weight: 700, lineHeight: 'var(--leading-tight)', lineHeightLabel: '--leading-tight', tracking: 'var(--tracking-tight)' },
  { name: 'Header 2', size: 'var(--text-h2)', sizeLabel: '--text-h2', weight: 700, lineHeight: 'var(--leading-heading)', lineHeightLabel: '--leading-heading', tracking: 'var(--tracking-heading)' },
  { name: 'Header 3', size: 'var(--text-h3)', sizeLabel: '--text-h3', weight: 600, lineHeight: 'var(--leading-heading)', lineHeightLabel: '--leading-heading', tracking: 'var(--tracking-heading)' },
];

const mobile: StyleItem[] = [
  { name: 'Title / Header 1', size: 'var(--text-h1)', sizeLabel: '--text-h1', weight: 700, lineHeight: 'var(--leading-tight)', lineHeightLabel: '--leading-tight', tracking: 'var(--tracking-tight)' },
  { name: 'Header 2', size: 'var(--text-h2)', sizeLabel: '--text-h2', weight: 700, lineHeight: 'var(--leading-heading)', lineHeightLabel: '--leading-heading', tracking: 'var(--tracking-heading)' },
  { name: 'Header 3', size: 'var(--text-h3)', sizeLabel: '--text-h3', weight: 600, lineHeight: 'var(--leading-heading)', lineHeightLabel: '--leading-heading', tracking: 'var(--tracking-heading)' },
];

const common: StyleItem[] = [
  { name: 'Body Large', size: 'var(--text-body-lg)', sizeLabel: '--text-body-lg', weight: 400, lineHeight: 'var(--leading-body)', lineHeightLabel: '--leading-body', tracking: 'var(--tracking-body)' },
  { name: 'Body', size: 'var(--text-body)', sizeLabel: '--text-body', weight: 400, lineHeight: 'var(--leading-body)', lineHeightLabel: '--leading-body', tracking: 'var(--tracking-body)' },
  { name: 'Body Small', size: 'var(--text-body-sm)', sizeLabel: '--text-body-sm', weight: 400, lineHeight: 'var(--leading-body)', lineHeightLabel: '--leading-body', tracking: 'var(--tracking-body)' },
  { name: 'Caption', size: 'var(--text-caption)', sizeLabel: '--text-caption', weight: 400, lineHeight: 'var(--leading-heading)', lineHeightLabel: '--leading-heading', tracking: '0' },
];

const weightName: Record<number, string> = { 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold' };

function StyleTable({ title, items }: { title: string; items: StyleItem[] }) {
  return (
    <section className={styles.tableSection}>
      <h2>{title}</h2>
      <div className={styles.table}>
        {items.map((item) => (
          <article className={styles.row} key={item.name}>
            <strong>{item.name}</strong>
            <dl>
              <div><dt>Weight</dt><dd>{weightName[item.weight]} · {item.weight}</dd></div>
              <div><dt>Size</dt><dd>{item.sizeLabel}</dd></div>
              <div><dt>Line height</dt><dd>{item.lineHeightLabel}</dd></div>
              <div><dt>Letter spacing</dt><dd>{item.tracking}</dd></div>
            </dl>
            <p style={{ '--sample-size': item.size, fontWeight: item.weight, lineHeight: item.lineHeight, letterSpacing: item.tracking } as CSSProperties}>{item.preview ?? item.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function TypographyPage() {
  return (
    <main className={styles.page} id="typography">
      <header className={styles.header}>
        <h1>Typography System</h1>
        <p>웹과 모바일에서 사용하는 Pretendard 폰트 규칙입니다.</p>
      </header>

      <section className={styles.fontInfo}>
        <p className={styles.fontName}>Pretendard</p>
        <p className={styles.weights}><b>Bold</b><b>SemiBold</b><span>Medium</span><span>Regular</span></p>
      </section>

      <section className={styles.scale}>
        <h2>Scale 1.250 · Major Third</h2>
        <div>{['--text-h1', '--text-h2', '--text-h3', '--text-body-lg', '--text-body', '--text-body-sm', '--text-caption'].map((token) => <span style={{ fontSize: `var(${token})` }} key={token}>Aa</span>)}</div>
      </section>

      <StyleTable title="Desktop" items={desktop} />
      <StyleTable title="Mobile" items={mobile} />
      <StyleTable title="Common" items={common} />
    </main>
  );
}
