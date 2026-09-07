import styles from './VersionBanner.module.css';

export function VersionBanner({ version, date }: { version: string; date: string }) {
  return <aside className={styles.banner} aria-label={`현재 사이트 버전 ${version}`}>
    <span>PROVOICE WEBSITE</span><strong>{version}</strong><span>UPDATED {date}</span>
  </aside>;
}
