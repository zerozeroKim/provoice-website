import { Footer, GNB, PortfolioPageSection, portfolioCards, portfolioTabs } from '@/design-system';
import styles from './PortfolioPage.module.css';

/** 포트폴리오 전용 페이지: 홈 섹션보다 많은 사례를 필터·검색과 함께 둘러볼 수 있습니다. */
export function PortfolioPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <GNB />
        <PortfolioPageSection tabs={portfolioTabs} cards={portfolioCards} />
        <Footer />
      </div>
    </main>
  );
}
