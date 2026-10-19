import { useRef, useState, type FormEvent } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { Checkbox, GNB, Select, Stepper, TextField, ToggleGroup } from '@/design-system';
import { useLanguage, useT } from '@/lib/i18n';
import styles from './ExpertSignupPage.module.css';

const years = Array.from({ length: 80 }, (_, index) => 2015 - index);
const months = Array.from({ length: 12 }, (_, index) => index + 1);
const days = Array.from({ length: 31 }, (_, index) => index + 1);
const languageOptionPairs = [
  { ko: '한국어', en: 'Korean' }, { ko: '영어', en: 'English' }, { ko: '일본어', en: 'Japanese' }, { ko: '중국어', en: 'Chinese' },
  { ko: '스페인어', en: 'Spanish' }, { ko: '아랍어', en: 'Arabic' }, { ko: '베트남어', en: 'Vietnamese' }, { ko: '인도네시아어', en: 'Indonesian' },
  { ko: '태국어', en: 'Thai' }, { ko: '프랑스어', en: 'French' }, { ko: '독일어', en: 'German' },
];
const roleLabelEn: Record<string, string> = { 성우: 'Voice Actor', 번역가: 'Translator' };
const turnaroundLabelEn: Record<string, string> = { '1일': '1 day', '일반 2~3일': 'Standard 2-3 days' };

type Step1Errors = Partial<Record<'email' | 'password' | 'passwordConfirm' | 'name' | 'phone' | 'profileImage' | 'terms', string>>;

