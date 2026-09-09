import { Footer, GNB, TalentDirectorySection, TalentFilterSection, talentProfiles } from '@/design-system';
import styles from './VoiceSearchPage.module.css';

/** 성우 검색 전용 페이지: 문장 검색 섹션과 필터 검색 섹션을 이어붙여 보여줍니다. */
export function VoiceSearchPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <GNB />
        <TalentDirectorySection talents={talentProfiles} />
        <TalentFilterSection talents={talentProfiles} />
        <Footer />
      </div>
    </main>
  );
}
