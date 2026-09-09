import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, BadgeCheck, ChevronDown, Instagram, Languages, Search, Sparkles, Users, Youtube } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import MagicRings from '@/components/reactbits/MagicRings';
import GradientWaves from '@/components/reactbits/GradientWaves';
import { useIsMobile } from '@/hooks/use-mobile';
import { ActionCard, Button, Chip, LoadMoreControl, Modal, Pagination, PortfolioCard, PortfolioDetail, PortfolioFilter, SectionHeader, ServiceCard, TextField, VoiceActorCard } from '../../components';
import type { PortfolioItem } from '../../components';
import styles from './LandingSections.module.css';

export type { PortfolioItem };
export type HeroStat = { value: string; label: string };
export type TalentProfile = { name: string; locale: string; tags: string[]; duration: number; verified: boolean };
export type ServiceItem = { icon?: ReactNode; imageSrc?: string; imageAlt?: string; title: string; description: string; badge?: string; link?: string };
export type TranslationRow = { label: string; value: string };

export function HeroSection({ stats }: { stats: HeroStat[] }) {
  const isMobile = useIsMobile();
  return (
    <section className={styles.hero} aria-label="프로보이스 히어로 섹션">
      <div className={styles.heroWave} aria-hidden="true"><MagicRings color="#8038FF" colorTwo="#C34DFF" ringCount={isMobile ? 3 : 4} speed={0.55} attenuation={8} lineThickness={isMobile ? 1.4 : 2} baseRadius={isMobile ? 0.22 : 0.6} radiusStep={isMobile ? 0.05 : 0.09} scaleRate={0.12} opacity={0.7} blur={3} noiseAmount={0.04} ringGap={1.4} /></div>
      <div className={styles.heroInner}><div className={styles.copy}>
        <div className={styles.kicker}>MULTILINGUAL VOICE LOCALIZATION</div>
        <h1 className={styles.title}><span>글로벌 성우 더빙 No.1</span><span className={styles.gradientText}>&amp; ISO 인증 전문 번역</span></h1>
        <p className={styles.description}>ISO 17100 인증 번역부터 30개국 원어민 성우 녹음,<br />게임 사운드 제작까지 — 프로보이스의 원스탑 로컬라이징 솔루션.</p>
        <div className={styles.ctaRow}><button type="button" className={styles.primaryButton}>프로젝트 의뢰하기</button><button type="button" className={styles.secondaryButton}>성우 디렉토리 보기</button></div>
        <div className={styles.stats}>{stats.map((stat) => <div key={stat.label} className={styles.statItem}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
      </div></div>
    </section>
  );
}

export function AISection() {
  return (
    <section className={styles.aiHero} aria-label="PROVOICE × AI">
      <div className={styles.aiWave} aria-hidden="true">
        <GradientWaves horizonColor="#ffffff" waveColor="#e8dcff" crestColor="#f3d8ff" speed={0.4} amplitude={2.4} waveScale={0.55} waveRatio={0.9} swell={30} turbulence={18} tilt={1.15} zoom={1.05} height={4.2} fogDepth={19} detail="medium" brightness={1.08} opacity={0.72} mouseInteraction parallaxStrength={0.5} grain grainIntensity={0.015} />
      </div>
      <div className={styles.heroInner}><div className={styles.copy}>
        <div className={styles.kicker}>PROVOICE × AI</div>
        <h1 className={styles.title}><span>AI와 사람이 함께 완성하는</span><span className={styles.gradientText}>다음 세대의 목소리</span></h1>
        <p className={styles.description}>대사가 많은 서브 캐릭터와 반복 작업은 AI로 속도를 높이고,<br />감정이 중요한 장면은 성우의 연기로 완성하는 하이브리드 더빙입니다.</p>
        <div className={styles.ctaRow}><button type="button" className={styles.primaryButton}>AI 하이브리드 더빙 문의하기</button><button type="button" className={styles.secondaryButton}>적용 사례 보기</button></div>
      </div></div>
    </section>
  );
}

const recognizedConditions = ['일본어', '20대', '여성', '캐릭터 보이스'];

export function TalentDirectorySection({ talents }: { talents: TalentProfile[] }) {
  const [query, setQuery] = useState('일본어 하는 20대 여성 캐릭터 보이스');
  const [hasSearched, setHasSearched] = useState(false);
  const [showAllTalents, setShowAllTalents] = useState(false);
  const carouselTalents = useMemo(() => [...talents].sort(() => Math.random() - 0.5).slice(0, 10), [talents]);
  const carouselSequence = useMemo(() => Array.from({ length: 4 }, () => carouselTalents).flat(), [carouselTalents]);
  const matchedTalents = useMemo(() => {
    const normalized = query.toLowerCase();
    const locale = normalized.includes('일본어') ? 'JP' : normalized.includes('한국어') ? 'KO' : normalized.includes('영어') ? 'EN' : null;
    const trait = ['캐릭터', '게임', '내레이션', '광고', '키즈', '더빙', '다큐'].find((item) => normalized.includes(item));
    const filtered = talents.filter((talent) => (!locale || talent.locale.includes(locale)) && (!trait || talent.tags.some((tag) => tag.includes(trait))));
    return filtered.length ? filtered : talents;
  }, [query, talents]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim()) {
      setHasSearched(true);
      setShowAllTalents(false);
    }
  };

  const visibleTalents = showAllTalents ? matchedTalents : matchedTalents.slice(0, 4);

  return (
    <section className={styles.talentSection} aria-label="성우 검색">
      <div className={styles.talentAmbient} aria-hidden="true"><span /><span /></div>
      <div className={styles.talentInner}>
      <SectionHeader className={styles.talentHeader} eyebrow="VOICE TALENT DIRECTORY" title={<>성우 검색<br /><span className={styles.talentTitleGradient}>문장으로 편하게 찾아보세요</span></>} description={<>“일본어 하는 20대 여성 캐릭터 보이스”처럼 원하는 조건을 문장으로 입력하면 자동으로 매칭해드립니다.</>} />
      <div className={styles.talentWorkspace}>
        <div className={styles.searchShell}>
          <form className={styles.searchRow} onSubmit={handleSearch}>
            <TextField label="성우 검색" hideLabel fieldSize="md" leadingIcon={<Search size={18} strokeWidth={1.75} />} value={query} onChange={(event) => { setQuery(event.target.value); setHasSearched(false); setShowAllTalents(false); }} placeholder="예) 일본어 하는 20대 여성 캐릭터 보이스" containerClassName={styles.searchField} />
            <Button type="submit" size="md">검색</Button>
          </form>
          <div className={styles.searchMeta}>
            <div className={styles.searchMetaChips}>{recognizedConditions.map((condition) => <Chip key={condition} variant="status" tone="purple" size="md">{condition}</Chip>)}</div>
          </div>
        </div>
        {!hasSearched && <div className={styles.talentCarousel} aria-label="추천 성우">
          <div className={styles.talentCarouselTrack}>
            {[...carouselSequence, ...carouselSequence].map((talent, index) => <VoiceActorCard key={`${talent.name}-${index}`} className={styles.talentCarouselCard} name={talent.name} nickname={talent.locale} verified={talent.verified} tags={talent.tags} duration={talent.duration} />)}
          </div>
        </div>}
        {hasSearched && <div className={styles.talentResults}>
          <div className={styles.talentResultsHeader}>
            <div className={styles.talentSummary}><Users size={16} strokeWidth={1.75} aria-hidden="true" /> 검색 결과 <strong>{matchedTalents.length}명</strong></div>
            {matchedTalents.length > 4 && <Button variant="ghost" size="sm" trailingIcon={<span aria-hidden="true">{showAllTalents ? '↑' : '→'}</span>} onClick={() => setShowAllTalents((value) => !value)}>{showAllTalents ? '접기' : '전체보기'}</Button>}
          </div>
          <div className={styles.talentGrid}>{visibleTalents.map((talent) => <VoiceActorCard key={talent.name} className={styles.talentCard} name={talent.name} nickname={talent.locale} verified={talent.verified} tags={talent.tags} duration={talent.duration} />)}</div>
          <div className={styles.bottomBanner}><p><strong>프로보이스 등록 성우</strong><span>실제 프로젝트 이력으로 검증된 프로필을 만들고 새로운 프로젝트 섭외를 받아보세요.</span></p><button type="button" className={styles.bannerButton}>성우 등록하기</button></div>
        </div>}
      </div>
      </div>
    </section>
  );
}

const talentLanguageOptions = ['한국어', '영어', '일본어', '중국어', '스페인어', '아랍어', '베트남어', '인도네시아어', '태국어', '프랑스어', '독일어', '러시아어', '포르투갈어', '이탈리아어', '터키어'];
const talentGenderOptions = ['남성', '여성'];
const talentCategoryOptions = ['게임', '광고(TV)', '교육영상', '기업홍보', '나레이션', '노래·보컬', '안내멘트, ARS', '오디오북', '유튜브', '캐릭터', '키즈', '기타'];
const talentToneOptions = ['감성적인&따뜻한', '고음의', '귀여운', '대화체의', '드라마틱', '무서운', '밝은', '비꼬는', '섹시한', '자신감', '자연스러운', '재밌는', '저음의', '중음의', '진중한', '차분한', '친근한', '투박한', '기타'];
const talentAgeOptions = ['아이', '청년', '중년', '노년', '미상'];

function TalentFilterDropdown({ label, options, selected, multiple = false, onSelect }: { label: string; options: string[]; selected: string[]; multiple?: boolean; onSelect: (option: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => { if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false); };
    window.addEventListener('pointerdown', close);
    return () => window.removeEventListener('pointerdown', close);
  }, [open]);

  const triggerLabel = selected.length === 0 ? label : multiple ? `${label} (${selected.length})` : selected[0];
  const handleOptionClick = (option: string) => {
    onSelect(option);
    if (!multiple) setOpen(false);
  };

  return (
    <div className={styles.talentFilter} ref={ref}>
      <button type="button" className={`${styles.talentFilterTrigger} ${selected.length ? styles.talentFilterTriggerActive : ''}`} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span>{triggerLabel}</span>
        <ChevronDown size={16} className={styles.talentFilterChevron} />
      </button>
      {open && (
        <div className={styles.talentFilterPanel} role={multiple ? 'group' : 'listbox'} aria-label={`${label} 선택${multiple ? ' (다중 선택 가능)' : ''}`}>
          {options.map((option) => (
            <button key={option} type="button" className={`${styles.talentFilterOption} ${selected.includes(option) ? styles.talentFilterOptionActive : ''}`} aria-pressed={multiple ? selected.includes(option) : undefined} aria-selected={!multiple ? selected.includes(option) : undefined} onClick={() => handleOptionClick(option)}>{option}</button>
          ))}
        </div>
      )}
    </div>
  );
}

