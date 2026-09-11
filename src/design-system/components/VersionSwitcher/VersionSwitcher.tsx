import styles from './VersionSwitcher.module.css';

const PRODUCTION_URL = 'https://provoice-website.vercel.app';
const DEV_URL = 'https://provoice-website-git-dev-123412.vercel.app';

const isV2 = import.meta.env.VITE_SITE_VERSION === 'v2';

/** 고객이 현재 운영 중인 디자인(VER 1)과 새 디자인(VER 2)을 직접 오가며 비교할 수 있는 상단 배너입니다. */
export function VersionSwitcher() {
  /**
   * dev 프리뷰는 팀이 직접 열 땐 디자인 시스템 문서가 보여야 하므로 빌드 타임에는 고객 전용 모드로
   * 고정할 수 없습니다. VER 2로 넘어오는 고객에게만 ?mode=customer를 붙여 런타임에 숨깁니다.
   */
  const goTo = (url: string, forceCustomer: boolean) => {
    const query = forceCustomer ? '?mode=customer' : '';
    window.location.href = `${url}${query}${window.location.hash}`;
  };

  return (
    <div className={styles.bar} role="note" aria-label="사이트 디자인 버전 전환">
      <span className={styles.label}>디자인 버전 미리보기</span>
      <div className={styles.switch} role="group" aria-label="버전 선택">
        <button type="button" className={!isV2 ? styles.active : ''} aria-current={!isV2} onClick={() => isV2 && goTo(PRODUCTION_URL, false)}>VER 1</button>
        <button type="button" className={isV2 ? styles.active : ''} aria-current={isV2} onClick={() => !isV2 && goTo(DEV_URL, true)}>VER 2</button>
      </div>
    </div>
  );
}
