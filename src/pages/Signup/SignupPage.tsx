import { useState, type FormEvent } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button, Checkbox, TextField } from '@/design-system';
import styles from './SignupPage.module.css';

type Errors = Partial<Record<'email' | 'password' | 'passwordConfirm' | 'name' | 'terms', string>>;

export function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const allAgreed = agreeTerms && agreePrivacy && agreeMarketing;
  const toggleAll = (checked: boolean) => {
    setAgreeTerms(checked);
    setAgreePrivacy(checked);
    setAgreeMarketing(checked);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Errors = {};
    if (!email.trim()) nextErrors.email = '이메일을 입력해 주세요.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = '올바른 이메일 형식이 아닙니다.';
    if (!password) nextErrors.password = '비밀번호를 입력해 주세요.';
    else if (password.length < 8) nextErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    if (passwordConfirm !== password) nextErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    if (!name.trim()) nextErrors.name = '이름을 입력해 주세요.';
    if (!agreeTerms || !agreePrivacy) nextErrors.terms = '필수 약관에 동의해 주세요.';
    setErrors(nextErrors);
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <a className={styles.logo} href="#client" aria-label="PROVOICE 홈"><img src="/assets/provoice-logo.png" alt="PROVOICE" /></a>
        <h1 className={styles.title}>회원가입</h1>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <TextField label="이메일" hideLabel type="email" placeholder="이메일을 입력해 주세요" value={email} onChange={(event) => setEmail(event.target.value)} error={errors.email} />
          <TextField label="비밀번호" hideLabel type="password" placeholder="비밀번호를 입력해 주세요 (8자 이상)" value={password} onChange={(event) => setPassword(event.target.value)} error={errors.password} />
          <TextField label="비밀번호 확인" hideLabel type="password" placeholder="비밀번호를 한 번 더 입력해 주세요" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} error={errors.passwordConfirm} />
          <TextField label="이름" hideLabel placeholder="이름을 입력해 주세요" value={name} onChange={(event) => setName(event.target.value)} error={errors.name} />
          <TextField label="휴대폰 번호" hideLabel optional type="tel" placeholder="휴대폰 번호를 입력해 주세요" value={phone} onChange={(event) => setPhone(event.target.value)} />

          <div className={styles.terms}>
            <Checkbox label="전체 동의" checked={allAgreed} onChange={(event) => toggleAll(event.target.checked)} className={styles.termsAll} />
            <Checkbox label="[필수] 이용약관 동의" checked={agreeTerms} onChange={(event) => setAgreeTerms(event.target.checked)} />
            <Checkbox label="[필수] 개인정보 수집 및 이용 동의" checked={agreePrivacy} onChange={(event) => setAgreePrivacy(event.target.checked)} />
            <Checkbox label="[선택] 마케팅 정보 수신 동의" checked={agreeMarketing} onChange={(event) => setAgreeMarketing(event.target.checked)} />
            {errors.terms && <p className={styles.termsError}>{errors.terms}</p>}
          </div>

          <Button type="submit" size="lg" fullWidth className={styles.submit}>가입하기</Button>
        </form>

        <div className={styles.socialButtons}>
          <button type="button" className={styles.naverButton}>
            <span className={styles.socialIcon} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 4h5.05l4.15 6.06V4H19v16h-5.05L9.8 13.94V20H5V4Z" fill="currentColor" /></svg></span>
            네이버로 간편 가입하기
          </button>
          <button type="button" className={styles.kakaoButton}>
            <span className={styles.socialIcon} aria-hidden="true"><MessageCircle size={18} fill="currentColor" strokeWidth={0} /></span>
            카카오로 간편 가입하기
          </button>
        </div>

        <p className={styles.loginLink}>이미 계정이 있으신가요? <a href="#login">로그인</a></p>
      </div>
    </main>
  );
}
