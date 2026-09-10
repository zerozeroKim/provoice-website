import { useEffect, useState, type ReactNode } from 'react';
import { ActionCard, Button, Chip, FilterDropdown, Footer, GNB, LoadMoreControl, PortfolioCard, PortfolioDetail, PortfolioFilter, SectionHeader, ServiceCard, TestimonialCard, TextField, VoiceActorCard } from '../../design-system';
import styles from './ComponentsPage.module.css';

const tabs = ['GNB', 'Footer', 'Button', 'Input', 'Chip', 'Filter Dropdown', 'Card', 'Section Header', 'Portfolio', 'Load More'];

const testimonialCards = [
  {
    quote: '멀티 언어 30개 이상 동시 진행이었는데, PM 한 명이 전 과정을 관리해줘서 커뮤니케이션 부담이 크게 줄었습니다.',
    name: '게임사 로컬라이징 팀장',
    role: '모바일 RPG 다국어 더빙',
  },
  {
    quote: '성우 검증 프로세스가 꼼꼼해서 브랜딩 톤에 맞는 목소리를 찾는 데 큰 시간을 절약할 수 있었습니다. 재작업 없이 한 번에 진행이 가능했습니다.',
    name: '광고 대행사 AE',
    role: '글로벌 브랜드 캠페인',
  },
  {
    quote: '웹툰 번역과 자막을 한 팀에서 처리해주니 발음, 톤, 리듬까지 자연스럽게 맞춰줘서 퀄리티가 매우 안정적이었습니다.',
    name: '콘텐츠 플랫폼 매니저',
    role: '웹툰 시리즈 해외 서비스',
  },
];

const portfolioTabs = ['애니메이션', '게임', '웹툰', '광고', 'OTT', '유튜브', '오디오북'];
const portfolioCards = [
  { category: '광고', title: '광고 성우 더빙 프로젝트', type: '더빙', tone: '광고', languages: ['JP', 'EN'], tags: ['광고', '나레이션'], image: 'linear-gradient(135deg, #d7d7d7 0%, #bfc2cb 25%, #8ea1b3 100%)' },
  { category: '애니메이션', title: '시리즈 메인 캐릭터 성우', type: '더빙', tone: '애니메이션', languages: ['EN'], tags: ['애니메이션', '캐릭터'], image: 'linear-gradient(135deg, #d9d9d9 0%, #b9c7d4 40%, #7ca1bf 100%)' },
  { category: '오디오북', title: '교육용 오디오 내레이션', type: '내레이션', tone: '오디오북', languages: ['KO', 'EN'], tags: ['오디오북', '교육'], image: 'linear-gradient(135deg, #e5e0d8 0%, #c5d0bc 40%, #9ac39a 100%)' },
  { category: '게임', title: '게임 콘텐츠 보이스오버', type: '보이스오버', tone: '게임', languages: ['AR'], tags: ['게임', '콘텐츠'], image: 'linear-gradient(135deg, #d8d7d5 0%, #c0b5a6 35%, #9f8375 100%)' },
  { category: '광고', title: '브랜드 캠페인 성우 더빙', type: '더빙', tone: '광고', languages: ['ES'], tags: ['광고', '브랜딩'], image: 'linear-gradient(135deg, #d6d8df 0%, #b4b8c7 44%, #7b84a6 100%)' },
  { category: '웹툰', title: '자막형 웹툰 더빙', type: '더빙', tone: '웹툰', languages: ['JP', 'EN'], tags: ['웹툰', '더빙'], image: 'linear-gradient(135deg, #d9d1d1 0%, #c7b9c7 42%, #9a8bbb 100%)' },
  { category: '오디오북', title: '오디오북 내레이션 제작', type: '내레이션', tone: '오디오북', languages: ['KO'], tags: ['오디오북', '내레이션'], image: 'linear-gradient(135deg, #d7d9d5 0%, #bfd0cb 40%, #87b2a6 100%)' },
  { category: 'OTT', title: 'OTT 드라마 보이스 하이브리드', type: 'AI 하이브리드', tone: 'OTT', languages: ['KO', 'EN'], tags: ['OTT', '드라마'], image: 'linear-gradient(135deg, #dfe1eb 0%, #c0c7da 35%, #8fa0d8 100%)' },
  { category: '유튜브', title: '유튜브 쇼츠 성우 제작', type: '내레이션', tone: '유튜브', languages: ['KO'], tags: ['유튜브', '쇼츠'], image: 'linear-gradient(135deg, #e3dfe9 0%, #c6d0e5 38%, #86a6d5 100%)' },
  { category: 'OTT', title: 'OTT 캐릭터 목소리 작업', type: '보이스오버', tone: 'OTT', languages: ['EN'], tags: ['OTT', '캐릭터'], image: 'linear-gradient(135deg, #d9e0e7 0%, #cad5dc 36%, #8da8b5 100%)' },
];