export function TalentFilterSection({ talents, pageSize = 20 }: { talents: TalentProfile[]; pageSize?: number }) {
  const [languages, setLanguages] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tones, setTones] = useState<string[]>([]);
  const [ages, setAges] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const selectSingle = (setter: (value: string[]) => void, current: string[]) => (option: string) => {
    setter(current.includes(option) ? [] : [option]);
    setPage(1);
  };
  const toggleMulti = (setter: (updater: (current: string[]) => string[]) => void) => (option: string) => {
    setter((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option]);
    setPage(1);
  };

  const matchedTalents = useMemo(() => {
    const selectedLanguage = languages[0];
    const localeFilter = selectedLanguage === '한국어' ? 'KO' : selectedLanguage === '영어' ? 'EN' : selectedLanguage === '일본어' ? 'JP' : null;
    return talents.filter((talent) => !localeFilter || talent.locale.includes(localeFilter));
  }, [languages, talents]);
  const totalPages = Math.max(1, Math.ceil(matchedTalents.length / pageSize));
  const visibleTalents = matchedTalents.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section className={styles.talentFilterSection} aria-label="성우 검색 — 필터 검색">
      <div className={styles.talentInner}>
        <div className={styles.talentFilterShell}>
          <div className={styles.talentFilterRow}>
            <TalentFilterDropdown label="언어" options={talentLanguageOptions} selected={languages} onSelect={selectSingle(setLanguages, languages)} />
            <TalentFilterDropdown label="성별" options={talentGenderOptions} selected={genders} onSelect={selectSingle(setGenders, genders)} />
            <TalentFilterDropdown label="카테고리" options={talentCategoryOptions} selected={categories} onSelect={selectSingle(setCategories, categories)} />
            <TalentFilterDropdown label="톤" options={talentToneOptions} selected={tones} multiple onSelect={toggleMulti(setTones)} />
            <TalentFilterDropdown label="연령" options={talentAgeOptions} selected={ages} onSelect={selectSingle(setAges, ages)} />
          </div>
        </div>
        <div className={styles.talentResults}>
          <div className={styles.talentResultsHeader}>
            <div className={styles.talentSummary}>검색 결과 <strong>{matchedTalents.length}명</strong></div>
          </div>
          <div className={styles.talentGrid}>{visibleTalents.map((talent) => <VoiceActorCard key={talent.name} className={styles.talentCard} name={talent.name} nickname={talent.locale} verified={talent.verified} tags={talent.tags} duration={talent.duration} />)}</div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </section>
  );
}

