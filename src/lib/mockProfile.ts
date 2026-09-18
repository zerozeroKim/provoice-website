const STORAGE_KEY = 'provoice_mock_profile';

export type PortfolioEntry = {
  id: string;
  title: string;
  category: string;
  client: string;
  tags: string[];
  sampleFileName?: string;
  imageFileName?: string;
};

export type CareerEntry = {
  id: string;
  year: string;
  title: string;
  role: string;
};

export type MyProfile = {
  name: string;
  avatarSrc: string;
  gender: '남성' | '여성' | '';
  phone: string;
  languages: string[];
  categories: string[];
  tones: string[];
  bio: string;
  portfolio: PortfolioEntry[];
  career: CareerEntry[];
};

export const AVATAR_POOL = ['/assets/talents/portrait-01.jpg', '/assets/talents/portrait-02.jpg', '/assets/talents/portrait-03.jpg'];

const DEFAULT_PROFILE: MyProfile = {
  name: '김지훈',
  avatarSrc: AVATAR_POOL[1],
  gender: '남성',
  phone: '010-1234-5678',
  languages: ['한국어', '영어'],
  categories: ['내레이션', '광고'],
  tones: ['자신감', '친근한'],
  bio: '다양한 톤을 소화하는 내레이션 전문 성우입니다. 광고와 다큐멘터리 작업 경험이 많습니다.',
  portfolio: [
    { id: 'p1', title: 'MMORPG 글로벌 더빙 프로젝트', category: '게임', client: '레드문게임즈', tags: ['드라마틱', '진중한'], sampleFileName: 'mmorpg_main.wav', imageFileName: 'mmorpg_cover.jpg' },
    { id: 'p2', title: '글로벌 브랜드 TV 광고 내레이션', category: '광고', client: '브라이트애드컴퍼니', tags: ['자신감', '친근한'], sampleFileName: 'ad_narration.wav' },
  ],
  career: [
    { id: 'c1', year: '2026', title: 'MMORPG 글로벌 더빙 프로젝트', role: '메인 성우' },
    { id: 'c2', year: '2025', title: '기업 홍보 영상 내레이션', role: '내레이터' },
  ],
};

export function getMyProfile(): MyProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    /* ignore malformed local data and fall back to defaults */
  }
  return DEFAULT_PROFILE;
}

export function saveMyProfile(profile: MyProfile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function createId() {
  return Math.random().toString(36).slice(2, 10);
}
