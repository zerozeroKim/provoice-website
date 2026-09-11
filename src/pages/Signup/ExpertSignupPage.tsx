import { useRef, useState, type FormEvent } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { Checkbox, GNB, Select, Stepper, TextField, ToggleGroup } from '@/design-system';
import styles from './ExpertSignupPage.module.css';

const steps = ['기본 정보 입력 1', '기본 정보 입력 2'] as const;
const years = Array.from({ length: 80 }, (_, index) => 2015 - index);
const months = Array.from({ length: 12 }, (_, index) => index + 1);
const days = Array.from({ length: 31 }, (_, index) => index + 1);
const languageOptions = ['한국어', '영어', '일본어', '중국어', '스페인어', '아랍어', '베트남어', '인도네시아어', '태국어', '프랑스어', '독일어'];

type Step1Errors = Partial<Record<'email' | 'password' | 'passwordConfirm' | 'name' | 'phone' | 'profileImage' | 'terms', string>>;

export function ExpertSignupPage() {
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
    if (!email.trim()) nextErrors.email = '이메일을 입력해 주세요.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = '올바른 이메일 형식이 아닙니다.';
    if (!password) nextErrors.password = '비밀번호를 입력해 주세요.';
    else if (password.length < 8) nextErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    if (passwordConfirm !== password) nextErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    if (!name.trim()) nextErrors.name = '이름을 입력해 주세요.';
    if (!phone.trim()) nextErrors.phone = '연락처를 입력해 주세요.';
    if (!profileImageName) nextErrors.profileImage = '프로필 이미지를 등록해 주세요.';
    if (!agreePrivacy) nextErrors.terms = '개인정보처리방침에 동의해 주세요.';
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
        <a className={styles.backLink} href="#signup"><ArrowLeft size={16} /> 가입 유형 다시 선택</a>
        <h1 className={styles.title}>전문가로 가입</h1>

        <Stepper steps={steps} currentIndex={step} />

        {step === 0 && (
          <form className={styles.form} onSubmit={goToStep2} noValidate>
            <h2 className={styles.stepTitle}>기본 정보 입력 1</h2>
            <div>
              <span className={styles.fieldLabel}>이메일 <i>*</i></span>
              <TextField label="이메일" hideLabel type="email" placeholder="이메일을 입력해 주세요" value={email} onChange={(event) => setEmail(event.target.value)} error={step1Errors.email} />
            </div>
            <div>
              <span className={styles.fieldLabel}>비밀번호 <i>*</i></span>
              <TextField label="비밀번호" hideLabel type="password" placeholder="비밀번호를 입력해 주세요" value={password} onChange={(event) => setPassword(event.target.value)} error={step1Errors.password} />
              <div className={styles.fieldGap}>
                <TextField label="비밀번호 확인" hideLabel type="password" placeholder="비밀번호를 한번 더 입력해 주세요" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} error={step1Errors.passwordConfirm} />
              </div>
            </div>
            <div>
              <span className={styles.fieldLabel}>이름 <i>*</i></span>
              <TextField label="이름" hideLabel placeholder="이름을 입력해 주세요" value={name} onChange={(event) => setName(event.target.value)} error={step1Errors.name} />
            </div>
            <div>
              <span className={styles.fieldLabel}>연락처(핸드폰) <i>*</i></span>
              <TextField label="연락처" hideLabel type="tel" placeholder="'-' 없이 숫자만 입력하세요." value={phone} onChange={(event) => setPhone(event.target.value)} error={step1Errors.phone} />
            </div>

            <div>
              <span className={styles.fieldLabel}>프로필 이미지 <i>*</i></span>
              <button type="button" className={styles.fileDropzone} onClick={() => fileInputRef.current?.click()}>
                <span className={styles.fileIcon}><Upload size={18} /></span>
                <span className={profileImageName ? styles.fileNameSet : styles.fileNamePlaceholder}>{profileImageName || '파일을 선택해 주세요'}</span>
                <span className={styles.fileCta}>파일 선택</span>
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={(event) => setProfileImageName(event.target.files?.[0]?.name ?? '')} />
              {step1Errors.profileImage && <p className={styles.fieldError}>{step1Errors.profileImage}</p>}
            </div>

            <div>
              <span className={styles.fieldLabel}>전문 분야</span>
              <ToggleGroup options={['성우', '번역가'] as const} value={role} onChange={setRole} ariaLabel="전문 분야" />
            </div>

            <div>
              <span className={styles.fieldLabel}>경력</span>
              <textarea className={styles.textarea} placeholder="자유롭게 경력 입력 해주세요" value={career} onChange={(event) => setCareer(event.target.value)} />
            </div>

            <div>
              <Checkbox label="개인정보처리 방침에 동의합니다." checked={agreePrivacy} onChange={(event) => setAgreePrivacy(event.target.checked)} />
              {step1Errors.terms && <p className={styles.fieldError}>{step1Errors.terms}</p>}
            </div>

            <div className={styles.stepFooter}>
              <span />
              <button type="submit" className={styles.nextButton}>다음</button>
            </div>
          </form>
        )}

        {step === 1 && (
          <form className={styles.form} onSubmit={submit} noValidate>
            <h2 className={styles.stepTitle}>기본 정보 입력 2</h2>

            <div>
              <span className={styles.fieldLabel}>언어 <i>*</i></span>
              <Select aria-label="언어" value={language} onChange={(event) => setLanguage(event.target.value)}>
                <option value="">언어를 선택하세요</option>
                {languageOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </Select>
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
              <span className={styles.fieldLabel}>국가 <em>(선택)</em></span>
              <TextField label="국가" hideLabel placeholder="국가를 입력해 주세요" value={country} onChange={(event) => setCountry(event.target.value)} />
            </div>

            <div>
              <span className={styles.fieldLabel}>견적 정보</span>
              <div className={styles.rateRow}>
                <div className={styles.rateField}>
                  <span>100단어 기준</span>
                  <div className={styles.rateInput}>
                    <input type="number" min={0} value={rateWords} onChange={(event) => setRateWords(Number(event.target.value))} />
                    <span>KRW</span>
                  </div>
                </div>
                <div className={styles.rateField}>
                  <span>A4 1장</span>
                  <div className={styles.rateInput}>
                    <input type="number" min={0} value={ratePage} onChange={(event) => setRatePage(Number(event.target.value))} />
                    <span>KRW</span>
                  </div>
                </div>
              </div>
              <Checkbox label="협상 가능" checked={negotiable} onChange={(event) => setNegotiable(event.target.checked)} className={styles.negotiable} />
            </div>

            <div>
              <span className={styles.fieldLabel}>작업 기간</span>
              <ToggleGroup options={['1일', '일반 2~3일'] as const} value={turnaround} onChange={setTurnaround} ariaLabel="작업 기간" />
            </div>

            <div className={styles.stepFooter}>
              <button type="button" className={styles.prevButton} onClick={() => setStep(0)}><ArrowLeft size={14} /> 이전</button>
              <button type="submit" className={styles.submitButton}>가입하기</button>
            </div>
          </form>
        )}
      </div>
      </div>
    </main>
  );
}
