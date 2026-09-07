import { useEffect, useState } from 'react';
import { DesignSystemLayout } from './DesignSystemLayout';
import { TypographyPage } from '../pages/Typography/TypographyPage';
import { ColorsPage } from '../pages/Colors/ColorsPage';
import { ComponentsPage } from '../pages/Components/ComponentsPage';
import { LayoutPage } from '../pages/Layout/LayoutPage';
import { TemplatesPage } from '../pages/Templates/TemplatesPage';
import { PortfolioPage } from '../pages/Portfolio/PortfolioPage';
import { VoiceSearchPage } from '../pages/VoiceSearch/VoiceSearchPage';

export function App() {
  const getPage = () => window.location.hash === '#client' ? 'client' : window.location.hash === '#portfolio' ? 'portfolio' : window.location.hash === '#voice-search' ? 'voice-search' : window.location.hash === '#colors' ? 'colors' : window.location.hash.startsWith('#components') ? 'components' : window.location.hash.startsWith('#templates') ? 'templates' : window.location.hash === '#layout' ? 'layout' : 'typography';
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const updatePage = () => setPage(getPage());
    window.addEventListener('hashchange', updatePage);
    return () => window.removeEventListener('hashchange', updatePage);
  }, []);

  return (
    <DesignSystemLayout current={page}>
      {page === 'client' ? <LayoutPage />
        : page === 'portfolio' ? <PortfolioPage />
        : page === 'voice-search' ? <VoiceSearchPage />
        : page === 'colors' ? <ColorsPage />
        : page === 'components' ? <ComponentsPage />
        : page === 'templates' ? <TemplatesPage />
        : page === 'layout' ? <LayoutPage />
        : <TypographyPage />}
    </DesignSystemLayout>
  );
}
