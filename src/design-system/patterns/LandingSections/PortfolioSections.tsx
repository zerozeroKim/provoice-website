import { useState } from 'react';
import { Instagram, Youtube } from 'lucide-react';
import { useT } from '@/lib/i18n';
import { FilterDropdown, LoadMoreControl, PortfolioCard, PortfolioDetail, PortfolioFilter, SectionHeader } from '../../components';
import styles from './PortfolioSections.module.css';
import type { PortfolioItem } from './types';

const portfolioSocialLinks = [
  { key: 'naver', ko: '네이버 블로그', en: 'Naver Blog', href: 'https://blog.naver.com/provoiceon', icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h5.05l4.15 6.06V4H19v16h-5.05L9.8 13.94V20H5V4Z" fill="currentColor" /></svg> },
  { key: 'youtube', ko: '유튜브', en: 'YouTube', href: 'https://www.youtube.com/channel/UCdJLg6AEtIPnuU-1OaaYPbQ', icon: <Youtube size={14} /> },
  { key: 'instagram', ko: '인스타그램', en: 'Instagram', href: 'https://www.instagram.com/provoice_kr/', icon: <Instagram size={14} /> },
] as const;

function PortfolioSocialLinks() {
  const t = useT();
  return (
    <div className={styles.portfolioSocialLinks}>
      {portfolioSocialLinks.map((link) => (
        <a key={link.key} className={styles.portfolioSocialLink} href={link.href} target="_blank" rel="noreferrer">
          <span className={`${styles.portfolioSocialIcon} ${styles[link.key]}`} aria-hidden="true">{link.icon}</span>
          {t(link.ko, link.en)}
        </a>
      ))}
    </div>
  );
}

/** 7개 장르 카테고리 탭과, PortfolioCard 모서리에 붙는 톤 배지(GAME/OTT 등)의 영문 라벨입니다. */
const categoryLabelEn: Record<string, string> = { 애니메이션: 'Animation', 게임: 'Game', 광고: 'Ad', 웹툰: 'Webtoon', OTT: 'OTT', 유튜브: 'YouTube', 오디오북: 'Audiobook' };
const toneLabelEn: Record<string, string> = { GAME: 'GAME', ANIMATION: 'ANIMATION', 웹툰: 'WEBTOON', 광고: 'AD', OTT: 'OTT', 유튜브: 'YOUTUBE', 오디오북: 'AUDIOBOOK' };

export function PortfolioSection<T extends string>({ tabs, cards, initialCount = 6, increment = 6, maxCount = 12 }: { tabs: readonly T[]; cards: PortfolioItem<Exclude<T, '전체'>>[]; initialCount?: number; increment?: number; maxCount?: number }) {
  const t = useT();
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
      <section className={`${styles.portfolioSection} ${selectedPortfolio ? styles.portfolioIsOpen : ''}`} aria-label={t('포트폴리오', 'Portfolio')}>
        <SectionHeader className={styles.portfolioHeader} eyebrow="PORTFOLIO" title={t('장르별 · 언어별로 보는 포트폴리오', 'Portfolio by genre and language')} description={t('게임, 애니메이션, 웹툰, 광고 등 다양한 프로젝트를 여러 언어의 목소리와 스타일로 한 번에 확인할 수 있습니다.', 'Browse projects across game, animation, webtoon, ads and more — in a range of languages, voices and styles, all in one place.')} />
        <PortfolioFilter items={tabs} value={active} onChange={handleFilter} labelFor={(item) => t(item, categoryLabelEn[item] ?? item)} className={styles.portfolioFilter} />
        <div className={styles.portfolioGrid}>
          {visible.map((card) => (
            <PortfolioCard key={`${card.title}-${card.tone}`} className={styles.portfolioGridCard} title={card.title} languages={card.languages} category={t(card.tone, toneLabelEn[card.tone] ?? card.tone)} tags={card.tags} highlight={card.highlight} image={card.image} onOpen={(cardOrigin) => openPortfolio(card, cardOrigin)} />
          ))}
        </div>
        <LoadMoreControl visible={visible.length} total={filtered.length} hasMore={hasMore} onLoadMore={() => setVisibleCount((count) => Math.min(count + increment, maxCount))} allHref="#portfolio" />
      </section>
      {selectedPortfolio && origin && <PortfolioDetail item={selectedPortfolio} origin={origin} onClose={() => setSelectedPortfolio(null)} />}
    </>
  );
}

