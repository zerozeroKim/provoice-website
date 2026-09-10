import { useState, type FormEvent } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button, TextField } from '@/design-system';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!email.trim()) nextErrors.email = '이메일을 입력해 주세요.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = '올바른 이메일 형식이 아닙니다.';
    if (!password) nextErrors.password = '비밀번호를 입력해 주세요.';
    else if (password.length < 8) nextErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    setErrors(nextErrors);
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <a className={styles.logo} href="#client" aria-label="PROVOICE 홈"><img src="/assets/provoice-logo.png" alt="PROVOICE" /></a>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <TextField
            label="이메일"
            hideLabel
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={errors.email}
          />
          <TextField
            label="비밀번호"
            hideLabel
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={errors.password}
          />
          <Button type="submit" size="lg" fullWidth className={styles.submit}>로그인</Button>
        </form>

        <a className={styles.findLink} href="#find-account" onClick={(event) => event.preventDefault()}>아이디/비밀번호 찾기</a>

        <div className={styles.socialButtons}>
          <button type="button" className={styles.naverButton}>
            <span className={styles.socialIcon} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 4h5.05l4.15 6.06V4H19v16h-5.05L9.8 13.94V20H5V4Z" fill="currentColor" /></svg></span>
            네이버 간편 로그인 / 가입하기
          </button>
          <button type="button" className={styles.kakaoButton}>
            <span className={styles.socialIcon} aria-hidden="true"><MessageCircle size={18} fill="currentColor" strokeWidth={0} /></span>
            카카오 간편 로그인 / 가입하기
          </button>
        </div>

        <a className={styles.signupButton} href="#signup">회원가입</a>
      </div>
    </main>
  );
}
