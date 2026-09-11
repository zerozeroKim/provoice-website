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

export function App() {
  const getPage = () => window.location.hash === '#client' ? 'client' : window.location.hash === '#portfolio' ? 'portfolio' : window.location.hash === '#voice-search' ? 'voice-search' : window.location.hash === '#ai' ? 'ai' : window.location.hash === '#colors' ? 'colors' : window.location.hash.startsWith('#components') ? 'components' : window.location.hash.startsWith('#templates') ? 'templates' : window.location.hash === '#layout' ? 'layout' : window.location.hash === '#typography' ? 'typography' : 'client';
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const updatePage = () => setPage(getPage());
    window.addEventListener('hashchange', updatePage);
    return () => window.removeEventListener('hashchange', updatePage);
  }, []);

  if (isCustomerHost) {
    if (page === 'portfolio') return <PortfolioPage />;
    if (page === 'voice-search') return <VoiceSearchPage />;
    if (page === 'ai') return <AIPage />;
    return <LayoutPage />;
  }

  return (
    <DesignSystemLayout current={page}>
      {page === 'client' ? <LayoutPage />
        : page === 'portfolio' ? <PortfolioPage />
        : page === 'voice-search' ? <VoiceSearchPage />
        : page === 'ai' ? <AIPage />
        : page === 'colors' ? <ColorsPage />
        : page === 'components' ? <ComponentsPage />
        : page === 'templates' ? <TemplatesPage />
        : page === 'layout' ? <LayoutPage />
        : <TypographyPage />}
    </DesignSystemLayout>
  );
}
