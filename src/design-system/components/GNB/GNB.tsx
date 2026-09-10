import { useEffect, useId, useRef, useState, type MouseEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import styles from './GNB.module.css';

const mainMenu = ['성우검색', '서비스', '포트폴리오', '작업문의', '블로그'] as const;
const menuHref: Partial<Record<(typeof mainMenu)[number], string>> = { 성우검색: '#voice-search', 포트폴리오: '#portfolio' };

const serviceMenu = [
  { label: '애니메이션·게임·웹툰 더빙', href: undefined },
  { label: '기업 홍보·유튜브 콘텐츠', href: undefined },
  { label: '번역 (ISO 17100)', href: undefined },
  { label: 'AI × Human 하이브리드 더빙', href: '#ai' },
] as const;

const languageOptions = [
  { label: '한국어', flag: '🇰🇷' },
  { label: 'English', flag: '🇺🇸' },
] as const;

const getCurrentMenuItem = () => {
  const hash = window.location.hash;
  if (hash === '#ai') return '서비스';
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
  const [open, setOpen] = useState(defaultOpen);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState<(typeof languageOptions)[number]>(languageOptions[0]);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState(getCurrentMenuItem);
  const menuId = useId();
  const serviceRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const stopDemoLink = (event: MouseEvent<HTMLAnchorElement>) => event.preventDefault();

  useEffect(() => {
    const onHashChange = () => setCurrent(getCurrentMenuItem());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

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
    if (item === '서비스') {
      return (
        <div className={styles.serviceMenu} ref={serviceRef} key={item}>
          <button type="button" className={`${styles.serviceTrigger} ${isCurrent ? styles.current : ''}`} aria-expanded={serviceOpen} onClick={() => setServiceOpen((value) => !value)}>
            서비스 <ChevronDown size={15} className={styles.chevron} />
          </button>
          {serviceOpen && (
            <div className={styles.servicePanel} role="menu">
              {serviceMenu.map((sub) => (
                <a role="menuitem" key={sub.label} href={sub.href ?? '#service'} onClick={sub.href ? () => setServiceOpen(false) : (event) => { stopDemoLink(event); setServiceOpen(false); }}>{sub.label}</a>
              ))}
            </div>
          )}
        </div>
      );
    }
    const href = menuHref[item];
    return <a className={isCurrent ? styles.current : ''} href={href ?? `#${item}`} onClick={href ? undefined : stopDemoLink} key={item}>{item}</a>;
  };

  return (
    <header className={`${styles.gnb} ${mobile ? styles.mobile : ''} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a className={styles.logo} href="#client" aria-label="PROVOICE 홈"><img src="/assets/provoice-logo.png" alt="PROVOICE" /></a>

        {!mobile && (
          <>
            <nav className={styles.desktopMenu} aria-label="주요 메뉴">
              {mainMenu.map(renderMainMenuItem)}
            </nav>
            <div className={styles.utilityArea}>
              <nav className={styles.utilityLinks} aria-label="유틸리티 메뉴">
                <a href="#register" onClick={stopDemoLink}>전문가등록</a>
                <span className={styles.utilityDivider} aria-hidden="true" />
                <div className={styles.langMenu} ref={langRef}>
                  <button type="button" className={styles.langTrigger} aria-expanded={langOpen} onClick={() => setLangOpen((value) => !value)}>
                    <span aria-hidden="true">{language.flag}</span> {language.label} <ChevronDown size={13} className={styles.chevron} />
                  </button>
                  {langOpen && (
                    <div className={styles.langPanel} role="menu">
                      {languageOptions.map((option) => (
                        <button type="button" role="menuitem" key={option.label} className={option.label === language.label ? styles.current : ''} onClick={() => { setLanguage(option); setLangOpen(false); }}>
                          <span aria-hidden="true">{option.flag}</span> {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className={styles.utilityDivider} aria-hidden="true" />
                <a href="#login">로그인</a>
              </nav>
              <button className={styles.cta} type="button">의뢰 문의 <span>↗</span></button>
            </div>
          </>
        )}

        {mobile && <button className={styles.menuButton} type="button" aria-label={open ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(!open)}><span /><span /></button>}

        {mobile && (
          <nav className={`${styles.mobileMenu} ${open ? styles.open : ''}`} id={menuId} aria-hidden={!open}>
            {mainMenu.map((item, index) => {
              if (item === '서비스') {
                const isCurrent = item === current;
                return (
                  <div className={styles.mobileService} key="서비스">
                    <button type="button" className={isCurrent ? styles.current : ''} aria-expanded={mobileServiceOpen} tabIndex={open ? 0 : -1} onClick={() => setMobileServiceOpen((value) => !value)}>
                      <span>0{index + 1}</span>서비스 <ChevronDown size={16} className={styles.chevron} />
                    </button>
                    {mobileServiceOpen && (
                      <div className={styles.mobileServicePanel}>
                        {serviceMenu.map((sub) => (
                          <a key={sub.label} href={sub.href ?? '#service'} tabIndex={open ? 0 : -1} onClick={sub.href ? () => setOpen(false) : (event) => { stopDemoLink(event); setOpen(false); }}>{sub.label}</a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              const href = menuHref[item];
              return (
                <a className={item === current ? styles.current : ''} href={href ?? `#${item}`} onClick={href ? () => setOpen(false) : (event) => { stopDemoLink(event); setOpen(false); }} tabIndex={open ? 0 : -1} key={item}>
                  <span>0{index + 1}</span>{item}
                </a>
              );
            })}
            <div className={styles.mobileUtility}>
              <a href="#register" tabIndex={open ? 0 : -1} onClick={stopDemoLink}>전문가등록</a>
              <a href="#login" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>로그인</a>
            </div>
            <button className={styles.mobileCta} type="button" tabIndex={open ? 0 : -1}>의뢰 문의 <span>↗</span></button>
          </nav>
        )}
      </div>
    </header>
  );
}
