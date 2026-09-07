import styles from './ColorsPage.module.css';

const purple = [
  { name: 'purple-500', value: 'var(--purple-500)' }, { name: 'purple-400', value: 'var(--purple-400)' },
  { name: 'purple-300', value: 'var(--purple-300)' }, { name: 'purple-200', value: 'var(--purple-200)' }, { name: 'purple-100', value: 'var(--purple-100)' },
];

const magenta = [
  { name: 'magenta-500', value: 'var(--magenta-500)' }, { name: 'magenta-400', value: 'var(--magenta-400)' },
  { name: 'magenta-300', value: 'var(--magenta-300)' }, { name: 'magenta-200', value: 'var(--magenta-200)' },
];

const neutral = [
  { name: 'neutral-950', value: 'var(--neutral-950)' }, { name: 'neutral-900', value: 'var(--neutral-900)' },
  { name: 'neutral-700', value: 'var(--neutral-700)' }, { name: 'neutral-500', value: 'var(--neutral-500)' },
  { name: 'neutral-300', value: 'var(--neutral-300)' }, { name: 'neutral-100', value: 'var(--neutral-100)' },
  { name: 'neutral-50', value: 'var(--neutral-50)' }, { name: 'neutral-0', value: 'var(--neutral-0)' },
];

type Color = { name: string; value: string };

function Palette({ title, description, colors }: { title: string; description: string; colors: Color[] }) {
  return (
    <section className={styles.palette}>
      <div className={styles.heading}><h2>{title}</h2><p>{description}</p></div>
      <div className={styles.swatches}>
        {colors.map((color) => (
          <article className={styles.swatch} key={color.name}>
            <div style={{ background: color.value }} />
            <strong>{color.name}</strong><span>{color.value}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ColorsPage() {
  return (
    <main className={styles.page} id="colors">
      <header className={styles.header}><h1>Color System</h1><p>브랜드 컬러와 함께 사용하는 기본 컬러 토큰입니다.</p></header>
      <Palette title="Purple" description="Primary color" colors={purple} />
      <Palette title="Magenta" description="Accent color" colors={magenta} />
      <section className={styles.gradientSection}>
        <div className={styles.heading}><h2>Gradient</h2><p>Brand gradient</p></div>
        <div className={styles.gradient} />
        <div className={styles.gradientInfo}><strong>gradient-brand</strong><code>linear-gradient(101deg, #E0F -12.71%, #5900FF 102.28%)</code></div>
      </section>
      <Palette title="Neutral" description="Black, gray and white" colors={neutral} />
      <section className={styles.sample}>
        <div><span>Dark</span><h2>선명한 컬러와<br />차분한 대비</h2><button>Button</button></div>
        <div><span>Light</span><h2>Simple color<br />combination</h2><button>Button</button></div>
      </section>
    </main>
  );
}
