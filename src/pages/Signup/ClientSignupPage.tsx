import { useState, type FormEvent } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Checkbox, GNB, Select, TextField, ToggleGroup } from '@/design-system';
import { useT } from '@/lib/i18n';
import styles from './ClientSignupPage.module.css';

const years = Array.from({ length: 80 }, (_, index) => 2015 - index);
const months = Array.from({ length: 12 }, (_, index) => index + 1);
const days = Array.from({ length: 31 }, (_, index) => index + 1);
const memberTypeLabelEn: Record<string, string> = { 개인회원: 'Individual', 기업회원: 'Business' };

type Errors = Partial<Record<'email' | 'password' | 'passwordConfirm' | 'name' | 'terms', string>>;

export function ClientSignupPage() {
  const t = useT();
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
    if (!email.trim()) nextErrors.email = t('이메일을 입력해 주세요.', 'Please enter your email.');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = t('올바른 이메일 형식이 아닙니다.', 'Please enter a valid email address.');
    if (!password) nextErrors.password = t('비밀번호를 입력해 주세요.', 'Please enter a password.');
    else if (password.length < 8) nextErrors.password = t('비밀번호는 8자 이상이어야 합니다.', 'Password must be at least 8 characters.');
    if (passwordConfirm !== password) nextErrors.passwordConfirm = t('비밀번호가 일치하지 않습니다.', 'Passwords do not match.');
    if (!name.trim()) nextErrors.name = t('이름을 입력해 주세요.', 'Please enter your name.');
    if (!agreePrivacy) nextErrors.terms = t('개인정보처리방침에 동의해 주세요.', 'Please agree to the privacy policy.');
    setErrors(nextErrors);
  };

  return (
    <main className={styles.page}>
      <GNB />
      <div className={styles.content}>
      <div className={styles.card}>
        <a className={styles.backLink} href="#signup"><ArrowLeft size={16} /> {t('가입 유형 다시 선택', 'Choose sign-up type again')}</a>
        <h1 className={styles.title}>{t('의뢰인으로 가입', 'Sign Up as a Client')}</h1>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div>
            <span className={styles.fieldLabel}>{t('이메일', 'Email')} <i>*</i></span>
            <TextField label={t('이메일', 'Email')} hideLabel type="email" placeholder={t('이메일을 입력해 주세요', 'Enter your email')} value={email} onChange={(event) => setEmail(event.target.value)} error={errors.email} />
          </div>
          <div>
            <span className={styles.fieldLabel}>{t('비밀번호', 'Password')} <i>*</i></span>
            <TextField label={t('비밀번호', 'Password')} hideLabel type="password" placeholder={t('비밀번호를 입력해 주세요', 'Enter your password')} value={password} onChange={(event) => setPassword(event.target.value)} error={errors.password} />
            <div className={styles.fieldGap}>
              <TextField label={t('비밀번호 확인', 'Confirm Password')} hideLabel type="password" placeholder={t('비밀번호를 한번 더 입력해 주세요', 'Enter your password again')} value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} error={errors.passwordConfirm} />
            </div>
          </div>
          <div>
            <span className={styles.fieldLabel}>{t('회사명', 'Company Name')} <em>({t('선택', 'optional')})</em></span>
            <TextField label={t('회사명', 'Company Name')} hideLabel placeholder={t('회사명을 입력해 주세요', 'Enter your company name')} value={company} onChange={(event) => setCompany(event.target.value)} />
          </div>
          <div>
            <span className={styles.fieldLabel}>{t('이름', 'Name')} <i>*</i></span>
            <TextField label={t('이름', 'Name')} hideLabel placeholder={t('이름을 입력해 주세요', 'Enter your name')} value={name} onChange={(event) => setName(event.target.value)} error={errors.name} />
          </div>
          <div>
            <span className={styles.fieldLabel}>{t('연락처(핸드폰)', 'Phone Number')} <em>({t('선택', 'optional')})</em></span>
            <TextField label={t('연락처', 'Phone Number')} hideLabel type="tel" placeholder={t("'-' 없이 숫자만 입력하세요.", 'Enter digits only, no dashes.')} value={phone} onChange={(event) => setPhone(event.target.value)} />
          </div>

          <div>
            <span className={styles.fieldLabel}>{t('생일 / 성별', 'Birthday / Gender')}</span>
            <div className={styles.birthRow}>
              <Select aria-label={t('출생 연도', 'Birth year')} value={birthYear} onChange={(event) => setBirthYear(event.target.value)}>
                <option value="">{t('연도', 'Year')}</option>
                {years.map((year) => <option key={year} value={year}>{year}</option>)}
              </Select>
              <Select aria-label={t('출생 월', 'Birth month')} value={birthMonth} onChange={(event) => setBirthMonth(event.target.value)}>
                <option value="">{t('월', 'Month')}</option>
                {months.map((month) => <option key={month} value={month}>{month}</option>)}
              </Select>
              <Select aria-label={t('출생 일', 'Birth day')} value={birthDay} onChange={(event) => setBirthDay(event.target.value)}>
                <option value="">{t('일', 'Day')}</option>
                {days.map((day) => <option key={day} value={day}>{day}</option>)}
              </Select>
              <Select aria-label={t('성별', 'Gender')} value={gender} onChange={(event) => setGender(event.target.value)}>
                <option value="">{t('성별', 'Gender')}</option>
                <option value="남성">{t('남성', 'Male')}</option>
                <option value="여성">{t('여성', 'Female')}</option>
              </Select>
            </div>
          </div>

          <div>
            <span className={styles.fieldLabel}>{t('회원 유형', 'Membership Type')}</span>
            <ToggleGroup options={['개인회원', '기업회원'] as const} value={memberType} onChange={setMemberType} labelFor={(option) => t(option, memberTypeLabelEn[option])} ariaLabel={t('회원 유형', 'Membership type')} />
          </div>

          <div>
            <span className={styles.fieldLabel}>{t('개인정보처리방침', 'Privacy Policy')}</span>
            <Checkbox label={t('개인정보처리 방침에 동의합니다.', 'I agree to the privacy policy.')} checked={agreePrivacy} onChange={(event) => setAgreePrivacy(event.target.checked)} />
            {errors.terms && <p className={styles.termsError}>{errors.terms}</p>}
          </div>

          <button type="submit" className={styles.submit}>{t('회원가입 완료', 'Complete Sign-up')}</button>
        </form>
      </div>
      </div>
    </main>
  );
}
