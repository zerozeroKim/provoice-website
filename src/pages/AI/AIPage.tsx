import { Footer, GNB, AISection, VoicePreviewSection } from '@/design-system';
import styles from './AIPage.module.css';

/** PROVOICE × AI 전용 페이지: 홈 히어로처럼 배경 인터랙션 위에 소개 카피를 얹은 전체화면 섹션입니다. */
export function AIPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <GNB />
        <AISection />
        <VoicePreviewSection />
        <Footer />
      </div>
    </main>
  );
}
