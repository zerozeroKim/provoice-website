const STORAGE_KEY = 'provoice_mock_profile';

export type MyProfile = {
  name: string;
  avatarSrc: string;
  gender: '남성' | '여성' | '';
  phone: string;
  languages: string[];
  categories: string[];
  tones: string[];
  bio: string;
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
