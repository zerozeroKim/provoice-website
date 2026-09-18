import type { MouseEvent } from 'react';
import styles from './Footer.module.css';

const serviceLinks = ['성우 검색', '더빙', '번역', 'PROVOICE × AI'];
const companyLinks = ['회사소개', '포트폴리오', '문의하기'];

function BrandMark() {
  return <span className={styles.brandMark} aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="10" y="4" width="4" height="10" rx="2" fill="currentColor"/><path d="M7.5 11.5a4.5 4.5 0 0 0 9 0M12 16v3M9.5 19h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span>;
}

export function Footer({ version }: { version?: string }) {
  const stopDemoLink = (event: MouseEvent<HTMLAnchorElement>) => event.preventDefault();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div className={styles.brandColumn}>
            <a className={styles.brand} href="#home" aria-label="PROVOICE 홈" onClick={stopDemoLink}><BrandMark /><strong>PROVOICE</strong></a>
            <p>외국인 게임·광고·애니메이션 성우더빙 No.1.<br />30개국 1,000명 이상의 글로벌 성우 네트워크.</p>
          </div>
          <nav className={styles.linkColumn} aria-label="서비스"><h2>SERVICES</h2>{serviceLinks.map((label) => <a href="#services" onClick={stopDemoLink} key={label}>{label}</a>)}</nav>
          <nav className={styles.linkColumn} aria-label="회사"><h2>COMPANY</h2>{companyLinks.map((label) => <a href="#company" onClick={stopDemoLink} key={label}>{label}</a>)}</nav>
          <div className={styles.linkColumn}><h2>CONTACT</h2><a href="https://www.instagram.com/provoice_kr/" target="_blank" rel="noreferrer">@provoice_kr</a><a href="https://provoice.co.kr" target="_blank" rel="noreferrer">provoice.co.kr</a></div>
        </div>
        <div className={styles.bottomRow}><p>© 2026 (주)프로보이스. All rights reserved.</p><div className={styles.footerMeta}><div className={styles.certBadges}><span className={styles.certBadge}>ISO 17100</span><span className={styles.certBadge}>수출바우처 공식 수행기관</span></div>{version && <span className={styles.version}>VERSION {version}</span>}</div></div>
      </div>
    </footer>
  );
}
