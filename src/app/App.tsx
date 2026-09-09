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

/** 이 호스트에서는 디자인 시스템 문서(Typography/Colors/Components/Templates)를 절대 노출하지 않고, 완성된 고객용 레이아웃만 보여줍니다. */
const CUSTOMER_HOSTNAMES = ['provoice-website.vercel.app', 'provoice-website-123412.vercel.app'];

export function App() {
  const isCustomerHost = CUSTOMER_HOSTNAMES.includes(window.location.hostname);
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