export function ServiceSection({ services }: { services: ServiceItem[] }) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  return <><section className={styles.serviceSection} aria-label="서비스 소개"><div className={styles.serviceInner}><SectionHeader className={styles.serviceHeader} eyebrow="SERVICE" title="하나의 팀, 원스톱 로컬라이징" description="캐스팅부터 번역, 사운드까지 — 콘텐츠 하나를 세계 여러 시장에 내보낼 수 있도록 설계된 서비스를 제공합니다." /><div className={styles.serviceGrid}>{services.map((service) => <ServiceCard key={service.title} {...service} onOpen={() => setSelectedService(service)} />)}</div></div></section><Modal open={Boolean(selectedService)} title={selectedService?.title ?? '서비스 안내'} onClose={() => setSelectedService(null)}>{selectedService && <div className={styles.serviceModalBody}>{selectedService.imageSrc && <img src={selectedService.imageSrc} alt={selectedService.imageAlt ?? ''} />}<p>{selectedService.description}</p><Button fullWidth onClick={() => setSelectedService(null)}>프로젝트 문의하기</Button></div>}</Modal></>;
}

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
  return <><section className={`${styles.portfolioSection} ${selectedPortfolio ? styles.portfolioIsOpen : ''}`} aria-label="포트폴리오"><SectionHeader className={styles.portfolioHeader} eyebrow="PORTFOLIO" title="장르별 · 언어별로 보는 포트폴리오" description="게임, 애니메이션, 웹툰, 광고 등 다양한 프로젝트를 여러 언어의 목소리와 스타일로 한 번에 확인할 수 있습니다." /><PortfolioFilter items={tabs} value={active} onChange={handleFilter} className={styles.portfolioFilter} /><div className={styles.portfolioGrid}>{visible.map((card) => <PortfolioCard key={`${card.title}-${card.tone}`} className={styles.portfolioGridCard} title={card.title} languages={card.languages} category={card.tone} tags={card.tags} highlight={card.highlight} image={card.image} onOpen={(cardOrigin) => openPortfolio(card, cardOrigin)} />)}</div><LoadMoreControl visible={visible.length} total={filtered.length} hasMore={hasMore} onLoadMore={() => setVisibleCount((count) => Math.min(count + increment, maxCount))} allHref="#portfolio" /></section>{selectedPortfolio && origin && <PortfolioDetail item={selectedPortfolio} origin={origin} onClose={() => setSelectedPortfolio(null)} />}</>;
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
  return <><section className={`${styles.portfolioSection} ${selectedPortfolio ? styles.portfolioIsOpen : ''}`} aria-label="전체 포트폴리오">
    <SectionHeader className={styles.portfolioHeader} eyebrow="PORTFOLIO" title="모든 프로젝트 살펴보기" description="장르, 언어별로 원하는 작업 사례를 찾아보세요." />
    <PortfolioSocialLinks />
    <div className={styles.portfolioPageControls}>
      <TalentFilterDropdown label="언어" options={portfolioLanguageOptions} selected={languages} onSelect={selectLanguage} />
      <PortfolioFilter items={tabs} value={active} onChange={handleFilter} className={styles.portfolioPageFilter} />
    </div>
    <div className={styles.portfolioImageGrid}>{filtered.map((card) => <PortfolioCard key={`${card.title}-${card.tone}`} imageOnly title={card.title} languages={card.languages} category={card.tone} tags={card.tags} highlight={card.highlight} image={card.image} onOpen={(cardOrigin) => openPortfolio(card, cardOrigin)} />)}</div>
    {filtered.length === 0 && <p className={styles.portfolioEmpty}>검색 조건에 맞는 프로젝트가 없습니다.</p>}
  </section>{selectedPortfolio && origin && <PortfolioDetail item={selectedPortfolio} origin={origin} onClose={() => setSelectedPortfolio(null)} />}</>;
}

