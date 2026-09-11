import { useState } from 'react';
import { Instagram, Youtube } from 'lucide-react';
import { FilterDropdown, LoadMoreControl, PortfolioCard, PortfolioDetail, PortfolioFilter, SectionHeader } from '../../components';
import styles from './PortfolioSections.module.css';
import type { PortfolioItem } from './types';

const portfolioSocialLinks = [
  { key: 'naver', label: '네이버 블로그', href: 'https://blog.naver.com/provoiceon', icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h5.05l4.15 6.06V4H19v16h-5.05L9.8 13.94V20H5V4Z" fill="currentColor" /></svg> },
  { key: 'youtube', label: '유튜브', href: 'https://www.youtube.com/channel/UCdJLg6AEtIPnuU-1OaaYPbQ', icon: <Youtube size={14} /> },
  { key: 'instagram', label: '인스타그램', href: 'https://www.instagram.com/provoice_kr/', icon: <Instagram size={14} /> },
] as const;

function PortfolioSocialLinks() {
  return (
    <div className={styles.portfolioSocialLinks}>
      {portfolioSocialLinks.map((link) => (
        <a key={link.key} className={styles.portfolioSocialLink} href={link.href} target="_blank" rel="noreferrer">
          <span className={`${styles.portfolioSocialIcon} ${styles[link.key]}`} aria-hidden="true">{link.icon}</span>
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function PortfolioSection<T extends string>({ tabs, cards, initialCount = 6, increment = 6, maxCount = 12 }: { tabs: readonly T[]; cards: PortfolioItem<Exclude<T, '전체'>>[]; initialCount?: number; increment?: number; maxCount?: number }) {
  const [active, setActive] = useState<T>(tabs[0]);
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem<Exclude<T, '전체'>> | null>(null);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const filtered = active === '전체' ? cards : cards.filter((card) => card.category === active);
  const visible = filtered.slice(0, Math.min(visibleCount, maxCount));
  const hasMore = visible.length < filtered.length && visible.length < maxCount;
  const handleFilter = (value: T) => { setActive(value); setVisibleCount(initialCount); };
  const openPortfolio = (card: PortfolioItem<Exclude<T, '전체'>>, cardOrigin: DOMRect) => {
    setOrigin(cardOrigin);
    setSelectedPortfolio(card);
  };
  return (
    <>
      <section className={`${styles.portfolioSection} ${selectedPortfolio ? styles.portfolioIsOpen : ''}`} aria-label="포트폴리오">
        <SectionHeader className={styles.portfolioHeader} eyebrow="PORTFOLIO" title="장르별 · 언어별로 보는 포트폴리오" description="게임, 애니메이션, 웹툰, 광고 등 다양한 프로젝트를 여러 언어의 목소리와 스타일로 한 번에 확인할 수 있습니다." />
        <PortfolioFilter items={tabs} value={active} onChange={handleFilter} className={styles.portfolioFilter} />
        <div className={styles.portfolioGrid}>
          {visible.map((card) => (
            <PortfolioCard key={`${card.title}-${card.tone}`} className={styles.portfolioGridCard} title={card.title} languages={card.languages} category={card.tone} tags={card.tags} highlight={card.highlight} image={card.image} onOpen={(cardOrigin) => openPortfolio(card, cardOrigin)} />
          ))}
        </div>
        <LoadMoreControl visible={visible.length} total={filtered.length} hasMore={hasMore} onLoadMore={() => setVisibleCount((count) => Math.min(count + increment, maxCount))} allHref="#portfolio" />
      </section>
      {selectedPortfolio && origin && <PortfolioDetail item={selectedPortfolio} origin={origin} onClose={() => setSelectedPortfolio(null)} />}
    </>
  );
}

const portfolioLanguageLabels: Record<string, string> = { KO: '한국어', EN: '영어', JP: '일본어', ZH: '중국어', ES: '스페인어', AR: '아랍어', FR: '프랑스어', DE: '독일어', RU: '러시아어', PT: '포르투갈어', IT: '이탈리아어', TR: '터키어', VI: '베트남어', ID: '인도네시아어', TH: '태국어' };
const portfolioLanguageOptions = Object.values(portfolioLanguageLabels);
const portfolioLanguageCodeByLabel = Object.fromEntries(Object.entries(portfolioLanguageLabels).map(([code, label]) => [label, code]));

export function PortfolioPageSection<T extends string>({ tabs, cards }: { tabs: readonly T[]; cards: PortfolioItem<Exclude<T, '전체'>>[] }) {
  const [active, setActive] = useState<T>(tabs[0]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem<Exclude<T, '전체'>> | null>(null);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const byCategory = active === '전체' ? cards : cards.filter((card) => card.category === active);
  const selectedLanguageCode = languages[0] ? portfolioLanguageCodeByLabel[languages[0]] : null;
  const filtered = selectedLanguageCode ? byCategory.filter((card) => card.languages.includes(selectedLanguageCode)) : byCategory;
  const handleFilter = (value: T) => setActive(value);
  const selectLanguage = (option: string) => setLanguages((current) => current.includes(option) ? [] : [option]);
  const openPortfolio = (card: PortfolioItem<Exclude<T, '전체'>>, cardOrigin: DOMRect) => {
    setOrigin(cardOrigin);
    setSelectedPortfolio(card);
  };
  return (
    <>
      <section className={`${styles.portfolioSection} ${selectedPortfolio ? styles.portfolioIsOpen : ''}`} aria-label="전체 포트폴리오">
        <SectionHeader headingLevel={1} className={styles.portfolioHeader} eyebrow="PORTFOLIO" title="모든 프로젝트 살펴보기" description="장르, 언어별로 원하는 작업 사례를 찾아보세요." />
        <PortfolioSocialLinks />
        <div className={styles.portfolioPageControls}>
          <FilterDropdown label="언어" options={portfolioLanguageOptions} selected={languages} onSelect={selectLanguage} />
          <PortfolioFilter items={tabs} value={active} onChange={handleFilter} className={styles.portfolioPageFilter} />
        </div>
        <div className={styles.portfolioImageGrid}>
          {filtered.map((card) => (
            <PortfolioCard key={`${card.title}-${card.tone}`} imageOnly title={card.title} languages={card.languages} category={card.tone} tags={card.tags} highlight={card.highlight} image={card.image} onOpen={(cardOrigin) => openPortfolio(card, cardOrigin)} />
          ))}
        </div>
        {filtered.length === 0 && <p className={styles.portfolioEmpty}>검색 조건에 맞는 프로젝트가 없습니다.</p>}
      </section>
      {selectedPortfolio && origin && <PortfolioDetail item={selectedPortfolio} origin={origin} onClose={() => setSelectedPortfolio(null)} />}
    </>
  );
}
