import { useMemo, useState, type FormEvent } from 'react';
import { Search, Users } from 'lucide-react';
import { Button, Chip, FilterDropdown, Pagination, SectionHeader, TextField, VoiceActorCard } from '../../components';
import styles from './TalentSections.module.css';
import type { TalentProfile } from './types';

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
        <SectionHeader
          className={styles.talentHeader}
          eyebrow="VOICE TALENT DIRECTORY"
          title={<>성우 검색<br /><span className={styles.talentTitleGradient}>문장으로 편하게 찾아보세요</span></>}
          description={<>“일본어 하는 20대 여성 캐릭터 보이스”처럼 원하는 조건을 문장으로 입력하면 자동으로 매칭해드립니다.</>}
        />
        <div className={styles.talentWorkspace}>
          <div className={styles.searchShell}>
            <form className={styles.searchRow} onSubmit={handleSearch}>
              <TextField
                label="성우 검색"
                hideLabel
                fieldSize="md"
                leadingIcon={<Search size={18} strokeWidth={1.75} />}
                value={query}
                onChange={(event) => { setQuery(event.target.value); setHasSearched(false); setShowAllTalents(false); }}
                placeholder="예) 일본어 하는 20대 여성 캐릭터 보이스"
                containerClassName={styles.searchField}
              />
              <Button type="submit" size="md">검색</Button>
            </form>
            <div className={styles.searchMeta}>
              <div className={styles.searchMetaChips}>
                {recognizedConditions.map((condition) => <Chip key={condition} variant="status" tone="purple" size="md">{condition}</Chip>)}
              </div>
            </div>
          </div>
          {!hasSearched && (
            <div className={styles.talentCarousel} aria-label="추천 성우">
              <div className={styles.talentCarouselTrack}>
                {[...carouselSequence, ...carouselSequence].map((talent, index) => (
                  <VoiceActorCard
                    key={`${talent.name}-${index}`}
                    className={styles.talentCarouselCard}
                    name={talent.name}
                    nickname={talent.locale}
                    verified={talent.verified}
                    tags={talent.tags}
                    duration={talent.duration}
                  />
                ))}
              </div>
            </div>
          )}
          {hasSearched && (
            <div className={styles.talentResults}>
              <div className={styles.talentResultsHeader}>
                <div className={styles.talentSummary}><Users size={16} strokeWidth={1.75} aria-hidden="true" /> 검색 결과 <strong>{matchedTalents.length}명</strong></div>
                {matchedTalents.length > 4 && (
                  <Button variant="ghost" size="sm" trailingIcon={<span aria-hidden="true">{showAllTalents ? '↑' : '→'}</span>} onClick={() => setShowAllTalents((value) => !value)}>
                    {showAllTalents ? '접기' : '전체보기'}
                  </Button>
                )}
              </div>
              <div className={styles.talentGrid}>
                {visibleTalents.map((talent) => (
                  <VoiceActorCard key={talent.name} className={styles.talentCard} name={talent.name} nickname={talent.locale} verified={talent.verified} tags={talent.tags} duration={talent.duration} />
                ))}
              </div>
              <div className={styles.bottomBanner}>
                <p><strong>프로보이스 등록 성우</strong><span>실제 프로젝트 이력으로 검증된 프로필을 만들고 새로운 프로젝트 섭외를 받아보세요.</span></p>
                <button type="button" className={styles.bannerButton}>성우 등록하기</button>
              </div>
            </div>
          )}
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
            <FilterDropdown label="언어" options={talentLanguageOptions} selected={languages} onSelect={selectSingle(setLanguages, languages)} />
            <FilterDropdown label="성별" options={talentGenderOptions} selected={genders} onSelect={selectSingle(setGenders, genders)} />
            <FilterDropdown label="카테고리" options={talentCategoryOptions} selected={categories} onSelect={selectSingle(setCategories, categories)} />
            <FilterDropdown label="톤" options={talentToneOptions} selected={tones} multiple onSelect={toggleMulti(setTones)} />
            <FilterDropdown label="연령" options={talentAgeOptions} selected={ages} onSelect={selectSingle(setAges, ages)} />
          </div>
        </div>
        <div className={styles.talentResults}>
          <div className={styles.talentResultsHeader}>
            <div className={styles.talentSummary}>검색 결과 <strong>{matchedTalents.length}명</strong></div>
          </div>
          <div className={styles.talentGrid}>
            {visibleTalents.map((talent) => (
              <VoiceActorCard key={talent.name} className={styles.talentCard} name={talent.name} nickname={talent.locale} verified={talent.verified} tags={talent.tags} duration={talent.duration} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </section>
  );
}