export function TranslationSection({ rows, languages }: { rows: TranslationRow[]; languages: string[] }) {
  return <section className={styles.translationSection} aria-label="번역 서비스">
    <div className={styles.translationIntro}>
      <SectionHeader className={styles.translationHeader} eyebrow="TRANSLATION" title="번역 — 검증된 표준, 검증된 인력" description={<>게임·애니메이션·웹툰·기술 문서 등 전 분야 번역을 원어민 감수 시스템으로 제공합니다.<br />웹툰 자막(레터링) 작업도 번역 서비스 안에서 함께 처리합니다.</>} />
    </div>
    <div className={styles.translationBody}>
      <div className={styles.translationMain}>
        <div className={styles.infoGrid}>
          <article className={`${styles.infoCard} ${styles.infoCardPrimary}`}><div className={styles.cardIcon}><BadgeCheck /></div><div><span className={styles.cardOverline}>QUALITY STANDARD</span><strong>ISO 17100 인증</strong><p>번역·검수·최종 품질관리까지 국제 표준에 맞춰 운영합니다.</p></div></article>
          <article className={styles.infoCard}><div className={styles.cardIcon}><Languages /></div><div><span className={styles.cardOverline}>GLOBAL NETWORK</span><strong>30개국 언어 지원</strong><p>현지 언어와 문화에 익숙한 원어민 전문가가 참여합니다.</p></div></article>
          <article className={styles.infoCard}><div className={styles.cardIcon}><Sparkles /></div><div><span className={styles.cardOverline}>SMART WORKFLOW</span><strong>AI × Human 검수</strong><p>속도는 높이고, 표현의 자연스러움은 사람이 지킵니다.</p></div></article>
        </div>
        <div className={styles.languageBlock}><div className={styles.languageHeading}><div><span>AVAILABLE LANGUAGES</span><h3>주요 지원 언어</h3></div></div><div className={styles.languageChips}>{languages.map((language) => <span key={language}>{language}</span>)}</div></div>
      </div>
      <div className={styles.translationTable}><div className={styles.tableHead}><div><span>SERVICE SCOPE</span><strong>번역 서비스 구성</strong></div><span>전 과정 원스톱</span></div>{rows.map((row, index) => <div key={row.label} className={styles.tableRow}><span className={styles.tableIndex}>{String(index + 1).padStart(2, '0')}</span><span>{row.label}</span><span>{row.value}</span><ArrowRight size={16} /></div>)}<button type="button" className={styles.translationCta}>번역 프로젝트 문의하기 <ArrowUpRight size={18} /></button></div>
    </div>
  </section>;
}

