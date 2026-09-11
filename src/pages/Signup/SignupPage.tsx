import { IdCard, MessageSquareText } from 'lucide-react';
import { GNB } from '@/design-system';
import styles from './SignupPage.module.css';

export function SignupPage() {
  return (
    <main className={styles.page}>
      <GNB />
      <div className={styles.content}>
        <div className={styles.shell}>
          <a className={styles.logo} href="#client" aria-label="PROVOICE 홈"><img src="/assets/provoice-logo.png" alt="PROVOICE" /></a>
          <h1 className={styles.title}>프로보이스 회원가입</h1>

          <div className={styles.choiceGrid}>
            <div className={styles.choiceColumn}>
              <span className={styles.choiceLabel}>서비스를 의뢰하고 싶다면</span>
              <a className={styles.choiceCard} href="#signup/client">
                <span className={styles.choiceIcon}><MessageSquareText /></span>
                <strong>의뢰인으로 가입</strong>
              </a>
            </div>
            <div className={styles.choiceColumn}>
              <span className={styles.choiceLabel}>내 전문성으로 지원하고 싶다면</span>
              <a className={styles.choiceCard} href="#signup/expert">
                <span className={styles.choiceIcon}><IdCard /></span>
                <strong>전문가로 가입</strong>
              </a>
            </div>
          </div>

          <p className={styles.loginLink}>이미 계정이 있으신가요? <a href="#login">로그인</a></p>
        </div>
      </div>
    </main>
  );
}
