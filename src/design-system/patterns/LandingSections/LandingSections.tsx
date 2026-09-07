import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, BadgeCheck, Languages, Search, Sparkles, Users, X } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import MagicRings from '@/components/reactbits/MagicRings';
import { useIsMobile } from '@/hooks/use-mobile';
import { ActionCard, Button, Chip, Modal, PortfolioCard, PortfolioFilter, SectionHeader, ServiceCard, TextField, VoiceActorCard } from '../../components';
import styles from './LandingSections.module.css';

export type HeroStat = { value: string; label: string };
export type TalentProfile = { name: string; locale: string; tags: string[]; duration: number; verified: boolean };
export type ServiceItem = { icon?: ReactNode; imageSrc?: string; imageAlt?: string; title: string; description: string; badge?: string; link?: string };
export type PortfolioItem<T extends string = string> = { category: T; title: string; languages: string[]; tone: string; tags: string[]; highlight?: string; image?: string };
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

const recognizedConditions = ['일본어', '20대', '여성', '캐릭터 보이스'];

export function TalentDirectorySection({ talents }: { talents: TalentProfile[] }) {
  const [query, setQuery] = useState('일본어 하는 20대 여성 캐릭터 보이스');
  const [hasSearched, setHasSearched] = useState(false);
  const [showAllTalents, setShowAllTalents] = useState(false);
  const carouselTalents = useMemo(() => [...talents].sort(() => Math.random() - 0.5), [talents]);
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
      <SectionHeader className={styles.talentHeader} eyebrow="VOICE TALENT DIRECTORY" title="성우 검색 — 문장으로 편하게 찾아보세요" description={<>“일본어 하는 20대 여성 캐릭터 보이스”처럼 원하는 조건을 문장으로 입력하면 자동으로 매칭해드립니다.</>} />
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

export function ServiceSection({ services }: { services: ServiceItem[] }) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  return <><section className={styles.serviceSection} aria-label="서비스 소개"><div className={styles.serviceInner}><SectionHeader className={styles.serviceHeader} eyebrow="SERVICE" title="하나의 팀, 원스톱 로컬라이징" description="캐스팅부터 번역, 사운드까지 — 콘텐츠 하나를 세계 여러 시장에 내보낼 수 있도록 설계된 서비스를 제공합니다." /><div className={styles.serviceGrid}>{services.map((service) => <ServiceCard key={service.title} {...service} onOpen={() => setSelectedService(service)} />)}</div></div></section><Modal open={Boolean(selectedService)} title={selectedService?.title ?? '서비스 안내'} onClose={() => setSelectedService(null)}>{selectedService && <div className={styles.serviceModalBody}>{selectedService.imageSrc && <img src={selectedService.imageSrc} alt={selectedService.imageAlt ?? ''} />}<p>{selectedService.description}</p><Button fullWidth onClick={() => setSelectedService(null)}>프로젝트 문의하기</Button></div>}</Modal></>;
}