/**
 * admin에서 언어 그룹을 추가·수정할 수 있어야 하는 요구사항의 프런트엔드 쪽 반영입니다.
 * '기타'는 아래 4개 언어 외 전부를 묶어서 보여주며, 실제 추가/수정은 백엔드·admin 연동이 붙어야 동작합니다.
 */
const portfolioLanguageGroups = [
  { ko: '한국어', en: 'Korean', codes: ['KO'] },
  { ko: '영어', en: 'English', codes: ['EN'] },
  { ko: '중국어', en: 'Chinese', codes: ['ZH'] },
  { ko: '일본어', en: 'Japanese', codes: ['JP'] },
  { ko: '기타', en: 'Other', codes: null },
] as const;
const namedLanguageCodes: string[] = portfolioLanguageGroups.flatMap((group) => group.codes ?? []);
const matchesLanguageGroup = (cardLanguages: string[], groupLabel: string | null) => {
  if (!groupLabel) return true;
  const group = portfolioLanguageGroups.find((item) => item.ko === groupLabel || item.en === groupLabel);
  if (!group) return true;
  return group.codes
    ? cardLanguages.some((code) => (group.codes as readonly string[]).includes(code))
    : cardLanguages.some((code) => !namedLanguageCodes.includes(code));
};

export function PortfolioPageSection<T extends string>({ tabs, cards }: { tabs: readonly T[]; cards: PortfolioItem<Exclude<T, '전체'>>[] }) {
  const t = useT();
  const [active, setActive] = useState<T>(tabs[0]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem<Exclude<T, '전체'>> | null>(null);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const byCategory = active === '전체' ? cards : cards.filter((card) => card.category === active);
  const filtered = byCategory.filter((card) => matchesLanguageGroup(card.languages, languages[0] ?? null));
  const handleFilter = (value: T) => setActive(value);
  const portfolioLanguageOptions = portfolioLanguageGroups.map((group) => t(group.ko, group.en));
  const selectLanguage = (option: string) => setLanguages((current) => current.includes(option) ? [] : [option]);
  const openPortfolio = (card: PortfolioItem<Exclude<T, '전체'>>, cardOrigin: DOMRect) => {
    setOrigin(cardOrigin);
    setSelectedPortfolio(card);
  };
  return (
    <>
      <section className={`${styles.portfolioSection} ${selectedPortfolio ? styles.portfolioIsOpen : ''}`} aria-label={t('전체 포트폴리오', 'All portfolio')}>
        <SectionHeader headingLevel={1} className={styles.portfolioHeader} eyebrow="PORTFOLIO" title={t('모든 프로젝트 살펴보기', 'Browse all projects')} description={t('장르, 언어별로 원하는 작업 사례를 찾아보세요.', 'Find the work you need by genre and language.')} />
        <PortfolioSocialLinks />
        <div className={styles.portfolioPageControls}>
          <FilterDropdown label={t('언어', 'Language')} options={portfolioLanguageOptions} selected={languages} onSelect={selectLanguage} align="end" />
          <PortfolioFilter items={tabs} value={active} onChange={handleFilter} labelFor={(item) => t(item, categoryLabelEn[item] ?? item)} className={styles.portfolioPageFilter} />
        </div>
        <div className={styles.portfolioImageGrid}>
          {filtered.map((card) => (
            <PortfolioCard key={`${card.title}-${card.tone}`} imageOnly title={card.title} languages={card.languages} category={t(card.tone, toneLabelEn[card.tone] ?? card.tone)} tags={card.tags} highlight={card.highlight} client={card.client} image={card.image} onOpen={(cardOrigin) => openPortfolio(card, cardOrigin)} />
          ))}
        </div>
        {filtered.length === 0 && <p className={styles.portfolioEmpty}>{t('검색 조건에 맞는 프로젝트가 없습니다.', 'No projects match your search.')}</p>}
      </section>
      {selectedPortfolio && origin && <PortfolioDetail item={selectedPortfolio} origin={origin} onClose={() => setSelectedPortfolio(null)} />}
    </>
  );
}
