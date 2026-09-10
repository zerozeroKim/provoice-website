import { useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play, ShieldCheck } from 'lucide-react';
import { Button, FilterDropdown, Footer, GNB, PortfolioCard, PortfolioDetail, TestimonialCard, VoiceTraitChip, talentProfiles } from '@/design-system';
import type { PortfolioItem, TalentProfile } from '@/design-system';
import styles from './VoiceActorDetailPage.module.css';

const tabs = ['프로필', '포트폴리오', '경력·크레딧', '고객사 리뷰'] as const;
const reviewSortOptions = ['최신순', '별점 높은순'] as const;

/** 실제 프로필 데이터가 없는 상태에서 IMDB 배우 페이지처럼 구성만 보여주기 위한 예시 데이터 풀. */
const projectPool = [
  { title: 'MMORPG 글로벌 더빙 프로젝트', category: '게임', image: 'linear-gradient(135deg, #2a2440, #6d3fc9)', link: 'https://provoice.co.kr/portfolio/mmorpg-global', wavAttached: true, tags: ['드라마틱', '진중한'] },
  { title: '극장판 애니메이션 다국어 더빙', category: '애니메이션', image: 'linear-gradient(135deg, #2c1f3d, #9146c9)', link: undefined, wavAttached: true, tags: ['감성적인&따뜻한', '드라마틱'] },
  { title: '인기 웹툰 시리즈 오디오드라마화', category: '웹툰', image: 'linear-gradient(135deg, #1f2b3d, #3f74c9)', link: 'https://provoice.co.kr/portfolio/webtoon-audiodrama', wavAttached: false, tags: ['재밌는', '밝은'] },
  { title: '글로벌 브랜드 TV 광고 내레이션', category: '광고', image: 'linear-gradient(135deg, #3d231f, #c96b3f)', link: undefined, wavAttached: false, tags: ['자신감', '친근한'] },
  { title: '모바일 게임 NPC 다국어 대사', category: '게임', image: 'linear-gradient(135deg, #1f3d33, #3fc98a)', link: 'https://provoice.co.kr/portfolio/mobile-npc', wavAttached: true, tags: ['귀여운', '재밌는'] },
  { title: 'OTT 오리지널 시리즈 보이스 하이브리드', category: '더빙', image: 'linear-gradient(135deg, #2a1f3d, #7a3fc9)', link: undefined, wavAttached: true, tags: ['자연스러운', '진중한'] },
] as const;

const careerPool = [
  { year: '2026', title: 'MMORPG 글로벌 더빙 프로젝트', role: '메인 성우' },
  { year: '2025', title: '극장판 애니메이션 다국어 더빙', role: '조연 캐릭터' },
  { year: '2025', title: '기업 홍보 영상 내레이션', role: '내레이터' },
  { year: '2024', title: '오디오북 시리즈', role: '낭독' },
  { year: '2024', title: '모바일 게임 NPC 다국어 대사', role: '서브 캐릭터' },
] as const;

