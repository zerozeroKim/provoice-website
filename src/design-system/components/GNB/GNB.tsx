import { useEffect, useId, useRef, useState, type MouseEvent } from 'react';
import styles from './GNB.module.css';

const menu = ['홈', '성우검색', '서비스', '포트폴리오', '번역'];
const aiMenu = ['AI Voice', '성우 × AI 하이브리드', 'Voice Data'];

export type GNBProps = { mobile?: boolean; defaultOpen?: boolean };

export function GNB({ mobile = false, defaultOpen = false }: GNBProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [aiOpen, setAiOpen] = useState(defaultOpen);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const aiMenuId = useId();
  const aiRef = useRef<HTMLDivElement>(null);
  const stopDemoLink = (event: MouseEvent<HTMLAnchorElement>) => event.preventDefault();

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
      if (event.key === 'Escape') { setAiOpen(false); setOpen(false); }
    };
    const closeOutside = (event: PointerEvent) => {
      if (aiRef.current && !aiRef.current.contains(event.target as Node)) setAiOpen(false);
    };
    window.addEventListener('keydown', closeMenus);
    window.addEventListener('pointerdown', closeOutside);
    return () => { window.removeEventListener('keydown', closeMenus); window.removeEventListener('pointerdown', closeOutside); };
  }, []);

  return (
    <header className={`${styles.gnb} ${mobile ? styles.mobile : ''} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a className={styles.logo} href="#home" aria-label="PROVOICE 홈" onClick={stopDemoLink}><img src="/assets/provoice-logo.png" alt="PROVOICE" /></a>
        {!mobile && <><nav className={styles.desktopMenu} aria-label="주요 메뉴">{menu.map((item, index) => <a className={index === 0 ? styles.current : ''} href={`#${item}`} onClick={stopDemoLink} key={item}>{item}</a>)}<div className={styles.aiNav} ref={aiRef}><button className={styles.aiTrigger} type="button" aria-expanded={aiOpen} aria-controls={aiMenuId} onClick={() => setAiOpen(!aiOpen)}><i>NEW</i><b>PROVOICE × AI</b><span>⌄</span></button><div className={`${styles.aiDropdown} ${aiOpen ? styles.aiOpen : ''}`} id={aiMenuId}>{aiMenu.map((item) => <a href={`#${item}`} onClick={(event) => { stopDemoLink(event); setAiOpen(false); }} tabIndex={aiOpen ? 0 : -1} key={item}>{item}<span>↗</span></a>)}</div></div></nav><button className={styles.cta} type="button">의뢰문의 <span>↗</span></button></>}
        {mobile && <button className={styles.menuButton} type="button" aria-label={open ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(!open)}><span /><span /></button>}
        {mobile && <nav className={`${styles.mobileMenu} ${open ? styles.open : ''}`} id={menuId} aria-hidden={!open}>{menu.map((item, index) => <a className={index === 0 ? styles.current : ''} href={`#${item}`} onClick={(event) => { stopDemoLink(event); setOpen(false); }} tabIndex={open ? 0 : -1} key={item}><span>0{index + 1}</span>{item}</a>)}<div className={styles.mobileAi}><button type="button" aria-expanded={aiOpen} aria-controls={aiMenuId} tabIndex={open ? 0 : -1} onClick={() => setAiOpen(!aiOpen)}><span>06</span><b>PROVOICE × AI</b><i>NEW</i><em>⌄</em></button><div className={`${styles.mobileAiItems} ${aiOpen ? styles.mobileAiOpen : ''}`} id={aiMenuId}>{aiMenu.map((item) => <a href={`#${item}`} onClick={(event) => { stopDemoLink(event); setOpen(false); }} tabIndex={open && aiOpen ? 0 : -1} key={item}>{item}<span>↗</span></a>)}</div></div><button className={styles.mobileCta} type="button" tabIndex={open ? 0 : -1}>의뢰문의 <span>↗</span></button></nav>}
      </div>
    </header>
  );
}
