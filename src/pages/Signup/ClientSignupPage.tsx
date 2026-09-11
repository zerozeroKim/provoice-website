import { useState, type FormEvent } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Checkbox, GNB, Select, TextField, ToggleGroup } from '@/design-system';
import styles from './ClientSignupPage.module.css';

const years = Array.from({ length: 80 }, (_, index) => 2015 - index);
const months = Array.from({ length: 12 }, (_, index) => index + 1);
const days = Array.from({ length: 31 }, (_, index) => index + 1);

type Errors = Partial<Record<'email' | 'password' | 'passwordConfirm' | 'name' | 'terms', string>>;

export function ClientSignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [gender, setGender] = useState('');
  const [memberType, setMemberType] = useState<'개인회원' | '기업회원'>('개인회원');
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Errors = {};
    if (!email.trim()) nextErrors.email = '이메일을 입력해 주세요.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = '올바른 이메일 형식이 아닙니다.';
    if (!password) nextErrors.password = '비밀번호를 입력해 주세요.';
    else if (password.length < 8) nextErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    if (passwordConfirm !== password) nextErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    if (!name.trim()) nextErrors.name = '이름을 입력해 주세요.';
    if (!agreePrivacy) nextErrors.terms = '개인정보처리방침에 동의해 주세요.';
    setErrors(nextErrors);
  };

  return (
    <main className={styles.page}>
      <GNB />
      <div className={styles.content}>
      <div className={styles.card}>
        <a className={styles.backLink} href="#signup"><ArrowLeft size={16} /> 가입 유형 다시 선택</a>
        <h1 className={styles.title}>의뢰인으로 가입</h1>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div>
            <span className={styles.fieldLabel}>이메일 <i>*</i></span>
            <TextField label="이메일" hideLabel type="email" placeholder="이메일을 입력해 주세요" value={email} onChange={(event) => setEmail(event.target.value)} error={errors.email} />
          </div>
          <div>
            <span className={styles.fieldLabel}>비밀번호 <i>*</i></span>
            <TextField label="비밀번호" hideLabel type="password" placeholder="비밀번호를 입력해 주세요" value={password} onChange={(event) => setPassword(event.target.value)} error={errors.password} />
            <div className={styles.fieldGap}>
              <TextField label="비밀번호 확인" hideLabel type="password" placeholder="비밀번호를 한번 더 입력해 주세요" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} error={errors.passwordConfirm} />
            </div>
          </div>
          <div>
            <span className={styles.fieldLabel}>회사명 <em>(선택)</em></span>
            <TextField label="회사명" hideLabel placeholder="회사명을 입력해 주세요" value={company} onChange={(event) => setCompany(event.target.value)} />
          </div>
          <div>
            <span className={styles.fieldLabel}>이름 <i>*</i></span>
            <TextField label="이름" hideLabel placeholder="이름을 입력해 주세요" value={name} onChange={(event) => setName(event.target.value)} error={errors.name} />
          </div>
          <div>
            <span className={styles.fieldLabel}>연락처(핸드폰) <em>(선택)</em></span>
            <TextField label="연락처" hideLabel type="tel" placeholder="'-' 없이 숫자만 입력하세요." value={phone} onChange={(event) => setPhone(event.target.value)} />
          </div>

          <div>
            <span className={styles.fieldLabel}>생일 / 성별</span>
            <div className={styles.birthRow}>
              <Select aria-label="출생 연도" value={birthYear} onChange={(event) => setBirthYear(event.target.value)}>
                <option value="">연도</option>
                {years.map((year) => <option key={year} value={year}>{year}</option>)}
              </Select>
              <Select aria-label="출생 월" value={birthMonth} onChange={(event) => setBirthMonth(event.target.value)}>
                <option value="">월</option>
                {months.map((month) => <option key={month} value={month}>{month}</option>)}
              </Select>
              <Select aria-label="출생 일" value={birthDay} onChange={(event) => setBirthDay(event.target.value)}>
                <option value="">일</option>
                {days.map((day) => <option key={day} value={day}>{day}</option>)}
              </Select>
              <Select aria-label="성별" value={gender} onChange={(event) => setGender(event.target.value)}>
                <option value="">성별</option>
                <option value="남성">남성</option>
                <option value="여성">여성</option>
              </Select>
            </div>
          </div>

          <div>
            <span className={styles.fieldLabel}>회원 유형</span>
            <ToggleGroup options={['개인회원', '기업회원'] as const} value={memberType} onChange={setMemberType} ariaLabel="회원 유형" />
          </div>

          <div>
            <span className={styles.fieldLabel}>개인정보처리방침</span>
            <Checkbox label="개인정보처리 방침에 동의합니다." checked={agreePrivacy} onChange={(event) => setAgreePrivacy(event.target.checked)} />
            {errors.terms && <p className={styles.termsError}>{errors.terms}</p>}
          </div>

          <button type="submit" className={styles.submit}>회원가입 완료</button>
        </form>
      </div>
      </div>
    </main>
  );
}
