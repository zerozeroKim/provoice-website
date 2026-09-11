import styles from './VersionSwitcher.module.css';

const PRODUCTION_URL = 'https://provoice-website.vercel.app';
const DEV_URL = 'https://provoice-website-git-dev-123412.vercel.app';

const isV2 = import.meta.env.VITE_SITE_VERSION === 'v2';

/** 고객이 현재 운영 중인 디자인(VER 1)과 새 디자인(VER 2)을 직접 오가며 비교할 수 있는 상단 배너입니다. */
export function VersionSwitcher() {
  const goTo = (url: string) => { window.location.href = `${url}${window.location.hash}`; };

  return (
    <div className={styles.bar} role="note" aria-label="사이트 디자인 버전 전환">
      <span className={styles.label}>디자인 버전 미리보기</span>
      <div className={styles.switch} role="group" aria-label="버전 선택">
        <button type="button" className={!isV2 ? styles.active : ''} aria-current={!isV2} onClick={() => isV2 && goTo(PRODUCTION_URL)}>VER 1</button>
        <button type="button" className={isV2 ? styles.active : ''} aria-current={isV2} onClick={() => !isV2 && goTo(DEV_URL)}>VER 2</button>
      </div>
    </div>
  );
}
