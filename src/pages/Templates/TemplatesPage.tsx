import { useEffect, useState, type ReactNode } from 'react';
import {
  AIHumanSection,
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
  VoiceAIDataSection,
  VoicePreviewSection,
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

const tabs = ['홈', '성우검색', '서비스', '포트폴리오', 'PROVOICE × AI'] as const;
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
      <header className={styles.header}>
        <p className={styles.eyebrow}>DESIGN SYSTEM</p>
        <h1>페이지 템플릿</h1>
        <p>PROVOICE 고객 화면을 구성하는 공용 섹션과 페이지 구조입니다.</p>
      </header>
      <nav className={styles.tabs} aria-label="GNB 항목별 템플릿" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab}
            id={`template-tab-${tab}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`template-panel-${tab}`}
            className={activeTab === tab ? styles.active : ''}
            onClick={() => { setActiveTab(tab); window.location.hash = `templates/${tab}`; }}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === '홈' && (
        <section id="template-panel-홈" className={styles.list} role="tabpanel" aria-labelledby="template-tab-홈">
          <TemplatePreview flush><HeroSection stats={heroStats} headingLevel={2} /></TemplatePreview>
          <TemplatePreview><TestimonialSection testimonials={reviewCards} /></TemplatePreview>
          <TemplatePreview><GetStartedSection /></TemplatePreview>
        </section>
      )}

      {activeTab === '성우검색' && (
        <section id="template-panel-성우검색" className={styles.list} role="tabpanel" aria-labelledby="template-tab-성우검색">
          <TemplatePreview flush><TalentDirectorySection talents={talentProfiles} /></TemplatePreview>
          <TemplatePreview><TalentFilterSection talents={talentProfiles} /></TemplatePreview>
        </section>
      )}

      {activeTab === '서비스' && (
        <section id="template-panel-서비스" className={styles.list} role="tabpanel" aria-labelledby="template-tab-서비스">
          <TemplatePreview flush><ServiceSection services={serviceCards} /></TemplatePreview>
          <TemplatePreview><TranslationSection rows={translationRows} languages={supportLanguages} /></TemplatePreview>
        </section>
      )}

      {activeTab === '포트폴리오' && (
        <section id="template-panel-포트폴리오" className={styles.list} role="tabpanel" aria-labelledby="template-tab-포트폴리오">
          <TemplatePreview flush><PortfolioSection tabs={portfolioTabs} cards={portfolioCards} /></TemplatePreview>
          <TemplatePreview><PortfolioPageSection tabs={portfolioTabs} cards={portfolioCards} /></TemplatePreview>
        </section>
      )}

      {activeTab === 'PROVOICE × AI' && (
        <section id="template-panel-PROVOICE × AI" className={styles.list} role="tabpanel" aria-labelledby="template-tab-PROVOICE × AI">
          <TemplatePreview flush><AISection headingLevel={2} /></TemplatePreview>
          <TemplatePreview flush><VoicePreviewSection headingLevel={2} /></TemplatePreview>
          <TemplatePreview flush><AIHumanSection headingLevel={2} /></TemplatePreview>
          <TemplatePreview flush><VoiceAIDataSection headingLevel={2} /></TemplatePreview>
        </section>
      )}
    </main>
  );
}
