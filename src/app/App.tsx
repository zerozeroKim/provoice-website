import { useEffect, useState } from 'react';
import { DesignSystemLayout } from './DesignSystemLayout';
import { TypographyPage } from '../pages/Typography/TypographyPage';
import { ColorsPage } from '../pages/Colors/ColorsPage';
import { ComponentsPage } from '../pages/Components/ComponentsPage';
import { LayoutPage } from '../pages/Layout/LayoutPage';
import { TemplatesPage } from '../pages/Templates/TemplatesPage';

export function App() {
  const getPage = () => window.location.hash === '#client' ? 'client' : window.location.hash === '#colors' ? 'colors' : window.location.hash.startsWith('#components') ? 'components' : window.location.hash === '#templates' ? 'templates' : window.location.hash === '#layout' ? 'layout' : 'typography';
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const updatePage = () => setPage(getPage());
    window.addEventListener('hashchange', updatePage);
    return () => window.removeEventListener('hashchange', updatePage);
  }, []);

  if (page === 'client') return <LayoutPage />;

  return (
    <DesignSystemLayout current={page}>
      {page === 'colors' ? <ColorsPage /> : page === 'components' ? <ComponentsPage /> : page === 'templates' ? <TemplatesPage /> : page === 'layout' ? <LayoutPage /> : <TypographyPage />}
    </DesignSystemLayout>
  );
}
