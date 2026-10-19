import { useLanguage, useT } from '@/lib/i18n';
import { ActionCard, SectionHeader } from '../../components';
import styles from './GetStartedSection.module.css';

const quickContactActions = [
  { label: '네이버', href: 'https://blog.naver.com/provoiceon', tone: 'naver' as const },
  { label: '카카오', href: 'https://pf.kakao.com/_xfNjDK', tone: 'kakao' as const },
];

export function GetStartedSection() {
  const t = useT();
  const { language } = useLanguage();
  const quickContactActionsLocalized = quickContactActions.map((action) => ({ ...action, label: action.tone === 'naver' ? t('네이버', 'Naver') : t('카카오', 'KakaoTalk') }));
  return (
    <section className={styles.getStartedSection} aria-label={t('지금 시작하기', 'Get started')}>
      <SectionHeader className={styles.getStartedHeader} eyebrow="GET STARTED" title={t('지금 시작하세요', 'Get started today')} />
      <div className={styles.getStartedGrid}>
        <ActionCard
          variant="gradient"
          title={t('프로젝트 의뢰하기', 'Start a Project')}
          description={language === 'en'
            ? <>Have content that needs translation or dubbing?<br />Your dedicated PM will guide you through pricing and scheduling within 24 hours.</>
            : <>번역·더빙이 필요한 콘텐츠가 있으신가요?<br />담당 PM이 24시간 내 견적과 일정을 안내합니다.</>}
          primaryAction={{ label: t('의뢰 문의 시작하기', 'Start Your Inquiry') }}
          secondaryLabel={t('빠른 문의', 'Quick Contact')}
          secondaryActions={quickContactActionsLocalized}
          className={styles.getStartedCard}
        />
        <ActionCard
          title={t('성우·번역가로 등록하기', 'Register as a Voice Actor or Translator')}
          description={language === 'en'
            ? <>Organize your portfolio in one place,<br />and meet new projects as a verified Provoice expert.</>
            : <>포트폴리오를 한 곳에 정리하고,<br />검증된 프로보이스 전문가로 새로운 프로젝트를 만나보세요.</>}
          primaryAction={{ label: t('전문가 등록하기', 'Register as an Expert') }}
          className={styles.getStartedCard}
        />
      </div>
    </section>
  );
}
