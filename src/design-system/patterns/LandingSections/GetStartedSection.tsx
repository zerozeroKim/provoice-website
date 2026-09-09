import { ActionCard, SectionHeader } from '../../components';
import styles from './GetStartedSection.module.css';

const quickContactActions = [
  { label: '네이버', href: 'https://blog.naver.com/provoiceon', tone: 'naver' as const },
  { label: '카카오', href: 'https://pf.kakao.com/_xfNjDK', tone: 'kakao' as const },
];

export function GetStartedSection() {
  return (
    <section className={styles.getStartedSection} aria-label="지금 시작하기">
      <SectionHeader className={styles.getStartedHeader} eyebrow="GET STARTED" title="지금 시작하세요" />
      <div className={styles.getStartedGrid}>
        <ActionCard
          variant="gradient"
          title="프로젝트 의뢰하기"
          description={<>번역·더빙이 필요한 콘텐츠가 있으신가요?<br />담당 PM이 24시간 내 견적과 일정을 안내합니다.</>}
          primaryAction={{ label: '의뢰 문의 시작하기' }}
          secondaryLabel="빠른 문의"
          secondaryActions={quickContactActions}
          className={styles.getStartedCard}
        />
        <ActionCard
          title="성우·번역가로 등록하기"
          description={<>포트폴리오를 한 곳에 정리하고,<br />검증된 프로보이스 전문가로 새로운 프로젝트를 만나보세요.</>}
          primaryAction={{ label: '전문가 등록하기' }}
          secondaryLabel="간편 가입"
          secondaryActions={quickContactActions}
          className={styles.getStartedCard}
        />
      </div>
    </section>
  );
}