const reviewPool = [
  { quote: '섬세한 감정 표현과 빠른 커뮤니케이션 덕분에 재작업 없이 한 번에 완성도 높은 결과물을 받았습니다.', name: '게임즐기는곰돌이', role: '모바일 RPG 더빙', rating: 5 },
  { quote: '캐릭터 톤을 정확히 이해하고 여러 테이크를 유연하게 제안해주셔서 협업이 매우 수월했습니다.', name: '애니덕후지훈', role: '극장판 더빙', rating: 5 },
  { quote: '납기 준수는 물론, 현장 디렉션 반영 속도가 빨라서 다음 프로젝트에도 바로 재섭외했습니다.', name: '광고쟁이수민', role: 'TV 광고 내레이션', rating: 5 },
  { quote: '웹툰 특유의 리듬감을 잘 살려주셔서 독자 반응이 훨씬 좋아졌습니다. 재계약 의사 100%입니다.', name: '웹툰러버혜진', role: '오디오드라마 제작', rating: 5 },
  { quote: '다국어 녹음 일정이 촉박했는데도 품질 저하 없이 맞춰주셔서 팀 전체가 만족했습니다.', name: '글로벌게이머J', role: 'MMORPG 다국어 더빙', rating: 4 },
  { quote: '내레이션 톤 조정 요청에 대한 이해가 빨라서 커뮤니케이션 비용이 거의 들지 않았습니다.', name: '마케팅요정민준', role: '홍보 영상 내레이션', rating: 5 },
  { quote: 'NPC 대사 볼륨이 많았는데도 캐릭터별 구분이 확실해서 별도 QA 없이 바로 반영했습니다.', name: '버그헌터세영', role: '게임 NPC 다국어 대사', rating: 4 },
  { quote: '오디오북 특유의 몰입감 있는 낭독으로 완청률이 눈에 띄게 올라갔습니다.', name: '책읽어주는소리', role: '오디오북 낭독', rating: 5 },
  { quote: 'AI 하이브리드 파트와 실제 녹음 파트의 톤 이질감이 거의 없어서 결과물이 굉장히 자연스러웠습니다.', name: '콘텐츠덕후은서', role: 'AI 하이브리드 더빙', rating: 5 },
] as const;

const seedFromName = (name: string) => name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);

const getRequestedName = () => decodeURIComponent(window.location.hash.split('/')[1] ?? '');

