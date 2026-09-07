import { useState } from 'react';
import { currentDesignVersion, layoutVersions } from '@/app/version';
import {
  Footer,
  GetStartedSection,
  GNB,
  HeroSection,
  PortfolioSection,
  ServiceSection,
  TalentDirectorySection,
  TestimonialSection,
  TranslationSection,
  VersionBanner,
  heroStats,
  portfolioCards,
  portfolioTabs,
  reviewCards,
  serviceCards,
  supportLanguages,
  talentProfiles,
  translationRows,
} from '@/design-system';
import styles from './LayoutPage.module.css';

/** 최종 고객 화면: 디자인 시스템의 완성된 템플릿을 순서대로 조합합니다. */
export function LayoutPage() {
  const [versionId, setVersionId] = useState<(typeof layoutVersions)[number]['id']>(layoutVersions[0].id);
  const selectedVersion = layoutVersions.find((version) => version.id === versionId) ?? layoutVersions[0];
  const showVersionControl = window.location.hash === '#layout';
  const showCustomerVersion = window.location.hash === '#client';

  return (
    <main className={styles.page}>
      {showVersionControl && <div className={styles.versionBar}>
        <div className={styles.versionMeta}><span>LAYOUT VERSION</span><strong>{selectedVersion.label}</strong><i>{selectedVersion.status}</i></div>
        <div className={styles.versionControl}>
          <span>업데이트 {selectedVersion.date}</span>
          <label><span className={styles.visuallyHidden}>레이아웃 버전 선택</span><select value={versionId} onChange={(event) => setVersionId(event.target.value as (typeof layoutVersions)[number]['id'])}>{layoutVersions.map((version) => <option key={version.id} value={version.id}>{version.label}</option>)}</select></label>
        </div>
      </div>}
      <div className={styles.shell}>
        {showCustomerVersion && <VersionBanner version={currentDesignVersion.label} date={currentDesignVersion.date} />}
        <GNB />
        <HeroSection stats={heroStats} />
        <TestimonialSection testimonials={reviewCards} />
        <TalentDirectorySection talents={talentProfiles} />
        <ServiceSection services={serviceCards} />
        <PortfolioSection tabs={portfolioTabs} cards={portfolioCards} />
        <TranslationSection rows={translationRows} languages={supportLanguages} />
        <GetStartedSection />
        <Footer />
      </div>
    </main>
  );
}
