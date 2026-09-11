import type { HeroStat, PortfolioItem, ServiceItem, TalentProfile, TranslationRow } from './types';
import type { TestimonialCardProps } from '../../components';

export const portfolioTabs = ['전체', '게임', '애니메이션', '웹툰', '광고', '기업'] as const;
type PortfolioCategory = Exclude<(typeof portfolioTabs)[number], '전체'>;

const curatedPortfolioCards: PortfolioItem<PortfolioCategory>[] = [
  { category: '게임', title: 'MMORPG 글로벌 더빙 프로젝트', languages: ['JP', 'EN'], tone: 'GAME', tags: ['더빙', '번역'], client: '레드문게임즈', image: 'linear-gradient(rgb(12 10 25 / .18), rgb(12 10 25 / .38)), url("https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=82") center / cover' },
  { category: '애니메이션', title: '극장판 애니메이션 다국어 더빙', languages: ['EN'], tone: 'ANIMATION', tags: ['더빙', 'AI 하이브리드'], highlight: 'AI 하이브리드', client: '블룸애니메이션', image: 'linear-gradient(rgb(12 10 25 / .16), rgb(12 10 25 / .34)), url("https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=82") center / cover' },
  { category: '웹툰', title: '인기 웹툰 시리즈 번역·자막', languages: ['ZH', 'EN'], tone: '웹툰', tags: ['번역', '자막'], client: '코믹플로우', image: 'linear-gradient(rgb(12 10 25 / .12), rgb(12 10 25 / .3)), url("https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=82") center / cover' },
  { category: '기업', title: '글로벌 브랜딩 홍보영상 내레이션', languages: ['ES'], tone: 'CORPORATE', tags: ['더빙', '자막'], client: '글로벌브릿지', image: 'linear-gradient(rgb(12 10 25 / .15), rgb(12 10 25 / .34)), url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=82") center / cover' },
  { category: '게임', title: '모바일 게임 NPC 다국어 대사', languages: ['AR'], tone: 'GAME', tags: ['더빙', '번역'], client: '노바인터랙티브', image: 'linear-gradient(rgb(12 10 25 / .18), rgb(12 10 25 / .42)), url("https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=82") center / cover' },
  { category: '애니메이션', title: 'IP 캐릭터 서버보이스 하이브리드 제작', languages: ['KO', 'EN'], tone: 'ANIMATION', tags: ['더빙', 'AI 하이브리드'], highlight: 'AI 하이브리드', client: '스타라이트픽처스', image: 'linear-gradient(rgb(12 10 25 / .12), rgb(12 10 25 / .34)), url("https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=82") center / cover' },
  { category: '광고', title: '브랜드 TV 광고 오디오 제작', languages: ['JP'], tone: '광고', tags: ['광고', '나레이션'], client: '브라이트애드컴퍼니', image: 'linear-gradient(rgb(12 10 25 / .16), rgb(12 10 25 / .38)), url("https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1200&q=82") center / cover' },
  { category: '웹툰', title: '신작 웹툰 더빙 프로젝트', languages: ['KO', 'EN'], tone: '웹툰', tags: ['더빙', '자막'], client: '인디고웹툰', image: 'linear-gradient(rgb(12 10 25 / .12), rgb(12 10 25 / .3)), url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=82") center / cover' },
  { category: '게임', title: '오픈월드 RPG 캐릭터 보이스 제작', languages: ['EN', 'FR'], tone: 'GAME', tags: ['더빙', '캐릭터'], client: '스카이하이게임즈', image: 'linear-gradient(rgb(12 10 25 / .18), rgb(12 10 25 / .4)), url("https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=1200&q=82") center / cover' },
  { category: '애니메이션', title: 'TV 애니메이션 시즌2 다국어 더빙', languages: ['JP', 'KO', 'EN'], tone: 'ANIMATION', tags: ['더빙', '번역'], client: '문라이트스튜디오', image: 'linear-gradient(rgb(12 10 25 / .16), rgb(12 10 25 / .36)), url("https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=82") center / cover' },
  { category: '광고', title: '글로벌 스포츠 브랜드 캠페인', languages: ['DE', 'EN'], tone: '광고', tags: ['광고', '내레이션'], client: '프레임미디어', image: 'linear-gradient(rgb(12 10 25 / .14), rgb(12 10 25 / .34)), url("https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=82") center / cover' },
  { category: '기업', title: '기업 채용 브랜딩 영상 내레이션', languages: ['KO'], tone: 'CORPORATE', tags: ['내레이션', '자막'], client: '넥스트웨이브코퍼레이션', image: 'linear-gradient(rgb(12 10 25 / .15), rgb(12 10 25 / .35)), url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=82") center / cover' },
  { category: '웹툰', title: '로맨스 웹툰 오디오드라마화', languages: ['KO', 'TH'], tone: '웹툰', tags: ['더빙', '오디오드라마'], client: '스토리캔버스', image: 'linear-gradient(rgb(12 10 25 / .12), rgb(12 10 25 / .32)), url("https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=82") center / cover' },
];

