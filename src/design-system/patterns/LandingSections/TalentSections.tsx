import { useMemo, useState, type FormEvent } from 'react';
import { Search, Users } from 'lucide-react';
import { useLanguage, useT } from '@/lib/i18n';
import { Button, Chip, FilterDropdown, Pagination, SectionHeader, TextField, VoiceActorCard } from '../../components';
import styles from './TalentSections.module.css';
import { flagFor } from './landingContent';
import type { TalentProfile } from './types';

const recognizedConditionsKo = ['일본어', '20대', '여성', '캐릭터 보이스'];
const recognizedConditionsEn = ['Japanese', '20s', 'Female', 'Character voice'];
const openTalentDetail = (talent: TalentProfile) => { window.location.hash = `#voice-actor/${encodeURIComponent(talent.name)}`; };

export function TalentDirectorySection({ talents, headingLevel = 2 }: { talents: TalentProfile[]; headingLevel?: 1 | 2 }) {
  const t = useT();
  const { language } = useLanguage();
  const [query, setQuery] = useState('일본어 하는 20대 여성 캐릭터 보이스');
  const [hasSearched, setHasSearched] = useState(false);
  const [showAllTalents, setShowAllTalents] = useState(false);
  const carouselTalents = useMemo(() => [...talents].sort(() => Math.random() - 0.5).slice(0, 10), [talents]);
  const carouselSequence = useMemo(() => Array.from({ length: 4 }, () => carouselTalents).flat(), [carouselTalents]);
  const matchedTalents = useMemo(() => {
    const normalized = query.toLowerCase();
    const locale = normalized.includes('일본어') || normalized.includes('japanese') ? 'JP' : normalized.includes('한국어') || normalized.includes('korean') ? 'KO' : normalized.includes('영어') || normalized.includes('english') ? 'EN' : null;
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
  const recognizedConditions = language === 'en' ? recognizedConditionsEn : recognizedConditionsKo;

  return (
    <section className={styles.talentSection} aria-label={t('성우 검색', 'Find voice actors')}>
      <div className={styles.talentAmbient} aria-hidden="true"><span /><span /></div>
      <div className={styles.talentInner}>
        <SectionHeader
          headingLevel={headingLevel}
          className={styles.talentHeader}
          eyebrow="VOICE TALENT DIRECTORY"
          title={language === 'en'
            ? <>Find Voice Actors<br /><span className={styles.talentTitleGradient}>Just describe what you need</span></>
            : <>성우 검색<br /><span className={styles.talentTitleGradient}>문장으로 편하게 찾아보세요</span></>}
          description={language === 'en'
            ? <>Type a sentence like &ldquo;a female character voice in her 20s, speaks Japanese&rdquo; and we&rsquo;ll match you automatically.</>
            : <>&ldquo;일본어 하는 20대 여성 캐릭터 보이스&rdquo;처럼 원하는 조건을 문장으로 입력하면 자동으로 매칭해드립니다.</>}
        />
        <div className={styles.talentWorkspace}>
          <div className={styles.searchShell}>
            <form className={styles.searchRow} onSubmit={handleSearch}>
              <TextField
                label={t('성우 검색', 'Find voice actors')}
                hideLabel
                fieldSize="md"
                leadingIcon={<Search size={18} strokeWidth={1.75} />}
                value={query}
                onChange={(event) => { setQuery(event.target.value); setHasSearched(false); setShowAllTalents(false); }}
                placeholder={t('예) 일본어 하는 20대 여성 캐릭터 보이스', 'e.g. a female character voice in her 20s, speaks Japanese')}
                containerClassName={styles.searchField}
              />
              <Button type="submit" size="md">{t('검색', 'Search')}</Button>
            </form>
            <div className={styles.searchMeta}>
              <div className={styles.searchMetaChips}>
                {recognizedConditions.map((condition) => <Chip key={condition} variant="status" tone="purple" size="md">{condition}</Chip>)}
              </div>
            </div>
          </div>
          {!hasSearched && (
            <div className={styles.talentCarousel} aria-label={t('추천 성우', 'Recommended voice actors')}>
              <div className={styles.talentCarouselTrack}>
                {[...carouselSequence, ...carouselSequence].map((talent, index) => (
                  <div key={`${talent.name}-${index}`} className={styles.talentCardLink} role="button" tabIndex={0} onClick={() => openTalentDetail(talent)} onKeyDown={(event) => event.key === 'Enter' && openTalentDetail(talent)}>
                    <VoiceActorCard
                      className={styles.talentCarouselCard}
                      name={talent.name} avatarSrc={talent.avatarSrc}
                      flagEmoji={flagFor(talent.locale)}
                      best={talent.best}
                      tags={talent.tones ?? []}
                      duration={talent.duration}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {hasSearched && (
            <div className={styles.talentResults}>
              <div className={styles.talentResultsHeader}>
                <div className={styles.talentSummary}><Users size={16} strokeWidth={1.75} aria-hidden="true" /> {t('검색 결과', 'Results')} <strong>{t(`${matchedTalents.length}명`, `${matchedTalents.length}`)}</strong></div>
                {matchedTalents.length > 4 && (
                  <Button variant="ghost" size="sm" trailingIcon={<span aria-hidden="true">{showAllTalents ? '↑' : '→'}</span>} onClick={() => setShowAllTalents((value) => !value)}>
                    {showAllTalents ? t('접기', 'Collapse') : t('전체보기', 'View all')}
                  </Button>
                )}
              </div>
              <div className={styles.talentGrid}>
                {visibleTalents.map((talent) => (
                  <div key={talent.name} className={styles.talentCardLink} role="button" tabIndex={0} onClick={() => openTalentDetail(talent)} onKeyDown={(event) => event.key === 'Enter' && openTalentDetail(talent)}>
                    <VoiceActorCard className={styles.talentCard} name={talent.name} avatarSrc={talent.avatarSrc} flagEmoji={flagFor(talent.locale)} best={talent.best} tags={talent.tones ?? []} duration={talent.duration} />
                  </div>
                ))}
              </div>
              <div className={styles.bottomBanner}>
                <div className={styles.bottomBannerCopy}><h3>{t('프로보이스 등록 성우', 'Registered on Provoice')}</h3><p>{t('실제 프로젝트 이력으로 검증된 프로필을 만들고 새로운 프로젝트 섭외를 받아보세요.', 'Build a profile verified by real project history and get scouted for new projects.')}</p></div>
                <button type="button" className={styles.bannerButton}>{t('성우 등록하기', 'Register as a Voice Actor')}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export const talentLanguages = [
  { code: 'KO', ko: '한국어', en: 'Korean' },
  { code: 'EN', ko: '영어', en: 'English' },
  { code: 'JP', ko: '일본어', en: 'Japanese' },
  { code: 'ZH', ko: '중국어', en: 'Chinese' },
  { code: 'ES', ko: '스페인어', en: 'Spanish' },
  { code: 'AR', ko: '아랍어', en: 'Arabic' },
  { code: 'VI', ko: '베트남어', en: 'Vietnamese' },
  { code: 'ID', ko: '인도네시아어', en: 'Indonesian' },
  { code: 'TH', ko: '태국어', en: 'Thai' },
  { code: 'FR', ko: '프랑스어', en: 'French' },
  { code: 'DE', ko: '독일어', en: 'German' },
  { code: 'RU', ko: '러시아어', en: 'Russian' },
  { code: 'PT', ko: '포르투갈어', en: 'Portuguese' },
  { code: 'IT', ko: '이탈리아어', en: 'Italian' },
  { code: 'TR', ko: '터키어', en: 'Turkish' },
] as const;
export const talentGenders = [{ ko: '남성', en: 'Male' }, { ko: '여성', en: 'Female' }];
export const talentCategories = [
  { ko: '게임', en: 'Game' }, { ko: '광고(TV)', en: 'Advertising (TV)' }, { ko: '교육영상', en: 'Educational Video' },
  { ko: '기업홍보', en: 'Corporate PR' }, { ko: '나레이션', en: 'Narration' }, { ko: '노래·보컬', en: 'Singing/Vocal' },
  { ko: '안내멘트, ARS', en: 'Announcement / ARS' }, { ko: '오디오북', en: 'Audiobook' }, { ko: '유튜브', en: 'YouTube' },
  { ko: '캐릭터', en: 'Character' }, { ko: '키즈', en: 'Kids' }, { ko: '기타', en: 'Other' },
];
export const talentTones = [
  { ko: '감성적인&따뜻한', en: 'Emotional & Warm' }, { ko: '고음의', en: 'High-pitched' }, { ko: '귀여운', en: 'Cute' },
  { ko: '대화체의', en: 'Conversational' }, { ko: '드라마틱', en: 'Dramatic' }, { ko: '무서운', en: 'Scary' },
  { ko: '밝은', en: 'Bright' }, { ko: '비꼬는', en: 'Sarcastic' }, { ko: '섹시한', en: 'Sexy' },
  { ko: '자신감', en: 'Confident' }, { ko: '자연스러운', en: 'Natural' }, { ko: '재밌는', en: 'Fun' },
  { ko: '저음의', en: 'Low-pitched' }, { ko: '중음의', en: 'Mid-pitched' }, { ko: '진중한', en: 'Serious' },
  { ko: '차분한', en: 'Calm' }, { ko: '친근한', en: 'Friendly' }, { ko: '투박한', en: 'Rugged' }, { ko: '기타', en: 'Other' },
];
export const talentAges = [{ ko: '아이', en: 'Child' }, { ko: '청년', en: 'Young Adult' }, { ko: '중년', en: 'Middle-aged' }, { ko: '노년', en: 'Senior' }, { ko: '미상', en: 'Unspecified' }];

type FilterState = { languages: string[]; genders: string[]; categories: string[]; tones: string[]; ages: string[] };
const emptyFilterState: FilterState = { languages: [], genders: [], categories: [], tones: [], ages: [] };
const resolveKo = (pairs: { ko: string; en: string }[], value: string) => pairs.find((pair) => pair.ko === value || pair.en === value)?.ko ?? value;

export function TalentFilterSection({ talents, pageSize = 20 }: { talents: TalentProfile[]; pageSize?: number }) {
  const t = useT();
  const { language } = useLanguage();
  const [languages, setLanguages] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tones, setTones] = useState<string[]>([]);
  const [ages, setAges] = useState<string[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(emptyFilterState);
  const [page, setPage] = useState(1);

  const pick = (pairs: { ko: string; en: string }[]) => pairs.map((pair) => t(pair.ko, pair.en));

  const selectSingle = (setter: (value: string[]) => void, current: string[]) => (option: string) => {
    setter(current.includes(option) ? [] : [option]);
  };
  const toggleMulti = (setter: (updater: (current: string[]) => string[]) => void) => (option: string) => {
    setter((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option]);
  };

  const runSearch = () => {
    setAppliedFilters({ languages, genders, categories, tones, ages });
    setPage(1);
  };

  const clearAll = () => {
    setLanguages([]); setGenders([]); setCategories([]); setTones([]); setAges([]);
  };

  const selectedEntries = [
    ...languages.map((value) => ({ key: `lang-${value}`, label: value, onRemove: () => setLanguages([]) })),
    ...genders.map((value) => ({ key: `gender-${value}`, label: value, onRemove: () => setGenders([]) })),
    ...categories.map((value) => ({ key: `cat-${value}`, label: value, onRemove: () => setCategories([]) })),
    ...tones.map((value) => ({ key: `tone-${value}`, label: value, onRemove: () => toggleMulti(setTones)(value) })),
    ...ages.map((value) => ({ key: `age-${value}`, label: value, onRemove: () => setAges([]) })),
  ];

  const matchedTalents = useMemo(() => {
    const selectedLanguage = appliedFilters.languages[0];
    const localeFilter = selectedLanguage ? talentLanguages.find((item) => item.ko === selectedLanguage || item.en === selectedLanguage)?.code ?? null : null;

    const genderKo = appliedFilters.genders[0] ? resolveKo(talentGenders, appliedFilters.genders[0]) : null;
    const categoryKo = appliedFilters.categories[0] ? resolveKo(talentCategories, appliedFilters.categories[0]) : null;
    const toneKos = appliedFilters.tones.map((value) => resolveKo(talentTones, value));
    const ageKo = appliedFilters.ages[0] ? resolveKo(talentAges, appliedFilters.ages[0]) : null;

    return talents.filter((talent) => {
      if (localeFilter && !talent.locale.includes(localeFilter)) return false;
      if (genderKo && talent.gender !== genderKo) return false;
      if (categoryKo && !talent.tags.some((tag) => tag.includes(categoryKo) || categoryKo.includes(tag))) return false;
      if (toneKos.length && !talent.tones?.some((tone) => toneKos.includes(tone))) return false;
      if (ageKo && talent.ageRange !== ageKo) return false;
      return true;
    });
  }, [appliedFilters, talents]);
  const totalPages = Math.max(1, Math.ceil(matchedTalents.length / pageSize));
  const visibleTalents = matchedTalents.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section className={styles.talentFilterSection} aria-label={t('성우 검색 — 필터 검색', 'Find voice actors — filtered search')}>
      <div className={styles.talentInner}>
        <div className={styles.talentFilterShell}>
          <div className={styles.talentFilterRow}>
            <FilterDropdown label={t('언어', 'Language')} options={pick(talentLanguages as unknown as { ko: string; en: string }[])} selected={languages} onSelect={selectSingle(setLanguages, languages)} />
            <FilterDropdown label={t('성별', 'Gender')} options={pick(talentGenders)} selected={genders} onSelect={selectSingle(setGenders, genders)} />
            <FilterDropdown label={t('카테고리', 'Category')} options={pick(talentCategories)} selected={categories} onSelect={selectSingle(setCategories, categories)} />
            <FilterDropdown label={t('톤', 'Tone')} options={pick(talentTones)} selected={tones} multiple onSelect={toggleMulti(setTones)} />
            <FilterDropdown label={t('연령', 'Age')} options={pick(talentAges)} selected={ages} onSelect={selectSingle(setAges, ages)} />
            <Button className={styles.filterSearchButton} size="md" leadingIcon={<Search size={16} strokeWidth={1.75} />} onClick={runSearch}>{t('검색', 'Search')}</Button>
          </div>
          {selectedEntries.length > 0 && (
            <div className={styles.selectedFiltersRow}>
              <span className={styles.selectedFiltersLabel}>{t('선택한 조건', 'Selected')}</span>
              {selectedEntries.map((entry) => (
                <Chip key={entry.key} variant="input" size="sm" tone="purple" onRemove={entry.onRemove}>{entry.label}</Chip>
              ))}
              <button type="button" className={styles.clearFiltersButton} onClick={clearAll}>{t('전체 초기화', 'Clear all')}</button>
            </div>
          )}
        </div>
        <div className={styles.talentResults}>
          <div className={styles.talentResultsHeader}>
            <div className={styles.talentSummary}>{t('검색 결과', 'Results')} <strong>{language === 'en' ? matchedTalents.length : `${matchedTalents.length}명`}</strong></div>
          </div>
          <div className={styles.talentGrid}>
            {visibleTalents.map((talent) => (
              <div key={talent.name} className={styles.talentCardLink} role="button" tabIndex={0} onClick={() => openTalentDetail(talent)} onKeyDown={(event) => event.key === 'Enter' && openTalentDetail(talent)}>
                <VoiceActorCard className={styles.talentCard} name={talent.name} avatarSrc={talent.avatarSrc} flagEmoji={flagFor(talent.locale)} best={talent.best} tags={talent.tones ?? []} duration={talent.duration} />
              </div>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </section>
  );
}
