import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Select, Footer, GNB, PortfolioCard, PortfolioDetail, TestimonialCard, talentProfiles } from '@/design-system';
import type { PortfolioItem, TalentProfile } from '@/design-system';
import { createDemoAudio } from '@/utils/demoAudio';
import styles from './VoiceActorDetailPage.module.css';
import { VoiceProfile } from './VoiceProfile';
import { ActivityFields } from './ActivityFields';

const tabs = ['프로필', '포트폴리오', '경력·크레딧', '고객사 리뷰'] as const;
const reviewSortOptions = ['최신순', '별점 높은순'] as const;

/** 실제 프로필 데이터가 없는 상태에서 IMDB 배우 페이지처럼 구성만 보여주기 위한 예시 데이터 풀. */
const projectPool = [
  { title: 'MMORPG 글로벌 더빙 프로젝트', category: '게임', image: 'radial-gradient(circle at 78% 18%, rgb(126 92 255 / .72), transparent 36%), radial-gradient(circle at 8% 88%, rgb(219 69 255 / .32), transparent 42%), linear-gradient(135deg, #17122f 0%, #34246d 52%, #5e39c6 100%)', link: 'https://provoice.co.kr/portfolio/mmorpg-global', wavAttached: true, audioSrc: createDemoAudio(1), tags: ['드라마틱', '진중한'] },
  { title: '극장판 애니메이션 다국어 더빙', category: '애니메이션', image: 'radial-gradient(circle at 82% 16%, rgb(244 111 255 / .62), transparent 35%), radial-gradient(circle at 12% 92%, rgb(101 72 255 / .4), transparent 44%), linear-gradient(140deg, #241333 0%, #5b267a 54%, #9c45d0 100%)', link: undefined, wavAttached: true, audioSrc: createDemoAudio(2), tags: ['감성적인', '차분한', '진중한'] },
  { title: '인기 웹툰 시리즈 오디오드라마화', category: '웹툰', image: 'radial-gradient(circle at 82% 15%, rgb(83 203 255 / .55), transparent 36%), radial-gradient(circle at 12% 88%, rgb(120 75 255 / .42), transparent 42%), linear-gradient(135deg, #101d38 0%, #243f78 55%, #3d68bd 100%)', link: 'https://provoice.co.kr/portfolio/webtoon-audiodrama', wavAttached: true, audioSrc: createDemoAudio(3), tags: ['재밌는', '밝은'] },
  { title: '글로벌 브랜드 TV 광고 내레이션', category: '광고', image: 'radial-gradient(circle at 80% 18%, rgb(255 133 160 / .58), transparent 36%), radial-gradient(circle at 8% 90%, rgb(132 72 255 / .28), transparent 44%), linear-gradient(135deg, #341629 0%, #71314d 54%, #b6576c 100%)', link: undefined, wavAttached: true, audioSrc: createDemoAudio(4), tags: ['자신감', '친근한'] },
  { title: '모바일 게임 NPC 다국어 대사', category: '게임', image: 'radial-gradient(circle at 82% 15%, rgb(68 222 190 / .55), transparent 36%), radial-gradient(circle at 10% 88%, rgb(108 73 255 / .34), transparent 43%), linear-gradient(135deg, #112b32 0%, #1d5960 55%, #348f82 100%)', link: 'https://provoice.co.kr/portfolio/mobile-npc', wavAttached: true, audioSrc: createDemoAudio(5), tags: ['귀여운', '재밌는'] },
  { title: 'OTT 오리지널 시리즈 보이스 하이브리드', category: '더빙', image: 'radial-gradient(circle at 82% 16%, rgb(198 82 255 / .68), transparent 37%), radial-gradient(circle at 8% 90%, rgb(54 116 255 / .34), transparent 43%), linear-gradient(135deg, #171329 0%, #3b2465 52%, #6f36ad 100%)', link: undefined, wavAttached: true, audioSrc: createDemoAudio(6), tags: ['자연스러운', '진중한'] },
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
  const career = [...careerPool].sort((a, b) => Number(b.year) - Number(a.year));
  const reviews = [...reviewPool.slice(seed % reviewPool.length), ...reviewPool.slice(0, seed % reviewPool.length)];
  const sortedReviews = reviewSort === '별점 높은순' ? [...reviews].sort((a, b) => b.rating - a.rating) : reviews;

  const openProject = (project: (typeof projectPool)[number], cardOrigin: DOMRect) => {
    setOrigin(cardOrigin);
    setSelectedProject({ category: project.category, title: project.title, languages: [talent.locale], tone: project.category, tags: [...project.tags], image: project.image, link: project.link, wavAttached: project.wavAttached, audioSrc: project.audioSrc });
  };

  return (
    <main className={styles.page}>
      <GNB />
      <div className={styles.shell}>
        <a className={styles.backLink} href="#voice-search"><ArrowLeft size={16} /> 성우검색으로</a>

        <VoiceProfile talent={talent} rating={reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length} />

        <nav className={styles.tabBar} aria-label="성우 상세 탭">
          {tabs.map((tab) => (
            <button key={tab} type="button" className={tab === activeTab ? styles.tabActive : ''} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </nav>

        <div className={styles.tabBody}>
          {activeTab === '프로필' && (
            <div className={styles.profileGrid}>
              <section className={styles.tabPanel}>
                <div className={styles.sectionHead}>
                  <h2>대표 프로젝트</h2>
                  <button type="button" className={styles.viewAllLink} onClick={() => setActiveTab('포트폴리오')}>전체보기 <ArrowRight size={14} /></button>
                </div>
                <div className={styles.projectRow}>
                  {projects.slice(0, 3).map((project) => (
                    <PortfolioCard key={project.title} imageOnly title={project.title} languages={[talent.locale]} category={project.category} tags={[...project.tags]} image={project.image} audioSrc={project.audioSrc} onOpen={(cardOrigin) => openProject(project, cardOrigin)} />
                  ))}
                </div>
              </section>
              <div className={styles.detailsRow}>
              <section className={styles.tabPanel}>
                <h2>주요경력</h2>
                <ul className={styles.careerList}>
                  {career.slice(0, 3).map((item) => (
                    <li key={`${item.year}-${item.title}`}><span className={styles.careerYear}>{item.year}</span><span className={styles.careerTitle}>{item.title}</span><span className={styles.careerRole}>{item.role}</span></li>
                  ))}
                </ul>
              </section>
              <ActivityFields tags={talent.tags} />
              </div>
              <section className={styles.tabPanel}>
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
            <div className={`${styles.tabPanel} ${styles.portfolioGrid}`}>
              {[...projects, ...projects].slice(0, 9).map((project, index) => (
                <PortfolioCard key={`${project.title}-${index}`} imageOnly title={project.title} languages={[talent.locale]} category={project.category} tags={[...project.tags]} image={project.image} audioSrc={project.audioSrc} onOpen={(cardOrigin) => openProject(project, cardOrigin)} />
              ))}
            </div>
          )}

          {activeTab === '경력·크레딧' && (
            <ul className={`${styles.tabPanel} ${styles.careerList}`}>
              {career.map((item, index) => (
                <li key={`${item.year}-${item.title}-${index}`}><span className={styles.careerYear}>{item.year}</span><span className={styles.careerTitle}>{item.title}</span><span className={styles.careerRole}>{item.role}</span></li>
              ))}
            </ul>
          )}

          {activeTab === '고객사 리뷰' && (
            <div>
              <div className={styles.reviewToolbar}>
                <span>전체 <strong>{reviews.length}</strong></span>
                <Select className={styles.reviewSort} aria-label="리뷰 정렬" value={reviewSort} onChange={(event) => setReviewSort(event.target.value as (typeof reviewSortOptions)[number])}>
                  {reviewSortOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </Select>
              </div>
              <div className={`${styles.tabPanel} ${styles.reviewGrid}`}>
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
