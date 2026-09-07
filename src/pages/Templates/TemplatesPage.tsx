import type { ReactNode } from 'react';
import { GetStartedSection, HeroSection, PortfolioSection, ServiceSection, TalentDirectorySection, TestimonialSection, TranslationSection } from '../../design-system';
import { heroStats, portfolioCards, portfolioTabs, reviewCards, serviceCards, supportLanguages, talentProfiles, translationRows } from '../../design-system/patterns/LandingSections';
import styles from './TemplatesPage.module.css';

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
  return (
    <main className={styles.page}>
      <div className={styles.list}>
        <TemplatePreview flush><HeroSection stats={heroStats} /></TemplatePreview>
        <TemplatePreview><TestimonialSection testimonials={reviewCards} /></TemplatePreview>
        <TemplatePreview><TalentDirectorySection talents={talentProfiles} /></TemplatePreview>
        <TemplatePreview><ServiceSection services={serviceCards} /></TemplatePreview>
        <TemplatePreview><PortfolioSection tabs={portfolioTabs} cards={portfolioCards} /></TemplatePreview>
        <TemplatePreview><TranslationSection rows={translationRows} languages={supportLanguages} /></TemplatePreview>
        <TemplatePreview><GetStartedSection /></TemplatePreview>
      </div>
    </main>
  );
}
