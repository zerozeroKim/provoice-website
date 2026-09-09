import { useEffect, useState, type ReactNode } from 'react';
import {
  AISection,
  GetStartedSection,
  HeroSection,
  PortfolioPageSection,
  PortfolioSection,
  ServiceSection,
  TalentDirectorySection,
  TalentFilterSection,
  TestimonialSection,
  TranslationSection,
} from '../../design-system';
import {
  heroStats,
  portfolioCards,
  portfolioTabs,
  reviewCards,
  serviceCards,
  supportLanguages,
  talentProfiles,
  translationRows,
} from '../../design-system/patterns/LandingSections';
import styles from './TemplatesPage.module.css';

const tabs = ['홈', '성우검색', '서비스', '포트폴리오', '번역', 'PROVOICE × AI'] as const;
type Tab = (typeof tabs)[number];

const getTabFromHash = (): Tab => {
  const requested = decodeURIComponent(window.location.hash.split('/')[1] ?? '');
  return tabs.find((tab) => tab === requested) ?? '홈';
};

function TemplatePreview({ children, flush = false }: { children: ReactNode; flush?: boolean }) {
  return (
    <div className={styles.preview}>
      {!flush && <div className={styles.verticalSpace} aria-hidden="true" />}
      {children}
      {!flush && <div className={styles.verticalSpace} aria-hidden="true" />}
    </div>
  );
}

export function TemplatesPage() {
  const [activeTab, setActiveTab] = useState<Tab>(getTabFromHash);

  useEffect(() => {
    const syncTab = () => setActiveTab(getTabFromHash());
    window.addEventListener('hashchange', syncTab);
    return () => window.removeEventListener('hashchange', syncTab);
  }, []);

  return (
    <main className={styles.page}>
      <nav className={styles.tabs} aria-label="GNB 항목별 템플릿">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={activeTab === tab ? styles.active : ''}
            onClick={() => { setActiveTab(tab); window.location.hash = `templates/${tab}`; }}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === '홈' && (
        <div className={styles.list}>
          <TemplatePreview flush><HeroSection stats={heroStats} /></TemplatePreview>
          <TemplatePreview><TestimonialSection testimonials={reviewCards} /></TemplatePreview>
          <TemplatePreview><GetStartedSection /></TemplatePreview>
        </div>
      )}

      {activeTab === '성우검색' && (
        <div className={styles.list}>
          <TemplatePreview flush><TalentDirectorySection talents={talentProfiles} /></TemplatePreview>
          <TemplatePreview><TalentFilterSection talents={talentProfiles} /></TemplatePreview>
        </div>
      )}

      {activeTab === '서비스' && (
        <div className={styles.list}>
          <TemplatePreview flush><ServiceSection services={serviceCards} /></TemplatePreview>
        </div>
      )}

      {activeTab === '포트폴리오' && (
        <div className={styles.list}>
          <TemplatePreview flush><PortfolioSection tabs={portfolioTabs} cards={portfolioCards} /></TemplatePreview>
          <TemplatePreview><PortfolioPageSection tabs={portfolioTabs} cards={portfolioCards} /></TemplatePreview>
        </div>
      )}

      {activeTab === '번역' && (
        <div className={styles.list}>
          <TemplatePreview flush><TranslationSection rows={translationRows} languages={supportLanguages} /></TemplatePreview>
        </div>
      )}

      {activeTab === 'PROVOICE × AI' && (
        <div className={styles.list}>
          <TemplatePreview flush><AISection /></TemplatePreview>
        </div>
      )}
    </main>
  );
}