const portfolioImagePool = [
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=82',
];

const portfolioCategoryTone: Record<PortfolioCategory, string> = { 게임: 'GAME', 애니메이션: 'ANIMATION', 웹툰: '웹툰', 광고: '광고', 기업: 'CORPORATE' };
const portfolioCategoryTags: Record<PortfolioCategory, string[]> = {
  게임: ['더빙', '번역', '캐릭터'],
  애니메이션: ['더빙', '번역', 'AI 하이브리드'],
  웹툰: ['번역', '자막', '더빙'],
  광고: ['광고', '나레이션'],
  기업: ['내레이션', '자막', '더빙'],
};
const portfolioLanguagePool = ['KO', 'EN', 'JP', 'ZH', 'ES', 'AR', 'FR', 'DE', 'RU', 'PT', 'IT', 'TR', 'VI', 'ID', 'TH'];
const portfolioClientPool: Record<PortfolioCategory, string[]> = {
  게임: ['레드문게임즈', '스카이하이게임즈', '노바인터랙티브', '픽셀포지스튜디오'],
  애니메이션: ['블룸애니메이션', '스타라이트픽처스', '문라이트스튜디오', '드림프레임'],
  웹툰: ['코믹플로우', '인디고웹툰', '스토리캔버스', '판타지웹툰컴퍼니'],
  광고: ['브라이트애드컴퍼니', '프레임미디어', '오르빗캠페인', '클릭웨이브애드'],
  기업: ['글로벌브릿지', '넥스트웨이브코퍼레이션', '유니콘파트너스', '브릿지앤코'],
};

/** 갤러리를 가득 채우기 위한 가라 데이터 — 카테고리마다 목표 개수까지 채웁니다. */
function fillPortfolioCategory(category: PortfolioCategory, existingCount: number, target: number): PortfolioItem<PortfolioCategory>[] {
  return Array.from({ length: Math.max(0, target - existingCount) }, (_, index) => {
    const seed = existingCount + index + category.charCodeAt(0);
    const image = portfolioImagePool[seed % portfolioImagePool.length];
    const languageA = portfolioLanguagePool[seed % portfolioLanguagePool.length];
    const languageB = portfolioLanguagePool[(seed + 5) % portfolioLanguagePool.length];
    const clientPool = portfolioClientPool[category];
    return {
      category,
      title: `${category} 프로젝트 ${String(existingCount + index + 1).padStart(2, '0')}`,
      languages: languageA === languageB ? [languageA] : [languageA, languageB],
      tone: portfolioCategoryTone[category],
      tags: portfolioCategoryTags[category],
      client: clientPool[seed % clientPool.length],
      image: `linear-gradient(rgb(12 10 25 / .16), rgb(12 10 25 / .36)), url("${image}") center / cover`,
    };
  });
}

