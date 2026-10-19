import type { MouseEvent } from 'react';
import { useT } from '@/lib/i18n';
import styles from './Footer.module.css';

const serviceLinks = [
  { ko: '성우 검색', en: 'Find Voice Actors' },
  { ko: '더빙', en: 'Dubbing' },
  { ko: '번역', en: 'Translation' },
  { ko: 'PROVOICE × AI', en: 'PROVOICE × AI' },
];
const companyLinks = [
  { ko: '회사소개', en: 'About Us' },
  { ko: '포트폴리오', en: 'Portfolio' },
  { ko: '문의하기', en: 'Contact' },
];

function BrandMark() {
  return <span className={styles.brandMark} aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="10" y="4" width="4" height="10" rx="2" fill="currentColor"/><path d="M7.5 11.5a4.5 4.5 0 0 0 9 0M12 16v3M9.5 19h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span>;
}

export function Footer({ version }: { version?: string }) {
  const t = useT();
  const stopDemoLink = (event: MouseEvent<HTMLAnchorElement>) => event.preventDefault();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div className={styles.brandColumn}>
            <a className={styles.brand} href="#home" aria-label={t('PROVOICE 홈', 'PROVOICE Home')} onClick={stopDemoLink}><BrandMark /><strong>PROVOICE</strong></a>
            <p>{t('외국인 게임·광고·애니메이션 성우더빙 No.1.', 'The #1 voice dubbing for games, ads, and animation.')}<br />{t('30개국 1,000명 이상의 글로벌 성우 네트워크.', 'A global network of 1,000+ voice actors across 30 countries.')}</p>
          </div>
          <nav className={styles.linkColumn} aria-label={t('서비스', 'Services')}><h2>SERVICES</h2>{serviceLinks.map((link) => <a href="#services" onClick={stopDemoLink} key={link.ko}>{t(link.ko, link.en)}</a>)}</nav>
          <nav className={styles.linkColumn} aria-label={t('회사', 'Company')}><h2>COMPANY</h2>{companyLinks.map((link) => <a href="#company" onClick={stopDemoLink} key={link.ko}>{t(link.ko, link.en)}</a>)}</nav>
          <div className={styles.linkColumn}><h2>CONTACT</h2><a href="https://www.instagram.com/provoice_kr/" target="_blank" rel="noreferrer">@provoice_kr</a><a href="https://provoice.co.kr" target="_blank" rel="noreferrer">provoice.co.kr</a></div>
        </div>
        <div className={styles.bottomRow}><p>© 2026 {t('(주)프로보이스. All rights reserved.', 'PROVOICE Inc. All rights reserved.')}</p><div className={styles.footerMeta}><div className={styles.certBadges}><span className={styles.certBadge}>ISO 17100</span><span className={styles.certBadge}>{t('수출바우처 공식 수행기관', 'Export Voucher Program Partner')}</span></div>{version && <span className={styles.version}>VERSION {version}</span>}</div></div>
      </div>
    </footer>
  );
}
