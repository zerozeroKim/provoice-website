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

/**
 * 고객용/개발용 분리는 호스트 이름이 아니라 빌드 타임 환경 변수(VITE_SITE_MODE)로 결정합니다.
 * Vercel 프로젝트별로 이 값을 다르게 설정하면, 같은 코드베이스에서 완전히 분리된 두 배포가 나옵니다.
 *   - provoice-website 프로젝트(고객용):  VITE_SITE_MODE=customer  → 디자인 시스템 문서 절대 노출 안 함
 *   - provoice-website-dev 프로젝트(개발용): 값 미설정(기본)        → 상단에 디자인 시스템 메타 내비 항상 노출
 */
const isCustomerHost = import.meta.env.VITE_SITE_MODE === 'customer';

const hashToPage: Record<string, string> = {
  '#client': 'client',
  '#portfolio': 'portfolio',
  '#voice-search': 'voice-search',
  '#ai': 'ai',
  '#login': 'login',
  '#signup': 'signup',
  '#colors': 'colors',
  '#layout': 'layout',
  '#typography': 'typography',
};

const getPage = () => {
  const hash = window.location.hash;
  if (hash.startsWith('#components')) return 'components';
  if (hash.startsWith('#templates')) return 'templates';
  return hashToPage[hash] ?? 'client';
};

/** 고객용/개발용 양쪽에서 동일하게 쓰는, 메타 내비 없이 그 자체로 완결된 독립 페이지들. */
function renderStandalonePage(page: string) {
  if (page === 'portfolio') return <PortfolioPage />;
  if (page === 'voice-search') return <VoiceSearchPage />;
  if (page === 'ai') return <AIPage />;
  if (page === 'login') return <LoginPage />;
  if (page === 'signup') return <SignupPage />;
  return null;
}

export function App() {
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const updatePage = () => setPage(getPage());
    window.addEventListener('hashchange', updatePage);
    return () => window.removeEventListener('hashchange', updatePage);
  }, []);

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
