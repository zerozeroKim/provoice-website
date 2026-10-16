import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Breadcrumb, Footer, GNB, PortfolioCard, PortfolioDetail, talentProfiles } from '@/design-system';
import type { PortfolioItem, TalentProfile } from '@/design-system';
import { createDemoAudio } from '@/utils/demoAudio';
import styles from './VoiceActorDetailPage.module.css';
import { VoiceProfile } from './VoiceProfile';
import { ActivityFields } from './ActivityFields';

const tabs = ['프로필', '포트폴리오', '경력·크레딧'] as const;

/** 실제 프로필 데이터가 없는 상태에서 IMDB 배우 페이지처럼 구성만 보여주기 위한 예시 데이터 풀. */
const projectPool = [
  { title: 'MMORPG 글로벌 더빙 프로젝트', category: '게임', client: '레드문게임즈', image: 'radial-gradient(circle at 78% 18%, rgb(126 92 255 / .72), transparent 36%), radial-gradient(circle at 8% 88%, rgb(219 69 255 / .32), transparent 42%), linear-gradient(135deg, #17122f 0%, #34246d 52%, #5e39c6 100%)', link: 'https://provoice.co.kr/portfolio/mmorpg-global', wavAttached: true, audioSrc: createDemoAudio(1), tags: ['드라마틱', '진중한'] },
  { title: '극장판 애니메이션 다국어 더빙', category: '애니메이션', client: '블룸애니메이션', image: 'radial-gradient(circle at 82% 16%, rgb(244 111 255 / .62), transparent 35%), radial-gradient(circle at 12% 92%, rgb(101 72 255 / .4), transparent 44%), linear-gradient(140deg, #241333 0%, #5b267a 54%, #9c45d0 100%)', link: undefined, wavAttached: true, audioSrc: createDemoAudio(2), tags: ['감성적인', '차분한', '진중한'] },
  { title: '인기 웹툰 시리즈 오디오드라마화', category: '웹툰', client: '코믹플로우', image: 'radial-gradient(circle at 82% 15%, rgb(83 203 255 / .55), transparent 36%), radial-gradient(circle at 12% 88%, rgb(120 75 255 / .42), transparent 42%), linear-gradient(135deg, #101d38 0%, #243f78 55%, #3d68bd 100%)', link: 'https://provoice.co.kr/portfolio/webtoon-audiodrama', wavAttached: true, audioSrc: createDemoAudio(3), tags: ['재밌는', '밝은'] },
  { title: '글로벌 브랜드 TV 광고 내레이션', category: '광고', client: '브라이트애드컴퍼니', image: 'radial-gradient(circle at 80% 18%, rgb(255 133 160 / .58), transparent 36%), radial-gradient(circle at 8% 90%, rgb(132 72 255 / .28), transparent 44%), linear-gradient(135deg, #341629 0%, #71314d 54%, #b6576c 100%)', link: undefined, wavAttached: true, audioSrc: createDemoAudio(4), tags: ['자신감', '친근한'] },
  { title: '모바일 게임 NPC 다국어 대사', category: '게임', client: '노바인터랙티브', image: 'radial-gradient(circle at 82% 15%, rgb(68 222 190 / .55), transparent 36%), radial-gradient(circle at 10% 88%, rgb(108 73 255 / .34), transparent 43%), linear-gradient(135deg, #112b32 0%, #1d5960 55%, #348f82 100%)', link: 'https://provoice.co.kr/portfolio/mobile-npc', wavAttached: true, audioSrc: createDemoAudio(5), tags: ['귀여운', '재밌는'] },
  { title: 'OTT 오리지널 시리즈 보이스 하이브리드', category: '더빙', client: '문라이트스튜디오', image: 'radial-gradient(circle at 82% 16%, rgb(198 82 255 / .68), transparent 37%), radial-gradient(circle at 8% 90%, rgb(54 116 255 / .34), transparent 43%), linear-gradient(135deg, #171329 0%, #3b2465 52%, #6f36ad 100%)', link: undefined, wavAttached: true, audioSrc: createDemoAudio(6), tags: ['자연스러운', '진중한'] },
] as const;

/** 실제 데이터는 구조화 없이 한 칸의 텍스트로 입력되므로, 줄바꿈 단위로 쪼개 목록으로 보여줍니다. */
const careerText = `2026 · MMORPG 글로벌 더빙 프로젝트 — 메인 성우
2025 · 극장판 애니메이션 다국어 더빙 — 조연 캐릭터
2025 · 기업 홍보 영상 내레이션 — 내레이터
2024 · 오디오북 시리즈 — 낭독
2024 · 모바일 게임 NPC 다국어 대사 — 서브 캐릭터`;

const seedFromName = (name: string) => name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);

const getRequestedName = () => decodeURIComponent(window.location.hash.split('/')[1] ?? '');

export function VoiceActorDetailPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('프로필');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
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
  const careerLines = careerText.split('\n');

  const openProject = (project: (typeof projectPool)[number], cardOrigin: DOMRect) => {
    setOrigin(cardOrigin);
    setSelectedProject({ category: project.category, title: project.title, languages: [talent.locale], tone: project.category, tags: [...project.tags], client: project.client, image: project.image, link: project.link, wavAttached: project.wavAttached, audioSrc: project.audioSrc });
  };

  return (
    <main className={styles.page}>
      <GNB />
      <div className={styles.shell}>
        <Breadcrumb className={styles.breadcrumb} items={[{ label: 'HOME', href: '#client' }, { label: '성우검색', href: '#voice-search' }, { label: talent.name }]} />

        <VoiceProfile talent={talent} />

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
                    <PortfolioCard key={project.title} imageOnly title={project.title} languages={[talent.locale]} category={project.category} tags={[...project.tags]} client={project.client} image={project.image} audioSrc={project.audioSrc} onOpen={(cardOrigin) => openProject(project, cardOrigin)} />
                  ))}
                </div>
              </section>
              <div className={styles.detailsRow}>
              <section className={styles.tabPanel}>
                <h2>주요경력</h2>
                <ul className={`${styles.careerList} ${styles.careerListFlat}`}>
                  {careerLines.slice(0, 3).map((line) => <li key={line}>{line}</li>)}
                </ul>
              </section>
              <ActivityFields tags={talent.tags} />
              </div>
            </div>
          )}

          {activeTab === '포트폴리오' && (
            <div className={`${styles.tabPanel} ${styles.portfolioGrid}`}>
              {[...projects, ...projects].slice(0, 9).map((project, index) => (
                <PortfolioCard key={`${project.title}-${index}`} imageOnly title={project.title} languages={[talent.locale]} category={project.category} tags={[...project.tags]} client={project.client} image={project.image} audioSrc={project.audioSrc} onOpen={(cardOrigin) => openProject(project, cardOrigin)} />
              ))}
            </div>
          )}

          {activeTab === '경력·크레딧' && (
            <ul className={`${styles.tabPanel} ${styles.careerList} ${styles.careerListFlat}`}>
              {careerLines.map((line) => <li key={line}>{line}</li>)}
            </ul>
          )}
        </div>
      </div>
      <Footer />
      {selectedProject && origin && <PortfolioDetail item={selectedProject} origin={origin} onClose={() => setSelectedProject(null)} />}
    </main>
  );
}