const CloseIcon = () => <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>;
const NamedSample = ({ name, children }: { name: string; children: ReactNode }) => <div className={styles.namedSample}><div className={styles.sampleName}>{name}</div><div className={styles.sampleCanvas}>{children}</div></div>;

export function ComponentsPage() {
  const getTabFromHash = () => {
    const requestedTab = decodeURIComponent(window.location.hash.split('/')[1] ?? '');
    return tabs.find((tab) => tab.toLowerCase() === requestedTab?.toLowerCase()) ?? 'GNB';
  };
  const [activeTab, setActiveTab] = useState(getTabFromHash);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewKind, setPreviewKind] = useState<'gnb' | 'footer'>('gnb');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [voiceTone, setVoiceTone] = useState('차분한');
  const [tags, setTags] = useState(['광고', '내레이션', '20대']);
  const [portfolioTab, setPortfolioTab] = useState('애니메이션');
  const [selectedPortfolio, setSelectedPortfolio] = useState<(typeof portfolioCards)[number] | null>(null);
  const [portfolioOrigin, setPortfolioOrigin] = useState<DOMRect | null>(null);
  const [loadMoreVisible, setLoadMoreVisible] = useState(6);
  const [filterLanguage, setFilterLanguage] = useState<string[]>([]);
  const [filterTones, setFilterTones] = useState<string[]>([]);

  useEffect(() => {
    if (!previewOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setPreviewOpen(false);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [previewOpen]);

  useEffect(() => {
    const syncTab = () => setActiveTab(getTabFromHash());
    window.addEventListener('hashchange', syncTab);
    return () => window.removeEventListener('hashchange', syncTab);
  }, []);
  return (
    <main className={styles.page} id="components">
      <header className={styles.header}><h1>Components</h1><p>서비스 화면에서 공통으로 사용하는 UI 구성 요소입니다.</p></header>
      <nav className={styles.tabs} aria-label="컴포넌트 목록">
        {tabs.map((tab) => <button className={activeTab === tab ? styles.active : ''} type="button" onClick={() => { setActiveTab(tab); window.location.hash = `components/${tab.toLowerCase()}`; }} key={tab}>{tab}</button>)}
      </nav>

      {activeTab === 'GNB' ? (
        <section className={styles.content}>
          <div className={styles.title}><div><h2>GNB</h2><p>전체 서비스에서 사용하는 기본 내비게이션입니다.</p></div><button className={styles.fullscreenButton} type="button" onClick={() => { setPreviewKind('gnb'); setPreviewOpen(true); }}>전체 화면 보기 <span>↗</span></button></div>

          <article className={styles.example}>
            <div className={styles.exampleHead}><strong>Desktop</strong><span>Full width · 72px</span></div>
            <div className={styles.desktopFrame}><div className={styles.gnbFrameInner}><GNB /><div className={styles.demoBody}><span className={styles.skeletonEyebrow} /><strong><i /><i /></strong><div className={styles.skeletonCopy}><i /><i /></div></div></div></div>
          </article>

          <article className={styles.example}>
            <div className={styles.exampleHead}><strong>Mobile</strong><span>Menu closed / opened · 64px</span></div>
            <div className={styles.mobileExamples}>
              <div className={styles.phone}><GNB mobile /><div className={styles.placeholder}><i /><i /><i /></div></div>
              <div className={styles.phone}><GNB mobile defaultOpen /><div className={styles.placeholder}><i /><i /><i /></div></div>
            </div>
          </article>
        </section>
      ) : activeTab === 'Footer' ? (
        <section className={styles.content}>
          <div className={styles.title}><div><h2>Footer</h2><p>회사 정보와 정책, 소셜 채널을 제공하는 공통 푸터입니다.</p></div><button className={styles.fullscreenButton} type="button" onClick={() => { setPreviewKind('footer'); setPreviewOpen(true); }}>전체 화면 보기 <span>↗</span></button></div>
          <article className={styles.example}>
            <div className={styles.exampleHead}><strong>Responsive</strong><span>Desktop / Mobile</span></div>
            <div className={styles.footerFrame}><Footer /></div>
          </article>
        </section>
      ) : activeTab === 'Button' ? (
        <section className={styles.content}>
          <div className={styles.title}><div><h2>Button</h2><p>행동의 중요도와 사용 환경에 따라 크기와 스타일을 선택합니다.</p></div></div>
          <div className={styles.buttonDocs}>
            <article><div className={styles.exampleHead}><strong>Variants</strong><span>Medium · Default</span></div><div className={styles.buttonRow}><NamedSample name="Button / Primary / Medium"><Button>Primary</Button></NamedSample><NamedSample name="Button / Secondary / Medium"><Button variant="secondary">Secondary</Button></NamedSample><NamedSample name="Button / Tertiary / Medium"><Button variant="tertiary">Tertiary</Button></NamedSample><NamedSample name="Button / Ghost / Medium"><Button variant="ghost">Ghost</Button></NamedSample><NamedSample name="Button / Danger / Medium"><Button variant="danger">Danger</Button></NamedSample></div></article>
            <article><div className={styles.exampleHead}><strong>Sizes</strong><span>Compact / Small / Medium / Large</span></div><div className={styles.buttonRow}><NamedSample name="Button / Primary / Compact"><Button size="compact">Compact</Button></NamedSample><NamedSample name="Button / Primary / Small"><Button size="sm">Small</Button></NamedSample><NamedSample name="Button / Primary / Medium"><Button size="md">Medium</Button></NamedSample><NamedSample name="Button / Primary / Large"><Button size="lg">Large</Button></NamedSample></div></article>
            <article><div className={styles.exampleHead}><strong>With icon</strong><span>Leading / Trailing</span></div><div className={styles.buttonRow}><NamedSample name="Button / Secondary / Leading icon"><Button variant="secondary" leadingIcon={<span>＋</span>}>성우 추가</Button></NamedSample><NamedSample name="Button / Primary / Trailing icon"><Button trailingIcon={<span>↗</span>}>의뢰문의</Button></NamedSample><NamedSample name="Button / Ghost / Trailing icon"><Button variant="ghost" trailingIcon={<span>→</span>}>자세히 보기</Button></NamedSample></div></article>
            <article><div className={styles.exampleHead}><strong>States</strong><span>Disabled / Loading / Full width</span></div><div className={styles.buttonRow}><NamedSample name="Button / Primary / Disabled"><Button disabled>Disabled</Button></NamedSample><NamedSample name="Button / Primary / Loading"><Button loading>처리 중</Button></NamedSample><NamedSample name="Button / Primary / Full width"><div className={styles.fullButton}><Button fullWidth>계속하기</Button></div></NamedSample></div></article>
          </div>
        </section>
      ) : activeTab === 'Input' ? (
        <section className={styles.content}>
          <div className={styles.title}><div><h2>Text Field</h2><p>Label을 Surface 안에 유지하는 단일 행 입력 컴포넌트입니다.</p></div></div>
          <div className={styles.inputDocs}>
            <article><div className={styles.exampleHead}><strong>Default</strong><span>Large · 64px</span></div><NamedSample name="TextField / Inset / Large / Required"><TextField label="이름" placeholder="이름을 입력해주세요" helperText="입력한 이름은 프로필에 표시됩니다." required /></NamedSample></article>
            <article><div className={styles.exampleHead}><strong>Filled</strong><span>Value</span></div><NamedSample name="TextField / Inset / Large / Filled"><TextField label="이메일" type="email" defaultValue="provoice@example.com" /></NamedSample></article>
            <article><div className={styles.exampleHead}><strong>Optional</strong><span>Large · 64px</span></div><NamedSample name="TextField / Inset / Large / Optional"><TextField label="회사명" placeholder="회사명을 입력해주세요" optional /></NamedSample></article>
            <article><div className={styles.exampleHead}><strong>With action</strong><span>Trailing</span></div><NamedSample name="TextField / Inset / Large / Trailing action"><TextField label="성우 검색" defaultValue="김프로" trailingElement={<button type="button" aria-label="검색어 지우기"><CloseIcon /></button>} /></NamedSample></article>
            <article><div className={styles.exampleHead}><strong>Without label</strong><span>Large · 56px</span></div><NamedSample name="TextField / Label-less / Large"><TextField label="검색어" hideLabel placeholder="검색어를 입력해주세요" /></NamedSample></article>
            <article><div className={styles.exampleHead}><strong>Without label + action</strong><span>Medium · 48px</span></div><NamedSample name="TextField / Label-less / Medium / Trailing action"><TextField label="성우 검색" hideLabel fieldSize="md" defaultValue="김프로" trailingElement={<button type="button" aria-label="검색어 지우기"><CloseIcon /></button>} /></NamedSample></article>
            <article><div className={styles.exampleHead}><strong>Error</strong><span>Validation</span></div><NamedSample name="TextField / Inset / Large / Error"><TextField label="이메일" defaultValue="hello@" error="올바른 이메일 주소를 입력해주세요." required /></NamedSample></article>
            <article><div className={styles.exampleHead}><strong>Disabled / Read only</strong><span>States</span></div><div className={styles.inputStack}><NamedSample name="TextField / Inset / Large / Disabled"><TextField label="연락처" defaultValue="010-6294-4825" disabled /></NamedSample><NamedSample name="TextField / Inset / Large / Read only"><TextField label="사업자등록번호" defaultValue="649-88-02999" readOnly /></NamedSample></div></article>
          </div>
        </section>
      ) : activeTab === 'Chip' ? (
        <section className={styles.content}>
          <div className={styles.title}><div><h2>Chip</h2><p>선택, 필터, 입력값, 상태를 짧고 명확하게 표현합니다.</p></div></div>
          <div className={styles.chipDocs}>
            <article><div className={styles.exampleHead}><strong>Choice</strong><span>Single selection</span></div><div className={styles.chipRow}>{['밝은', '차분한', '신뢰감 있는', '에너지 있는'].map((tone) => <NamedSample name={`Chip / Choice / Medium / ${voiceTone === tone ? 'Selected' : 'Default'}`} key={tone}><Chip selected={voiceTone === tone} onClick={() => setVoiceTone(tone)}>{tone}</Chip></NamedSample>)}</div></article>
            <article><div className={styles.exampleHead}><strong>Filter</strong><span>Opens options</span></div><div className={styles.chipRow}><NamedSample name="Chip / Filter / Medium / Count"><Chip variant="filter" count={12}>성별</Chip></NamedSample><NamedSample name="Chip / Filter / Medium / Default"><Chip variant="filter">연령대</Chip></NamedSample><NamedSample name="Chip / Filter / Medium / Selected"><Chip variant="filter" selected count={3}>보이스톤</Chip></NamedSample></div></article>
            <article><div className={styles.exampleHead}><strong>Input</strong><span>Removable values</span></div><div className={styles.chipRow}>{tags.map((tag) => <NamedSample name="Chip / Input / Medium / Removable" key={tag}><Chip variant="input" onRemove={() => setTags((items) => items.filter((item) => item !== tag))}>{tag}</Chip></NamedSample>)}{tags.length === 0 && <span className={styles.emptyText}>선택된 항목이 없습니다.</span>}</div></article>
            <article><div className={styles.exampleHead}><strong>Status</strong><span>Non-interactive</span></div><div className={styles.chipRow}><NamedSample name="Chip / Status / Purple"><Chip variant="status" tone="purple">신규</Chip></NamedSample><NamedSample name="Chip / Status / Success"><Chip variant="status" tone="success">활성</Chip></NamedSample><NamedSample name="Chip / Status / Warning"><Chip variant="status" tone="warning">검토 중</Chip></NamedSample><NamedSample name="Chip / Status / Danger"><Chip variant="status" tone="danger">마감</Chip></NamedSample></div></article>
            <article><div className={styles.exampleHead}><strong>Assist / Sizes</strong><span>Action · Small / Medium</span></div><div className={styles.chipRow}><NamedSample name="Chip / Assist / Small"><Chip variant="assist" size="sm" leadingIcon={<span>＋</span>}>필터 추가</Chip></NamedSample><NamedSample name="Chip / Assist / Medium"><Chip variant="assist" leadingIcon={<span>✦</span>}>AI 추천</Chip></NamedSample><NamedSample name="Chip / Choice / Medium / Disabled"><Chip disabled>비활성</Chip></NamedSample></div></article>
          </div>
        </section>
      ) : activeTab === 'Filter Dropdown' ? (
        <section className={styles.content}>
          <div className={styles.title}><div><h2>Filter Dropdown</h2><p>네이티브 select로 표현하기 어려운 칩 스타일 옵션 패널이 필요할 때 쓰는 단일/다중 선택 드롭다운입니다. 성우 검색·포트폴리오 필터에서 사용합니다.</p></div></div>
          <div className={styles.buttonRow}>
            <NamedSample name="FilterDropdown / Single select">
              <FilterDropdown label="언어" options={['한국어', '영어', '일본어']} selected={filterLanguage} onSelect={(option) => setFilterLanguage((current) => current.includes(option) ? [] : [option])} />
            </NamedSample>
            <NamedSample name="FilterDropdown / Multi select">
              <FilterDropdown label="톤" options={['밝은', '차분한', '진중한', '귀여운']} selected={filterTones} multiple onSelect={(option) => setFilterTones((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option])} />
            </NamedSample>
          </div>
        </section>
      ) : activeTab === 'Card' ? (
        <section className={styles.content}>
          <div className={styles.title}><div><h2>Card</h2><p>관련 정보와 주요 행동을 하나의 맥락으로 묶는 카드 컴포넌트입니다.</p></div></div>
          <article className={styles.example}>
            <div className={styles.exampleHead}><strong>고객 증언 카드</strong><span>Testimonial · Pixel interaction</span></div>
            <div className={styles.testimonialGrid}>
              {testimonialCards.map((testimonial) => (
                <TestimonialCard key={testimonial.name} {...testimonial} />
              ))}
            </div>
          </article>
          <article className={styles.example}>
            <div className={styles.exampleHead}><strong>성우 카드</strong><span>Voice actor · Default / Best / Locked</span></div>
            <div className={styles.voiceActorCardGrid}>
              <VoiceActorCard name="김지훈" nickname="KO / EN" verified tags={['내레이션', '광고']} duration={32} currentTime={9} />
              <VoiceActorCard name="Mika S." nickname="JP / EN" verified best tags={['캐릭터', '게임', 'NPC']} duration={28} currentTime={12} />
              <VoiceActorCard name="Ahmed L." nickname="AR / EN" verified tags={['내레이션', '다큐']} duration={35} locked />
            </div>
          </article>
          <article className={styles.example}>
            <div className={styles.exampleHead}><strong>Action cards</strong><span>Gradient / Light · Responsive</span></div>
            <div className={styles.actionCardGrid}>
              <ActionCard
                variant="gradient"
                title="프로젝트 의뢰하기"
                description="번역·더빙이 필요한 콘텐츠가 있으신가요? 담당 PM이 24시간 내 견적과 일정을 안내합니다."
                primaryAction={{ label: '의뢰 문의 시작하기' }}
                secondaryLabel="다른 채널로 문의"
                secondaryActions={[
                  { label: '네이버로 문의', href: 'https://blog.naver.com/provoiceon', tone: 'naver' },
                  { label: '카카오로 문의', href: 'https://pf.kakao.com/_xfNjDK', tone: 'kakao' },
                ]}
              />
              <ActionCard
                title="성우·번역가로 등록하기"
                description="포트폴리오를 한 곳에 정리하고, 검증된 프로보이스 등록 전문가로 프로젝트 섭외를 받아보세요."
                primaryAction={{ label: '전문가 등록하기' }}
                secondaryLabel="소셜 계정으로 가입"
                secondaryActions={[
                  { label: '네이버로 가입', href: 'https://blog.naver.com/provoiceon', tone: 'naver' },
                  { label: '카카오로 가입', href: 'https://pf.kakao.com/_xfNjDK', tone: 'kakao' },
                ]}
              />
            </div>
          </article>
          <article className={styles.example}>
            <div className={styles.exampleHead}><strong>서비스 섹션 카드</strong><span>Service · Optional badge</span></div>
            <div className={styles.serviceCardGrid}>
              <ServiceCard imageSrc="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=82" imageAlt="녹음실 마이크" title="애니메이션·게임·웹툰 더빙" description="캐릭터 맞춤형 성우 캐스팅부터 게임 내 행동과 감정선까지 살려 자연스러운 더빙을 제공합니다." />
              <ServiceCard imageSrc="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=82" imageAlt="콘텐츠를 제작하는 팀" title="기업 홍보·유튜브 콘텐츠" description="브랜드를 위한 원어민 내레이션과 다국어 마케팅 영상 제작까지 한 번에 지원합니다." />
              <ServiceCard imageSrc="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=82" imageAlt="번역과 현지화 자료" title="번역 (ISO 17100)" description="게이머부터 일반 사용자까지 자연스럽게 이해할 수 있는 번역과 현지화 품질을 보장합니다." />
              <ServiceCard imageSrc="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=82" imageAlt="AI 기술 이미지" title="AI × Human 하이브리드 더빙" description="중요한 장면은 사람의 감성을 살린 더빙으로 마무리합니다." badge="부가 옵션" link="PROVOICE × AI 자세히 보기 →" />
            </div>
          </article>
        </section>
      ) : activeTab === 'Section Header' ? (
        <section className={styles.content}>
          <div className={styles.title}><div><h2>Section Header</h2><p>페이지의 주요 콘텐츠 섹션을 일관된 위계로 소개합니다.</p></div></div>
          <div className={styles.sectionHeaderDocs}>
            <article className={styles.sectionHeaderSample}><SectionHeader eyebrow="SERVICE" title="하나의 팀, 원스톱 로컬라이징" description="캐스팅부터 번역, 사운드까지 — 콘텐츠 하나를 세계 여러 시장에 내보낼 수 있도록 설계된 서비스를 제공합니다." /></article>
            <article className={styles.sectionHeaderSample}><SectionHeader eyebrow="CLIENT VOICES" title={<>고객사가 말하는 <span className={styles.gradientText}>프로보이스</span></>} /></article>
          </div>
        </section>
      ) : activeTab === 'Portfolio' ? (
        <section className={styles.content}>
          <div className={styles.title}><div><h2>Portfolio</h2><p>프로젝트 성과를 압축해 보여주는 간결한 포트폴리오 카드입니다.</p></div></div>
          <div className={styles.portfolioSection}>
            <PortfolioFilter items={portfolioTabs} value={portfolioTab} onChange={setPortfolioTab} />

            <div className={styles.portfolioGrid}>
              {portfolioCards
                .filter((card) => card.category === portfolioTab)
                .map((card) => (
                  <PortfolioCard key={`${card.title}-${card.languages.join('-')}`} title={card.title} languages={card.languages} category={card.tone} tags={[card.type, ...card.tags]} image={card.image} onOpen={(origin) => { setPortfolioOrigin(origin); setSelectedPortfolio(card); }} />
                ))}
            </div>
          </div>
        </section>
      ) : activeTab === 'Load More' ? (
        <section className={styles.content}>
          <div className={styles.title}><div><h2>Load More</h2><p>목록을 한 번에 노출하지 않고 점진적으로 확장할 때 사용하는 컨트롤입니다.</p></div></div>
          <div className={styles.buttonDocs}>
            <article>
              <div className={styles.exampleHead}><strong>Default</strong><span>더 보기 클릭 시 6개씩 증가</span></div>
              <div className={styles.buttonRow}>
                <NamedSample name="LoadMoreControl / Default"><LoadMoreControl visible={Math.min(loadMoreVisible, 20)} total={20} hasMore={loadMoreVisible < 20} onLoadMore={() => setLoadMoreVisible((count) => Math.min(count + 6, 20))} /></NamedSample>
              </div>
            </article>
            <article>
              <div className={styles.exampleHead}><strong>Exhausted</strong><span>더 보기 버튼 없이 결과 수 + 전체 보기만 노출</span></div>
              <div className={styles.buttonRow}>
                <NamedSample name="LoadMoreControl / No more items"><LoadMoreControl visible={20} total={20} hasMore={false} /></NamedSample>
              </div>
            </article>
            <article>
              <div className={styles.exampleHead}><strong>Without view-all</strong><span>전용 포트폴리오 페이지 등 자기 자신을 가리킬 필요가 없을 때</span></div>
              <div className={styles.buttonRow}>
                <NamedSample name="LoadMoreControl / showViewAll=false"><LoadMoreControl visible={12} total={20} hasMore showViewAll={false} onLoadMore={() => {}} /></NamedSample>
              </div>
            </article>
          </div>
        </section>
      ) : (
        <section className={styles.empty}><strong>{activeTab}</strong><p>다음 컴포넌트를 이 탭에 추가할 수 있습니다.</p></section>
      )}
      {previewOpen && (
        <div className={styles.previewOverlay} role="dialog" aria-modal="true" aria-label="GNB 반응형 전체 화면 미리보기">
          <div className={styles.previewToolbar}>
            <strong>{previewKind === 'gnb' ? 'GNB' : 'Footer'} Preview</strong>
            <div className={styles.deviceSwitch}><button className={device === 'desktop' ? styles.selected : ''} type="button" onClick={() => setDevice('desktop')}>Desktop</button><button className={device === 'mobile' ? styles.selected : ''} type="button" onClick={() => setDevice('mobile')}>Mobile</button></div>
            <button className={styles.closeButton} type="button" aria-label="전체 화면 미리보기 닫기" onClick={() => setPreviewOpen(false)}>닫기</button>
          </div>
          <div className={`${styles.previewCanvas} ${device === 'mobile' ? styles.mobileCanvas : ''}`}>
            <div className={styles.previewViewport}>
              {previewKind === 'gnb' ? <><GNB mobile={device === 'mobile'} /><div className={styles.previewHero}><span /><h2><i /><i /></h2><p><i /><i /></p></div></> : <div className={styles.footerPreviewPage}><div className={styles.footerPreviewBody}><i /><i /><i /></div><Footer /></div>}
            </div>
          </div>
        </div>
      )}
      {selectedPortfolio && portfolioOrigin && (
        <PortfolioDetail
          item={{ category: selectedPortfolio.category, title: selectedPortfolio.title, languages: selectedPortfolio.languages, tone: selectedPortfolio.tone, tags: [selectedPortfolio.type, ...selectedPortfolio.tags], image: selectedPortfolio.image }}
          origin={portfolioOrigin}
          onClose={() => setSelectedPortfolio(null)}
        />
      )}
    </main>
  );
}
