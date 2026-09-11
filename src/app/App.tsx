import { useEffect, useState } from 'react';
import { DesignSystemLayout } from './DesignSystemLayout';
import { TypographyPage } from '../pages/Typography/TypographyPage';
import { ColorsPage } from '../pages/Colors/ColorsPage';
import { ComponentsPage } from '../pages/Components/ComponentsPage';
import { LayoutPage } from '../pages/Layout/LayoutPage';
import { TemplatesPage } from '../pages/Templates/TemplatesPage';
import { PortfolioPage } from '../pages/Portfolio/PortfolioPage';
import { VoiceSearchPage } from '../pages/VoiceSearch/VoiceSearchPage';
import { AIPage } from '../pages/AI/AIPage';
import { LoginPage } from '../pages/Login/LoginPage';
import { SignupPage } from '../pages/Signup/SignupPage';
import { ClientSignupPage } from '../pages/Signup/ClientSignupPage';
import { ExpertSignupPage } from '../pages/Signup/ExpertSignupPage';
import { VoiceActorDetailPage } from '../pages/VoiceActorDetail/VoiceActorDetailPage';
import { WorkInquiryPage } from '../pages/WorkInquiry/WorkInquiryPage';

/**
 * 고객용/개발용 분리는 호스트 이름이 아니라 빌드 타임 환경 변수(VITE_SITE_MODE)로 결정합니다.
 * Vercel 프로젝트별로 이 값을 다르게 설정하면, 같은 코드베이스에서 완전히 분리된 두 배포가 나옵니다.
 *   - provoice-website 프로젝트(고객용):  VITE_SITE_MODE=customer  → 디자인 시스템 문서 절대 노출 안 함
 *   - dev 브랜치 프리뷰(개발용):          값 미설정(기본)          → 상단에 디자인 시스템 메타 내비 항상 노출
 *
 * dev 프리뷰는 팀이 직접 열어볼 땐 디자인 시스템 문서가 보여야 하지만, VersionSwitcher의 VER 2를
 * 눌러 넘어온 고객에게는 보이면 안 됩니다. 같은 빌드를 두 방식으로 써야 하므로, 그 경우에만
 * URL에 ?mode=customer 런타임 오버라이드를 붙여 구분합니다 (VersionSwitcher.tsx 참고).
 */
const isCustomerHost =
  import.meta.env.VITE_SITE_MODE === 'customer' ||
  new URLSearchParams(window.location.search).get('mode') === 'customer';

const hashToPage: Record<string, string> = {
  '#client': 'client',
  '#portfolio': 'portfolio',
  '#voice-search': 'voice-search',
  '#ai': 'ai',
  '#login': 'login',
  '#signup': 'signup',
  '#work-inquiry': 'work-inquiry',
  '#colors': 'colors',
  '#layout': 'layout',
  '#typography': 'typography',
};

const getPage = () => {
  const hash = window.location.hash;
  if (hash.startsWith('#components')) return 'components';
  if (hash.startsWith('#templates')) return 'templates';
  if (hash.startsWith('#voice-actor/')) return 'voice-actor';
  if (hash === '#signup/client') return 'signup-client';
  if (hash === '#signup/expert') return 'signup-expert';
  return hashToPage[hash] ?? 'client';
};

const pageMetadata: Record<string, { title: string; description: string; noIndex?: boolean }> = {
  client: {
    title: 'PROVOICE | 글로벌 성우 더빙·번역',
    description: '전 세계 전문 성우 캐스팅부터 ISO 인증 번역, AI 하이브리드 더빙까지 제공하는 글로벌 보이스 프로덕션 PROVOICE입니다.',
  },
  portfolio: {
    title: '포트폴리오 | PROVOICE',
    description: 'PROVOICE가 제작한 글로벌 더빙, 번역, 보이스 프로덕션 프로젝트를 확인하세요.',
  },
  'voice-search': {
    title: '글로벌 성우 검색 | PROVOICE',
    description: '언어와 보이스 특성에 맞는 전문 성우를 검색하고 음성 샘플을 들어보세요.',
  },
  'voice-actor': {
    title: '성우 프로필 | PROVOICE',
    description: 'PROVOICE 전문 성우의 보이스 특성과 음성 샘플을 확인하세요.',
  },
  ai: {
    title: 'PROVOICE × AI | 하이브리드 성우 더빙',
    description: '계약된 전문 성우의 연기와 정식 라이선스 기반 AI 음성으로 더 많은 언어와 캐릭터를 효율적으로 제작하세요.',
  },
  login: { title: '로그인 | PROVOICE', description: 'PROVOICE 회원 로그인', noIndex: true },
  signup: { title: '회원가입 | PROVOICE', description: 'PROVOICE 회원가입', noIndex: true },
  'signup-client': { title: '의뢰인 회원가입 | PROVOICE', description: 'PROVOICE 의뢰인 회원가입', noIndex: true },
  'signup-expert': { title: '전문가 회원가입 | PROVOICE', description: 'PROVOICE 성우·번역가 전문가 회원가입', noIndex: true },
  'work-inquiry': { title: '작업 문의 | PROVOICE', description: 'PROVOICE에 더빙·번역 작업을 문의하세요.' },
};

const setMetaContent = (selector: string, content: string) => {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
};

/** 고객용/개발용 양쪽에서 동일하게 쓰는, 메타 내비 없이 그 자체로 완결된 독립 페이지들. */
function renderStandalonePage(page: string) {
  if (page === 'portfolio') return <PortfolioPage />;
  if (page === 'voice-search') return <VoiceSearchPage />;
  if (page === 'voice-actor') return <VoiceActorDetailPage />;
  if (page === 'ai') return <AIPage />;
  if (page === 'login') return <LoginPage />;
  if (page === 'signup') return <SignupPage />;
  if (page === 'signup-client') return <ClientSignupPage />;
  if (page === 'signup-expert') return <ExpertSignupPage />;
  if (page === 'work-inquiry') return <WorkInquiryPage />;
  return null;
}

export function App() {
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const updatePage = () => setPage(getPage());
    window.addEventListener('hashchange', updatePage);
    return () => window.removeEventListener('hashchange', updatePage);
  }, []);

  useEffect(() => {
    const metadata = pageMetadata[page] ?? pageMetadata.client;
    document.title = metadata.title;
    setMetaContent('meta[name="description"]', metadata.description);
    setMetaContent('meta[property="og:title"]', metadata.title);
    setMetaContent('meta[property="og:description"]', metadata.description);

    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = metadata.noIndex || !isCustomerHost ? 'noindex, nofollow' : 'index, follow';
  }, [page]);

  if (isCustomerHost) {
    return renderStandalonePage(page) ?? <LayoutPage />;
  }

  return (
    <DesignSystemLayout current={page}>
      {renderStandalonePage(page) ??
        (page === 'client' ? <LayoutPage />
          : page === 'colors' ? <ColorsPage />
          : page === 'components' ? <ComponentsPage />
          : page === 'templates' ? <TemplatesPage />
          : page === 'layout' ? <LayoutPage />
          : <TypographyPage />)}
    </DesignSystemLayout>
  );
}