export function GetStartedSection() {
  return <section className={styles.getStartedSection} aria-label="지금 시작하기"><SectionHeader className={styles.getStartedHeader} eyebrow="GET STARTED" title="지금 시작하세요" /><div className={styles.getStartedGrid}><ActionCard variant="gradient" title="프로젝트 의뢰하기" description={<>번역·더빙이 필요한 콘텐츠가 있으신가요?<br />담당 PM이 24시간 내 견적과 일정을 안내합니다.</>} primaryAction={{ label: '의뢰 문의 시작하기' }} secondaryLabel="빠른 문의" secondaryActions={[{ label: '네이버', href: 'https://blog.naver.com/provoiceon', tone: 'naver' }, { label: '카카오', href: 'https://pf.kakao.com/_xfNjDK', tone: 'kakao' }]} className={styles.getStartedCard} /><ActionCard title="성우·번역가로 등록하기" description={<>포트폴리오를 한 곳에 정리하고,<br />검증된 프로보이스 전문가로 새로운 프로젝트를 만나보세요.</>} primaryAction={{ label: '전문가 등록하기' }} secondaryLabel="간편 가입" secondaryActions={[{ label: '네이버', href: 'https://blog.naver.com/provoiceon', tone: 'naver' }, { label: '카카오', href: 'https://pf.kakao.com/_xfNjDK', tone: 'kakao' }]} className={styles.getStartedCard} /></div></section>;
}
