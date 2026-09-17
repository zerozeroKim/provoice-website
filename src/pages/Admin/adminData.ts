export type RosterRow = {
  id: number;
  displayId: string;
  name: string;
  avatarSrc?: string;
  best: boolean;
  sampleCount: number;
  status: '신청중' | '등록완료';
  appliedAt: string;
};

export type SampleRow = {
  id: number;
  actorName: string;
  duration: string;
  category: string;
  language: string;
  region: string;
  gender: string;
  age: string;
  tone: string;
  newTone: string;
  tags: string;
  registeredAt: string;
};

export type LanguageRow = { id: number; flag: string; nameKo: string; nameEn: string; registeredAt: string };

const namePool = ['이솔', '김은수', '석화영', '민은주', '원루연', 'Sabrina Denis', '이하리', 'Ian Andrei', 'Nina', 'Mika', 'Himawari', 'Yuri T', '박서준', '정하은', 'Leo K.', '강다현', 'Miyu S.', '조은별', 'Carlos M.', '윤채아'];
const avatarPool = ['/assets/talents/portrait-01.jpg', '/assets/talents/portrait-02.jpg', '/assets/talents/portrait-03.jpg'];

function formatDate(baseIso: string, daysAgo: number) {
  const date = new Date(baseIso);
  date.setDate(date.getDate() - daysAgo);
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export const adminVoiceActorRows: RosterRow[] = Array.from({ length: 54 }, (_, index) => {
  const seed = index;
  const hasAvatar = seed % 3 !== 2;
  const id = 3911 - seed * 2;
  return {
    id,
    displayId: String(id),
    name: namePool[seed % namePool.length],
    avatarSrc: hasAvatar ? avatarPool[seed % avatarPool.length] : undefined,
    best: true,
    sampleCount: [0, 4, 0, 0, 3, 5, 11, 0, 2, 1, 1, 1][seed % 12],
    status: seed % 3 === 0 ? '신청중' : '등록완료',
    appliedAt: formatDate('2026-09-10T02:57:03', seed * 2),
  };
});

const translatorSeed: Array<[string, number | undefined, number, string]> = [
  ['김화니', 1, 0, '2026-06-19 22:54:31'],
  ['김향란', 2, 0, '2025-10-21 13:41:53'],
  ['김미림', undefined, 0, '2025-02-27 15:43:07'],
  ['오주아', 3, 0, '2024-11-01 11:22:29'],
  ['Ibrahim Benamira', 1, 0, '2024-09-17 03:07:48'],
  ['최진명', 2, 0, '2024-08-08 15:30:49'],
  ['[일본어] test77', undefined, 1, '2024-04-05 14:36:59'],
  ['Wataru H.', 3, 2, '2024-02-19 09:41:22'],
];

export const adminTranslatorRows: RosterRow[] = translatorSeed.map(([name, avatarIndex, sampleCount, appliedAt], index) => ({
  id: index + 1,
  displayId: String(index + 1).padStart(3, '0'),
  name,
  avatarSrc: avatarIndex !== undefined ? avatarPool[avatarIndex % avatarPool.length] : undefined,
  best: true,
  sampleCount,
  status: '신청중',
  appliedAt,
}));

const sampleActorPool = ['김은수', '김산하', '원루연', '이하리', 'Sabrina Denis', '이솔', '민은주'];
const sampleCategoryPool = ['캐릭터', '오디오북', '게임', '기타', '내레이션'];
const sampleTonePool = [
  '차분한, 드라마틱, 감성적인&따뜻한',
  '드라마틱, 진중한, 대화체의, 자연스러운',
  '드라마틱, 대화체의, 자연스러운',
  '자신감, 밝은, 재밌는',
  '차분한, 드라마틱, 무서운',
  '차분한, 셱시한, 대화체의, 자연스러운, 저음의, 중음의',
  '자신감, 밝은, 대화체의, 자연스러운, 고음의',
  '자신감, 귀여운, 대화체의, 자연스러운, 고음의, 중음의',
  '차분한, 진중한, 대화체의, 친화적, 자연스러운',
];
const sampleTagPool = ['', '', '20대,30대,나른한,차분한,장난기,요염한', '여아,발랄한,활기찬,귀여운', '10대,학생,다정한,상냥한,착한,선한', '다역할,아이,여아,주인공,여마법사,안내자', '섹시,캐릭터,고양이,여왕,오만한', 'Conversa,Natural'];
const sampleLanguagePool: Array<[string, string]> = [['한국어', '대한민국'], ['한국어', '서울'], ['한국어', '표준어'], ['프랑스어', 'French']];
const sampleGenderPool = ['남성', '여성'];
const sampleAgePool = ['아이', '청년', '중년', '노년', '미상'];

export const adminSampleRows: SampleRow[] = Array.from({ length: 60 }, (_, index) => {
  const seed = index;
  const [language, region] = sampleLanguagePool[seed % sampleLanguagePool.length];
  const minutes = String((seed % 3)).padStart(2, '0');
  const seconds = String(7 + (seed * 13) % 52).padStart(2, '0');
  return {
    id: 7076 - seed,
    actorName: sampleActorPool[seed % sampleActorPool.length],
    duration: `${minutes}:${seconds}`,
    category: sampleCategoryPool[seed % sampleCategoryPool.length],
    language,
    region,
    gender: sampleGenderPool[seed % sampleGenderPool.length],
    age: sampleAgePool[seed % sampleAgePool.length],
    tone: sampleTonePool[seed % sampleTonePool.length],
    newTone: '-',
    tags: sampleTagPool[seed % sampleTagPool.length],
    registeredAt: formatDate('2026-09-09T13:33:17', seed),
  };
});

const languageSeed: Array<[string, string, string, string]> = [
  ['🇰🇿', '카자흐스탄어', 'Kazakhi', '2023-11-08 10:18:53'],
  ['🇭🇺', '헝가리어', 'Hungarian', '2023-11-08 10:18:11'],
  ['🇱🇰', '스리랑카어', 'Sri Lankan (Sinhalese)', '2023-07-20 10:19:49'],
  ['🇵🇱', '폴란드어', 'Polish', '2023-05-09 14:53:06'],
  ['🇲🇲', '미얀마어', 'Myanmar', '2023-04-20 17:08:44'],
  ['🇺🇿', '우즈베키스탄어', 'Uzbekistan', '2023-04-20 17:08:09'],
  ['🇭🇰', '홍콩어', 'Hongkong', '2022-12-16 14:58:43'],
  ['🇳🇵', '네팔어', 'Nepal', '2022-01-28 17:56:12'],
  ['🇰🇭', '캄보디아어', 'Cambodia', '2022-01-28 17:55:55'],
  ['🇲🇳', '몽골어', 'Mongolian', '2021-10-27 15:25:28'],
  ['🇹🇼', '대만어', 'Taiwanese', '2021-04-15 12:44:11'],
  ['🇧🇷', '브라질어', 'Brazilian', '2021-03-22 10:27:02'],
  ['🇻🇳', '베트남어', 'Vietnamese', '2020-12-11 09:14:02'],
  ['🇹🇭', '태국어', 'Thai', '2020-11-02 16:40:22'],
  ['🇮🇩', '인도네시아어', 'Indonesian', '2020-09-19 11:05:37'],
  ['🇹🇷', '터키어', 'Turkish', '2020-08-14 13:29:18'],
  ['🇸🇦', '아랍어', 'Arabic', '2020-06-30 08:52:44'],
  ['🇷🇺', '러시아어', 'Russian', '2020-05-18 15:11:09'],
  ['🇮🇹', '이탈리아어', 'Italian', '2020-04-02 10:38:56'],
  ['🇵🇹', '포르투갈어', 'Portuguese', '2020-02-27 09:47:31'],
  ['🇩🇪', '독일어', 'German', '2019-12-15 14:22:07'],
  ['🇪🇸', '스페인어', 'Spanish', '2019-11-08 11:36:52'],
  ['🇫🇷', '프랑스어', 'French', '2019-09-24 16:05:19'],
  ['🇯🇵', '일본어', 'Japanese', '2019-08-10 09:21:44'],
  ['🇨🇳', '중국어', 'Chinese', '2019-06-27 13:47:33'],
  ['🇺🇸', '영어', 'English', '2019-05-14 10:12:58'],
];

export const adminLanguageRows: LanguageRow[] = languageSeed.map(([flag, nameKo, nameEn, registeredAt], index) => ({
  id: index + 1,
  flag,
  nameKo,
  nameEn,
  registeredAt,
}));
