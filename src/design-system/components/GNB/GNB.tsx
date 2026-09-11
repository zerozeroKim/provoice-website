import { useEffect, useId, useState, type MouseEvent } from 'react';
import { VersionSwitcher } from '../VersionSwitcher';
import styles from './GNB.module.css';

const menu = ['홈', '성우검색', '서비스', '포트폴리오'];
const menuHref: Record<string, string> = { 홈: '#client', 성우검색: '#voice-search', 포트폴리오: '#portfolio' };
const getCurrentMenuItem = () => menu.find((item) => menuHref[item] === window.location.hash) ?? '홈';

export type GNBProps = { mobile?: boolean; defaultOpen?: boolean };

export function GNB({ mobile = false, defaultOpen = false }: GNBProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState(getCurrentMenuItem);
  const menuId = useId();
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
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeMenus);
    return () => window.removeEventListener('keydown', closeMenus);
  }, []);

  return (
    <>
      <VersionSwitcher />
      <header className={`${styles.gnb} ${mobile ? styles.mobile : ''} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a className={styles.logo} href="#home" aria-label="PROVOICE 홈" onClick={stopDemoLink}><img src="/assets/provoice-logo.png" alt="PROVOICE" /></a>
        {!mobile && <><nav className={styles.desktopMenu} aria-label="주요 메뉴">{menu.map((item, index) => <a className={item === current ? styles.current : ''} href={menuHref[item] ?? `#${item}`} onClick={menuHref[item] ? undefined : stopDemoLink} key={item}>{item}</a>)}<a className={styles.aiTrigger} href="#ai"><i>NEW</i><b>PROVOICE × AI</b></a></nav><button className={styles.cta} type="button">의뢰문의 <span>↗</span></button></>}
        {mobile && <button className={styles.menuButton} type="button" aria-label={open ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(!open)}><span /><span /></button>}
        {mobile && <nav className={`${styles.mobileMenu} ${open ? styles.open : ''}`} id={menuId} aria-hidden={!open}>{menu.map((item, index) => <a className={item === current ? styles.current : ''} href={menuHref[item] ?? `#${item}`} onClick={menuHref[item] ? () => setOpen(false) : (event) => { stopDemoLink(event); setOpen(false); }} tabIndex={open ? 0 : -1} key={item}><span>0{index + 1}</span>{item}</a>)}<a className={styles.mobileAi} href="#ai" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}><span>06</span><b>PROVOICE × AI</b><i>NEW</i></a><button className={styles.mobileCta} type="button" tabIndex={open ? 0 : -1}>의뢰문의 <span>↗</span></button></nav>}
      </div>
      </header>
    </>
  );
}