export function VoiceActorDetailPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('프로필');
  const [playing, setPlaying] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const [reviewSort, setReviewSort] = useState<(typeof reviewSortOptions)[number]>('최신순');
  const talent: TalentProfile | undefined = talentProfiles.find((item) => item.name === getRequestedName());

  if (!talent) {
    return (
      <main className={styles.page}>
        <GNB />
        <div className={styles.notFound}>
          <p>해당 성우 프로필을 찾을 수 없습니다.</p>
          <a href="#voice-search">성우검색으로 돌아가기</a>
        </div>
        <Footer />
      </main>
    );
  }

  const seed = seedFromName(talent.name);
  const projects = [...projectPool.slice(seed % projectPool.length), ...projectPool.slice(0, seed % projectPool.length)];
  const career = [...careerPool.slice(seed % careerPool.length), ...careerPool.slice(0, seed % careerPool.length)];
  const reviews = [...reviewPool.slice(seed % reviewPool.length), ...reviewPool.slice(0, seed % reviewPool.length)];
  const sortedReviews = reviewSort === '별점 높은순' ? [...reviews].sort((a, b) => b.rating - a.rating) : reviews;

  const openProject = (project: (typeof projectPool)[number], cardOrigin: DOMRect) => {
    setOrigin(cardOrigin);
    setSelectedProject({ category: project.category, title: project.title, languages: [talent.locale], tone: project.category, tags: [project.category], image: project.image, link: project.link, wavAttached: project.wavAttached });
  };

  return (
    <main className={styles.page}>
      <GNB />
      <div className={styles.shell}>
        <a className={styles.backLink} href="#voice-search"><ArrowLeft size={16} /> 성우검색으로</a>

        <div className={styles.hero}>
          <span className={styles.avatar} aria-hidden="true">{talent.name.slice(0, 1)}</span>
          <div className={styles.heroBody}>
            <div className={styles.nameRow}>
              <h1>{talent.name}</h1>
              {talent.verified && <span className={styles.verified}><ShieldCheck size={14} strokeWidth={2} /> 프로보이스 등록 성우</span>}
            </div>
            <p className={styles.stageName}>예명 · {talent.name} VO — {talent.locale}</p>
            <ul className={styles.tags}>{talent.tags.map((tag) => <li key={tag}><VoiceTraitChip label={tag} /></li>)}</ul>

            <div className={styles.player}>
              <button type="button" className={styles.playButton} aria-pressed={playing} aria-label={playing ? '샘플 일시정지' : '샘플 재생'} onClick={() => setPlaying((value) => !value)}>
                {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
              </button>
              <span className={styles.progressTrack}><span style={{ width: playing ? '38%' : '0%' }} /></span>
              <span className={styles.duration}>{talent.duration}초 샘플</span>
            </div>
          </div>

          <div className={styles.contactBlock}>
            <Button className={styles.contactButton}>성우 컨택 문의</Button>
            <p className={styles.contactNote}>컨택은 프로보이스 경유로만 가능합니다.</p>
          </div>
        </div>

        <nav className={styles.tabBar} aria-label="성우 상세 탭">
          {tabs.map((tab) => (
            <button key={tab} type="button" className={tab === activeTab ? styles.tabActive : ''} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </nav>

        <div className={styles.tabBody}>
          {activeTab === '프로필' && (
            <div className={styles.profileGrid}>
              <section>
                <h2>대표 프로젝트</h2>
                <div className={styles.projectRow}>
                  {projects.slice(0, 3).map((project) => (
                    <PortfolioCard key={project.title} imageOnly title={project.title} languages={[talent.locale]} category={project.category} tags={[project.category]} image={project.image} onOpen={(cardOrigin) => openProject(project, cardOrigin)} />
                  ))}
                </div>
              </section>
              <section>
                <h2>스킬 태그</h2>
                <ul className={styles.tags}>{talent.tags.map((tag) => <li key={tag}><VoiceTraitChip label={tag} /></li>)}</ul>
              </section>
              <section>
                <h2>주요경력</h2>
                <ul className={styles.careerList}>
                  {career.slice(0, 3).map((item) => (
                    <li key={`${item.year}-${item.title}`}><span className={styles.careerYear}>{item.year}</span><span>{item.title}</span><span className={styles.careerRole}>{item.role}</span></li>
                  ))}
                </ul>
              </section>
              <section>
                <div className={styles.sectionHead}>
                  <h2>고객사 리뷰 <span className={styles.countBadge}>{reviews.length}</span></h2>
                  <button type="button" className={styles.viewAllLink} onClick={() => setActiveTab('고객사 리뷰')}>전체보기 <ArrowRight size={14} /></button>
                </div>
                <div className={styles.reviewRow}>
                  {reviews.slice(0, 3).map((review) => <TestimonialCard key={review.name} {...review} />)}
                </div>
              </section>
            </div>
          )}

          {activeTab === '포트폴리오' && (
            <div className={styles.portfolioGrid}>
              {[...projects, ...projects].slice(0, 8).map((project, index) => (
                <PortfolioCard key={`${project.title}-${index}`} imageOnly title={project.title} languages={[talent.locale]} category={project.category} tags={[project.category]} image={project.image} onOpen={(cardOrigin) => openProject(project, cardOrigin)} />
              ))}
            </div>
          )}

          {activeTab === '경력·크레딧' && (
            <ul className={styles.careerList}>
              {[...career, ...career].slice(0, 8).map((item, index) => (
                <li key={`${item.year}-${item.title}-${index}`}><span className={styles.careerYear}>{item.year}</span><span>{item.title}</span><span className={styles.careerRole}>{item.role}</span></li>
              ))}
            </ul>
          )}

          {activeTab === '고객사 리뷰' && (
            <div>
              <div className={styles.reviewToolbar}>
                <span>전체 <strong>{reviews.length}</strong></span>
                <FilterDropdown label="정렬" options={[...reviewSortOptions]} selected={[reviewSort]} onSelect={(option) => setReviewSort(option as (typeof reviewSortOptions)[number])} />
              </div>
              <div className={styles.reviewGrid}>
                {sortedReviews.map((review) => <TestimonialCard key={review.name} {...review} />)}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      {selectedProject && origin && <PortfolioDetail item={selectedProject} origin={origin} onClose={() => setSelectedProject(null)} />}
    </main>
  );
}
