import { useEffect, useId, useRef, useState, type MouseEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { isLoggedIn, logout, onAuthChange } from '@/lib/mockAuth';
import { useLanguage, useT, type Language } from '@/lib/i18n';
import { VersionSwitcher } from '../VersionSwitcher';
import styles from './GNB.module.css';

const mainMenu = ['성우검색', '서비스', '포트폴리오', '작업문의', '블로그'] as const;
const menuHref: Partial<Record<(typeof mainMenu)[number], string>> = { 성우검색: '#voice-search', 포트폴리오: '#portfolio', 작업문의: '#work-inquiry', 블로그: '#admin' };
const mainMenuEn: Record<(typeof mainMenu)[number], string> = { 성우검색: 'Find Voices', 서비스: 'Services', 포트폴리오: 'Portfolio', 작업문의: 'Inquiry', 블로그: 'Blog' };

const serviceMenu = [
  { label: '더빙', labelEn: 'Dubbing', href: undefined },
  { label: '번역', labelEn: 'Translation', href: undefined },
  { label: '사운드', labelEn: 'Sound', href: undefined },
  { label: 'AI 서비스', labelEn: 'AI Service', href: '#ai' },
] as const;

const languageOptions: { value: Language; label: string; flag: string }[] = [
  { value: 'ko', label: '한국어', flag: '🇰🇷' },
  { value: 'en', label: 'English', flag: '🇺🇸' },
];

const getCurrentMenuItem = () => {
  const hash = window.location.hash;
  if (hash === '#ai') return '서비스';
  if (hash.startsWith('#voice-actor/')) return '성우검색';
  return mainMenu.find((item) => menuHref[item] === hash);
};

export type GNBProps = { mobile?: boolean; defaultOpen?: boolean };

/**
 * `mobile`을 명시적으로 넘기지 않으면 실제 뷰포트 너비(useIsMobile, 1024px 기준)로 자동 판단합니다.
 * ComponentsPage 문서 탭처럼 데스크톱/모바일을 나란히 강제로 보여줘야 할 때만 명시적으로 넘기세요.
 */
export function GNB({ mobile: mobileOverride, defaultOpen = false }: GNBProps) {
  const autoMobile = useIsMobile();
  const mobile = mobileOverride ?? autoMobile;
  const t = useT();
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(defaultOpen);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState(getCurrentMenuItem);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const menuId = useId();
  const serviceRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const currentLanguage = languageOptions.find((option) => option.value === language) ?? languageOptions[0];
  const stopDemoLink = (event: MouseEvent<HTMLAnchorElement>) => event.preventDefault();
  const handleLogout = () => {
    logout();
    window.location.hash = '#client';
  };

  useEffect(() => {
    const onHashChange = () => setCurrent(getCurrentMenuItem());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => onAuthChange(() => setLoggedIn(isLoggedIn())), []);

  useEffect(() => {
    const onScroll = (event: Event) => {
      const target = event.target;
      const scrollTop = target instanceof Element ? target.scrollTop : window.scrollY;
      setScrolled(scrollTop > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    return () => window.removeEventListener('scroll', onScroll, true);
  }, []);

  useEffect(() => {
    const closeMenus = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      setServiceOpen(false);
      setLangOpen(false);
    };
    window.addEventListener('keydown', closeMenus);
    return () => window.removeEventListener('keydown', closeMenus);
  }, []);

  useEffect(() => {
    if (!serviceOpen && !langOpen) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (serviceOpen && serviceRef.current && !serviceRef.current.contains(event.target as Node)) setServiceOpen(false);
      if (langOpen && langRef.current && !langRef.current.contains(event.target as Node)) setLangOpen(false);
    };
    window.addEventListener('pointerdown', closeOnOutsideClick);
    return () => window.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [serviceOpen, langOpen]);

  const renderMainMenuItem = (item: (typeof mainMenu)[number]) => {
    const isCurrent = item === current;
    const label = t(item, mainMenuEn[item]);
    if (item === '서비스') {
      return (
        <div className={styles.serviceMenu} ref={serviceRef} key={item}>
          <button type="button" className={`${styles.serviceTrigger} ${isCurrent ? styles.current : ''}`} aria-expanded={serviceOpen} onClick={() => setServiceOpen((value) => !value)}>
            {label} <ChevronDown size={15} className={styles.chevron} />
          </button>
          {serviceOpen && (
            <div className={styles.servicePanel} role="menu">
              {serviceMenu.map((sub) => (
                <a role="menuitem" key={sub.label} href={sub.href ?? '#service'} onClick={sub.href ? () => setServiceOpen(false) : (event) => { stopDemoLink(event); setServiceOpen(false); }}>{t(sub.label, sub.labelEn)}</a>
              ))}
            </div>
          )}
        </div>
      );
    }
    const href = menuHref[item];
    return <a className={isCurrent ? styles.current : ''} href={href ?? `#${item}`} onClick={href ? undefined : stopDemoLink} key={item}>{label}</a>;
  };

  return (
    <>
      <VersionSwitcher />
      <header className={`${styles.gnb} ${mobile ? styles.mobile : ''} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a className={styles.logo} href="#client" aria-label={t('PROVOICE 홈', 'PROVOICE Home')}><img src="/assets/provoice-logo.png" alt="PROVOICE" /></a>

        {!mobile && (
          <>
            <nav className={styles.desktopMenu} aria-label={t('주요 메뉴', 'Main menu')}>
              {mainMenu.map(renderMainMenuItem)}
            </nav>
            <div className={styles.utilityArea}>
              <nav className={styles.utilityLinks} aria-label={t('유틸리티 메뉴', 'Utility menu')}>
                <a href="#signup/expert">{t('전문가등록', 'Expert Sign-up')}</a>
                <span className={styles.utilityDivider} aria-hidden="true" />
                <div className={styles.langMenu} ref={langRef}>
                  <button type="button" className={styles.langTrigger} aria-expanded={langOpen} onClick={() => setLangOpen((value) => !value)}>
                    <span aria-hidden="true">{currentLanguage.flag}</span> {currentLanguage.label} <ChevronDown size={13} className={styles.chevron} />
                  </button>
                  {langOpen && (
                    <div className={styles.langPanel} role="menu">
                      {languageOptions.map((option) => (
                        <button type="button" role="menuitem" key={option.value} className={option.value === language ? styles.current : ''} onClick={() => { setLanguage(option.value); setLangOpen(false); }}>
                          <span aria-hidden="true">{option.flag}</span> {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className={styles.utilityDivider} aria-hidden="true" />
                {loggedIn ? (
                  <>
                    <a href="#mypage">{t('마이페이지', 'My Page')}</a>
                    <span className={styles.utilityDivider} aria-hidden="true" />
                    <button type="button" className={styles.logoutButton} onClick={handleLogout}>{t('로그아웃', 'Log out')}</button>
                  </>
                ) : (
                  <a href="#login">{t('로그인', 'Log in')}</a>
                )}
              </nav>
              <a className={styles.cta} href="#work-inquiry">{t('의뢰 문의', 'Get a Quote')} <span>↗</span></a>
            </div>
          </>
        )}

        {mobile && <button className={styles.menuButton} type="button" aria-label={open ? t('메뉴 닫기', 'Close menu') : t('메뉴 열기', 'Open menu')} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(!open)}><span /><span /></button>}

        {mobile && (
          <nav className={`${styles.mobileMenu} ${open ? styles.open : ''}`} id={menuId} aria-hidden={!open}>
            {mainMenu.map((item, index) => {
              if (item === '서비스') {
                const isCurrent = item === current;
                return (
                  <div className={styles.mobileService} key="서비스">
                    <button type="button" className={isCurrent ? styles.current : ''} aria-expanded={mobileServiceOpen} tabIndex={open ? 0 : -1} onClick={() => setMobileServiceOpen((value) => !value)}>
                      <span>0{index + 1}</span>{t('서비스', mainMenuEn['서비스'])} <ChevronDown size={16} className={styles.chevron} />
                    </button>
                    {mobileServiceOpen && (
                      <div className={styles.mobileServicePanel}>
                        {serviceMenu.map((sub) => (
                          <a key={sub.label} href={sub.href ?? '#service'} tabIndex={open ? 0 : -1} onClick={sub.href ? () => setOpen(false) : (event) => { stopDemoLink(event); setOpen(false); }}>{t(sub.label, sub.labelEn)}</a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              const href = menuHref[item];
              return (
                <a className={item === current ? styles.current : ''} href={href ?? `#${item}`} onClick={href ? () => setOpen(false) : (event) => { stopDemoLink(event); setOpen(false); }} tabIndex={open ? 0 : -1} key={item}>
                  <span>0{index + 1}</span>{t(item, mainMenuEn[item])}
                </a>
              );
            })}
            <div className={styles.mobileUtility}>
              <a href="#signup/expert" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{t('전문가등록', 'Expert Sign-up')}</a>
              {loggedIn ? (
                <>
                  <a href="#mypage" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{t('마이페이지', 'My Page')}</a>
                  <button type="button" tabIndex={open ? 0 : -1} onClick={() => { setOpen(false); handleLogout(); }}>{t('로그아웃', 'Log out')}</button>
                </>
              ) : (
                <a href="#login" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{t('로그인', 'Log in')}</a>
              )}
            </div>
            <a className={styles.mobileCta} href="#work-inquiry" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{t('의뢰 문의', 'Get a Quote')} <span>↗</span></a>
          </nav>
        )}
      </div>
      </header>
    </>
  );
}
