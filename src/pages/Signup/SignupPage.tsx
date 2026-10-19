import { IdCard, MessageSquareText } from 'lucide-react';
import { GNB } from '@/design-system';
import { useT } from '@/lib/i18n';
import styles from './SignupPage.module.css';

export function SignupPage() {
  const t = useT();
  return (
    <main className={styles.page}>
      <GNB />
      <div className={styles.content}>
        <div className={styles.shell}>
          <a className={styles.logo} href="#client" aria-label={t('PROVOICE 홈', 'PROVOICE Home')}><img src="/assets/provoice-logo.png" alt="PROVOICE" /></a>
          <h1 className={styles.title}>{t('프로보이스 회원가입', 'Sign Up for Provoice')}</h1>

          <div className={styles.choiceGrid}>
            <div className={styles.choiceColumn}>
              <span className={styles.choiceLabel}>{t('서비스를 의뢰하고 싶다면', 'If you want to request a service')}</span>
              <a className={styles.choiceCard} href="#signup/client">
                <span className={styles.choiceIcon}><MessageSquareText /></span>
                <strong>{t('의뢰인으로 가입', 'Sign Up as a Client')}</strong>
              </a>
            </div>
            <div className={styles.choiceColumn}>
              <span className={styles.choiceLabel}>{t('내 전문성으로 지원하고 싶다면', 'If you want to apply with your expertise')}</span>
              <a className={styles.choiceCard} href="#signup/expert">
                <span className={styles.choiceIcon}><IdCard /></span>
                <strong>{t('전문가로 가입', 'Sign Up as an Expert')}</strong>
              </a>
            </div>
          </div>

          <p className={styles.loginLink}>{t('이미 계정이 있으신가요?', 'Already have an account?')} <a href="#login">{t('로그인', 'Log in')}</a></p>
        </div>
      </div>
    </main>
  );
}