export function ExpertSignupPage() {
  const t = useT();
  const { language: uiLanguage } = useLanguage();
  const steps = uiLanguage === 'en' ? ['Basic Info 1', 'Basic Info 2'] : ['기본 정보 입력 1', '기본 정보 입력 2'];
  const languageOptions = languageOptionPairs.map((pair) => t(pair.ko, pair.en));
  const [step, setStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImageName, setProfileImageName] = useState('');
  const [role, setRole] = useState<'성우' | '번역가'>('성우');
  const [career, setCareer] = useState('');
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [step1Errors, setStep1Errors] = useState<Step1Errors>({});

  const [language, setLanguage] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [rateWords, setRateWords] = useState(0);
  const [ratePage, setRatePage] = useState(0);
  const [negotiable, setNegotiable] = useState(false);
  const [turnaround, setTurnaround] = useState<'1일' | '일반 2~3일' | ''>('');

  const goToStep2 = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Step1Errors = {};
    if (!email.trim()) nextErrors.email = t('이메일을 입력해 주세요.', 'Please enter your email.');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = t('올바른 이메일 형식이 아닙니다.', 'Please enter a valid email address.');
    if (!password) nextErrors.password = t('비밀번호를 입력해 주세요.', 'Please enter a password.');
    else if (password.length < 8) nextErrors.password = t('비밀번호는 8자 이상이어야 합니다.', 'Password must be at least 8 characters.');
    if (passwordConfirm !== password) nextErrors.passwordConfirm = t('비밀번호가 일치하지 않습니다.', 'Passwords do not match.');
    if (!name.trim()) nextErrors.name = t('이름을 입력해 주세요.', 'Please enter your name.');
    if (!phone.trim()) nextErrors.phone = t('연락처를 입력해 주세요.', 'Please enter your phone number.');
    if (!profileImageName) nextErrors.profileImage = t('프로필 이미지를 등록해 주세요.', 'Please upload a profile image.');
    if (!agreePrivacy) nextErrors.terms = t('개인정보처리방침에 동의해 주세요.', 'Please agree to the privacy policy.');
    setStep1Errors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setStep(1);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className={styles.page}>
      <GNB />
      <div className={styles.content}>
      <div className={styles.card}>
        <a className={styles.backLink} href="#signup"><ArrowLeft size={16} /> {t('가입 유형 다시 선택', 'Choose sign-up type again')}</a>
        <h1 className={styles.title}>{t('전문가로 가입', 'Sign Up as an Expert')}</h1>

        <Stepper steps={steps} currentIndex={step} />

        {step === 0 && (
          <form className={styles.form} onSubmit={goToStep2} noValidate>
            <h2 className={styles.stepTitle}>{steps[0]}</h2>
            <div>
              <span className={styles.fieldLabel}>{t('이메일', 'Email')} <i>*</i></span>
              <TextField label={t('이메일', 'Email')} hideLabel type="email" placeholder={t('이메일을 입력해 주세요', 'Enter your email')} value={email} onChange={(event) => setEmail(event.target.value)} error={step1Errors.email} />
            </div>
            <div>
              <span className={styles.fieldLabel}>{t('비밀번호', 'Password')} <i>*</i></span>
              <TextField label={t('비밀번호', 'Password')} hideLabel type="password" placeholder={t('비밀번호를 입력해 주세요', 'Enter your password')} value={password} onChange={(event) => setPassword(event.target.value)} error={step1Errors.password} />
              <div className={styles.fieldGap}>
                <TextField label={t('비밀번호 확인', 'Confirm Password')} hideLabel type="password" placeholder={t('비밀번호를 한번 더 입력해 주세요', 'Enter your password again')} value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} error={step1Errors.passwordConfirm} />
              </div>
            </div>
            <div>
              <span className={styles.fieldLabel}>{t('이름', 'Name')} <i>*</i></span>
              <TextField label={t('이름', 'Name')} hideLabel placeholder={t('이름을 입력해 주세요', 'Enter your name')} value={name} onChange={(event) => setName(event.target.value)} error={step1Errors.name} />
            </div>
            <div>
              <span className={styles.fieldLabel}>{t('연락처(핸드폰)', 'Phone Number')} <i>*</i></span>
              <TextField label={t('연락처', 'Phone Number')} hideLabel type="tel" placeholder={t("'-' 없이 숫자만 입력하세요.", 'Enter digits only, no dashes.')} value={phone} onChange={(event) => setPhone(event.target.value)} error={step1Errors.phone} />
            </div>

            <div>
              <span className={styles.fieldLabel}>{t('프로필 이미지', 'Profile Image')} <i>*</i></span>
              <button type="button" className={styles.fileDropzone} onClick={() => fileInputRef.current?.click()}>
                <span className={styles.fileIcon}><Upload size={18} /></span>
                <span className={profileImageName ? styles.fileNameSet : styles.fileNamePlaceholder}>{profileImageName || t('파일을 선택해 주세요', 'Choose a file')}</span>
                <span className={styles.fileCta}>{t('파일 선택', 'Choose File')}</span>
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={(event) => setProfileImageName(event.target.files?.[0]?.name ?? '')} />
              {step1Errors.profileImage && <p className={styles.fieldError}>{step1Errors.profileImage}</p>}
            </div>

            <div>
              <span className={styles.fieldLabel}>{t('전문 분야', 'Specialty')}</span>
              <ToggleGroup options={['성우', '번역가'] as const} value={role} onChange={setRole} labelFor={(option) => t(option, roleLabelEn[option])} ariaLabel={t('전문 분야', 'Specialty')} />
            </div>

            <div>
              <span className={styles.fieldLabel}>{t('경력', 'Career')}</span>
              <textarea className={styles.textarea} placeholder={t('자유롭게 경력 입력 해주세요', 'Describe your career in your own words')} value={career} onChange={(event) => setCareer(event.target.value)} />
            </div>

            <div>
              <Checkbox label={t('개인정보처리 방침에 동의합니다.', 'I agree to the privacy policy.')} checked={agreePrivacy} onChange={(event) => setAgreePrivacy(event.target.checked)} />
              {step1Errors.terms && <p className={styles.fieldError}>{step1Errors.terms}</p>}
            </div>

            <div className={styles.stepFooter}>
              <span />
              <button type="submit" className={styles.nextButton}>{t('다음', 'Next')}</button>
            </div>
          </form>
        )}

        {step === 1 && (
          <form className={styles.form} onSubmit={submit} noValidate>
            <h2 className={styles.stepTitle}>{steps[1]}</h2>

            <div>
              <span className={styles.fieldLabel}>{t('언어', 'Language')} <i>*</i></span>
              <Select aria-label={t('언어', 'Language')} value={language} onChange={(event) => setLanguage(event.target.value)}>
                <option value="">{t('언어를 선택하세요', 'Select a language')}</option>
                {languageOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </Select>
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
              <span className={styles.fieldLabel}>{t('국가', 'Country')} <em>({t('선택', 'optional')})</em></span>
              <TextField label={t('국가', 'Country')} hideLabel placeholder={t('국가를 입력해 주세요', 'Enter your country')} value={country} onChange={(event) => setCountry(event.target.value)} />
            </div>

            <div>
              <span className={styles.fieldLabel}>{t('견적 정보', 'Rate Information')}</span>
              <div className={styles.rateRow}>
                <div className={styles.rateField}>
                  <span>{t('100단어 기준', 'Per 100 words')}</span>
                  <div className={styles.rateInput}>
                    <input type="number" min={0} value={rateWords} onChange={(event) => setRateWords(Number(event.target.value))} />
                    <span>KRW</span>
                  </div>
                </div>
                <div className={styles.rateField}>
                  <span>{t('A4 1장', 'Per A4 page')}</span>
                  <div className={styles.rateInput}>
                    <input type="number" min={0} value={ratePage} onChange={(event) => setRatePage(Number(event.target.value))} />
                    <span>KRW</span>
                  </div>
                </div>
              </div>
              <Checkbox label={t('협상 가능', 'Negotiable')} checked={negotiable} onChange={(event) => setNegotiable(event.target.checked)} className={styles.negotiable} />
            </div>

            <div>
              <span className={styles.fieldLabel}>{t('작업 기간', 'Turnaround Time')}</span>
              <ToggleGroup options={['1일', '일반 2~3일'] as const} value={turnaround} onChange={setTurnaround} labelFor={(option) => t(option, turnaroundLabelEn[option])} ariaLabel={t('작업 기간', 'Turnaround time')} />
            </div>

            <div className={styles.stepFooter}>
              <button type="button" className={styles.prevButton} onClick={() => setStep(0)}><ArrowLeft size={14} /> {t('이전', 'Back')}</button>
              <button type="submit" className={styles.submitButton}>{t('가입하기', 'Sign Up')}</button>
            </div>
          </form>
        )}
      </div>
      </div>
    </main>
  );
}