export function PortfolioSection<T extends string>({ tabs, cards }: { tabs: readonly T[]; cards: PortfolioItem<Exclude<T, '전체'>>[] }) {
  const [active, setActive] = useState<T>(tabs[0]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem<Exclude<T, '전체'>> | null>(null);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const filtered = active === '전체' ? cards : cards.filter((card) => card.category === active);
  const openPortfolio = (card: PortfolioItem<Exclude<T, '전체'>>, cardOrigin: DOMRect) => {
    setOrigin(cardOrigin);
    setSelectedPortfolio(card);
  };
  return <><section className={`${styles.portfolioSection} ${selectedPortfolio ? styles.portfolioIsOpen : ''}`} aria-label="포트폴리오"><SectionHeader className={styles.portfolioHeader} eyebrow="PORTFOLIO" title="장르별 · 언어별로 보는 포트폴리오" description="게임, 애니메이션, 웹툰, 광고 등 다양한 프로젝트를 여러 언어의 목소리와 스타일로 한 번에 확인할 수 있습니다." /><PortfolioFilter items={tabs} value={active} onChange={setActive} className={styles.portfolioFilter} /><div className={styles.portfolioGrid}>{filtered.map((card) => <PortfolioCard key={`${card.title}-${card.tone}`} className={styles.portfolioGridCard} title={card.title} languages={card.languages} category={card.tone} tags={card.tags} highlight={card.highlight} image={card.image} onOpen={(cardOrigin) => openPortfolio(card, cardOrigin)} />)}</div></section>{selectedPortfolio && origin && <PortfolioDetail item={selectedPortfolio} origin={origin} onClose={() => setSelectedPortfolio(null)} />}</>;
}

function PortfolioDetail({ item, origin, onClose }: { item: PortfolioItem; origin: DOMRect; onClose: () => void }) {
  const panelRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const motionFrames = () => {
    const panel = panelRef.current;
    if (!panel) return null;
    const target = panel.getBoundingClientRect();
    return [
      { transform: `translate(${origin.left - target.left}px, ${origin.top - target.top}px) scale(${origin.width / target.width}, ${origin.height / target.height})`, borderRadius: '1.25rem' },
      { transform: 'translate(0, 0) scale(1)', borderRadius: '1.5rem' },
    ];
  };

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!panel || !image || !content) return;
    document.body.style.overflow = 'hidden';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      const frames = motionFrames();
      if (frames) panel.animate(frames, { duration: 380, easing: 'cubic-bezier(.22,.9,.28,1)', fill: 'both' });
      image.animate([{ transform: 'scale(1.035)' }, { transform: 'scale(1)' }], { duration: 440, easing: 'cubic-bezier(.22,.9,.28,1)', fill: 'both' });
      content.animate([{ opacity: 0, transform: 'translateY(-28px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 280, delay: 90, easing: 'cubic-bezier(.22,.9,.28,1)', fill: 'both' });
    }
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && close();
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const close = async () => {
    if (closingRef.current) return;
    closingRef.current = true;
    const panel = panelRef.current;
    const content = contentRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (panel && content && !reduceMotion) {
      content.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-24px)' }], { duration: 110, easing: 'ease-in', fill: 'both' });
      const frames = motionFrames();
      if (frames) await panel.animate(frames.reverse(), { duration: 300, delay: 40, easing: 'cubic-bezier(.7,0,.78,.1)', fill: 'both' }).finished;
    }
    onClose();
  };

  return <div className={styles.portfolioDetailBackdrop} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
    <section ref={panelRef} className={styles.portfolioDetail} role="dialog" aria-modal="true" aria-labelledby="portfolio-detail-title">
      <button type="button" className={styles.portfolioDetailClose} aria-label="포트폴리오 상세 닫기" onClick={close}><X size={20} /></button>
      <div ref={imageRef} className={styles.portfolioDetailImage} style={{ background: item.image }} role="img" aria-label={`${item.title} 프로젝트 이미지`}>
        <div className={styles.portfolioDetailBadges}>{item.languages.map((language) => <span key={language}>{language}</span>)}<span>{item.tone}</span></div>
      </div>
      <div ref={contentRef} className={styles.portfolioDetailContent}>
        <div><span className={styles.portfolioDetailKicker}>CASE STUDY · {item.category}</span><h2 id="portfolio-detail-title">{item.title}</h2></div>
        <div className={styles.portfolioDetailMeta}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}{item.highlight && <span>{item.highlight}</span>}</div>
        <p>프로젝트 목표와 콘텐츠의 감정선에 맞춰 캐스팅부터 번역, 녹음과 사운드 후반 작업까지 하나의 팀으로 완성한 다국어 제작 사례입니다.</p>
        <button type="button" className={styles.portfolioDetailCta}>이런 프로젝트 의뢰하기 <ArrowUpRight size={18} /></button>
      </div>
    </section>
  </div>;
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