const portfolioCategories = portfolioTabs.filter((tab): tab is PortfolioCategory => tab !== '전체');

export const portfolioCards: PortfolioItem<PortfolioCategory>[] = portfolioCategories.flatMap((category) => {
  const existing = curatedPortfolioCards.filter((card) => card.category === category);
  return [...existing, ...fillPortfolioCategory(category, existing.length, 10)];
});

export const reviewCards: TestimonialCardProps[] = [
  { quote: '멀티 언어 30개 이상 동시 진행이었는데, PM 한 명이 전 과정을 관리해줘서 커뮤니케이션 부담이 크게 줄었습니다.', name: '게임사 로컬라이징 팀장', role: '모바일 RPG 다국어 더빙' },
  { quote: '성우 검증 프로세스가 꼼꼼해서 브랜딩 톤에 맞는 목소리를 찾는 데 큰 시간을 절약할 수 있었습니다. 재작업 없이 한 번에 진행이 가능했습니다.', name: '광고 대행사 AE', role: '글로벌 브랜드 캠페인' },
  { quote: '웹툰 번역과 자막을 한 팀에서 처리해주니 발음, 톤, 리듬까지 자연스럽게 맞춰줘서 퀄리티가 매우 안정적이었습니다.', name: '콘텐츠 플랫폼 매니저', role: '웹툰 시리즈 해외 서비스' },
];

const curatedTalentProfiles: Omit<TalentProfile, 'avatarSrc'>[] = [
  { name: '김지훈', locale: 'KO / EN', tags: ['내레이션', '광고'], duration: 32, verified: true, gender: '남성', tones: ['자신감', '친근한'], favorites: 482, completedProjects: 61 },
  { name: 'Mika S.', locale: 'JP / EN', tags: ['캐릭터', '게임', 'NPC'], duration: 28, verified: true, gender: '여성', tones: ['귀여운', '재밌는'], favorites: 513, completedProjects: 45 },
  { name: '박다경', locale: 'KO', tags: ['키즈', '더빙', '연기'], duration: 41, verified: true, gender: '여성', tones: ['귀여운', '친근한'], favorites: 391, completedProjects: 72 },
  { name: 'Ahmed L.', locale: 'AR / EN', tags: ['내레이션', '다큐'], duration: 35, verified: true, gender: '남성', tones: ['진중한', '차분한'], favorites: 276, completedProjects: 38 },
  { name: 'Aoi K.', locale: 'JP', tags: ['캐릭터', '애니메이션'], duration: 36, verified: true, gender: '여성', tones: ['밝은', '재밌는'], favorites: 341, completedProjects: 50 },
  { name: 'Yuna M.', locale: 'JP / EN', tags: ['캐릭터', '게임'], duration: 31, verified: true, gender: '여성', tones: ['자신감', '차분한'], favorites: 299, completedProjects: 42 },
  { name: 'Rin T.', locale: 'JP', tags: ['캐릭터', '키즈', '더빙'], duration: 39, verified: true, gender: '여성', tones: ['귀여운', '밝은'], favorites: 261, completedProjects: 35 },
  { name: 'Hana N.', locale: 'JP / KO', tags: ['캐릭터', '연기'], duration: 34, verified: true, gender: '여성', tones: ['감성적인&따뜻한', '차분한'], favorites: 411, completedProjects: 58 },
  { name: 'Saki O.', locale: 'JP', tags: ['캐릭터', '게임', 'NPC'], duration: 29, verified: true, gender: '여성', tones: ['진중한', '드라마틱'], favorites: 356, completedProjects: 47 },
];

const talentLocalePool = ['KO', 'EN', 'JP', 'ZH', 'ES', 'AR', 'FR', 'DE', 'RU', 'PT', 'IT', 'TR', 'VI', 'ID', 'TH'];
const talentTagPool = ['내레이션', '광고', '캐릭터', '게임', 'NPC', '키즈', '더빙', '연기', '다큐', '애니메이션'];

/** 페이지네이션 데모를 위한 가라 데이터 — 목표 개수까지 채웁니다. */
function fillTalentProfiles(existingCount: number, target: number): Omit<TalentProfile, 'avatarSrc'>[] {
  return Array.from({ length: Math.max(0, target - existingCount) }, (_, index) => {
    const seed = existingCount + index;
    const localeA = talentLocalePool[seed % talentLocalePool.length];
    const localeB = talentLocalePool[(seed + 3) % talentLocalePool.length];
    const tagA = talentTagPool[seed % talentTagPool.length];
    const tagB = talentTagPool[(seed + 2) % talentTagPool.length];
    return {
      name: `성우 ${String(seed + 1).padStart(3, '0')}`,
      locale: localeA === localeB ? localeA : `${localeA} / ${localeB}`,
      tags: tagA === tagB ? [tagA] : [tagA, tagB],
      gender: seed % 2 === 0 ? '여성' : '남성',
      tones: seed % 3 === 0 ? ['귀여운', '친근한'] : seed % 3 === 1 ? ['차분한', '자연스러운'] : ['밝은', '감성적인'],
      favorites: 120 + seed * 7,
      completedProjects: 20 + seed % 130,
      duration: 20 + (seed % 40),
      verified: seed % 5 !== 0,
    };
  });
}

export const talentProfiles: TalentProfile[] = [...curatedTalentProfiles, ...fillTalentProfiles(curatedTalentProfiles.length, 200)].map((talent, index) => ({
  ...talent,
  avatarSrc: `/assets/talents/portrait-${String(talent.gender === '여성' ? 1 : talent.gender === '남성' ? 2 + index % 2 : index % 3 + 1).padStart(2, '0')}.jpg`,
}));

export const translationRows: TranslationRow[] = [
  { label: '영상 자막 · 대사 번역', value: 'Subtitling' },
  { label: '웹툰 번역 · 자막(레터링)', value: 'Webtoon' },
  { label: '게임 텍스트 로컬라이징', value: 'In-game' },
  { label: '기술 문서 · 계약서 · 수출 서류', value: 'Corporate' },
  { label: '원어민 감수', value: 'Native QA' },
];

export const heroStats: HeroStat[] = [
  { value: '1,000+', label: '글로벌 성우' },
  { value: '30개국', label: '서비스 언어' },
  { value: 'ISO 17100', label: '국제 인증' },
  { value: '4년 연속', label: '수출바우처 공정 수혜기관' },
];

export const serviceCards: ServiceItem[] = [
  { imageSrc: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=82', imageAlt: '녹음실 마이크', title: '애니메이션·게임·웹툰 더빙', description: '캐릭터 맞춤형 성우 캐스팅부터 게임 내 행동과 감정선까지 살려 자연스러운 더빙을 제공해드립니다.' },
  { imageSrc: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=82', imageAlt: '콘텐츠를 제작하는 팀', title: '기업 홍보·유튜브 콘텐츠', description: '브랜드를 위한 원어민 내레이션과 다국어 마케팅 영상 제작까지 한 번에 맞춰 깔끔한 메시지 전달을 지원합니다.' },
  { imageSrc: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=82', imageAlt: '번역과 현지화 작업 자료', title: '번역 (ISO 17100)', description: '게이머·매니아부터 일반 사용자까지 모두 자연스럽게 이해할 수 있는 번역과 현지화 품질을 보장합니다.' },
  { imageSrc: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=82', imageAlt: 'AI 기술 이미지', title: 'AI × Human 하이브리드 더빙', description: '대사가 많은 서브 캐릭터 등에 AI를 더해 효율을 높이고, 중요한 장면은 사람의 감성을 살린 더빙으로 마무리합니다.', badge: '부가 옵션', link: 'PROVOICE × AI 자세히 보기 →' },
];

export const supportLanguages = ['영어', '일본어', '중국어', '스페인어', '아랍어', '베트남어', '인도네시아어', '+ 22개국'];
