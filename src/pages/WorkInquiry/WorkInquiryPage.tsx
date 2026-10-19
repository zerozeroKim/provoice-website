import { useRef, useState, type FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { Checkbox, Footer, GNB, TextField } from '@/design-system';
import { useT } from '@/lib/i18n';
import styles from './WorkInquiryPage.module.css';

const serviceOptions = ['성우', '대본 번역', '원어민 검수', '대본 작성', '자막 추가', '사운드 BGM', '영상 편집'] as const;
const serviceLabelEn: Record<string, string> = { 성우: 'Voice Actor', '대본 번역': 'Script Translation', '원어민 검수': 'Native Review', '대본 작성': 'Script Writing', '자막 추가': 'Add Subtitles', '사운드 BGM': 'Sound/BGM', '영상 편집': 'Video Editing' };
const syncOptions = ['없음', '타임싱크', '립싱크'] as const;
const syncLabelEn: Record<string, string> = { 없음: 'None', 타임싱크: 'Time sync', 립싱크: 'Lip sync' };
const taxOptions = ['미발행', '발행'] as const;
const taxLabelEn: Record<string, string> = { 미발행: 'Not issued', 발행: 'Issued' };

type Errors = Partial<Record<'name' | 'company' | 'email' | 'phone' | 'message' | 'services' | 'terms', string>>;

export function WorkInquiryPage() {
  const t = useT();
  const [projectName, setProjectName] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [referenceVoice, setReferenceVoice] = useState<'mylist' | 'recommend'>('recommend');
  const [sync, setSync] = useState<(typeof syncOptions)[number]>('없음');
  const [taxInvoice, setTaxInvoice] = useState<(typeof taxOptions)[number]>('미발행');
  const [bizFileName, setBizFileName] = useState('');
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bizFileInputRef = useRef<HTMLInputElement>(null);

  const toggleService = (option: string) => {
    setServices((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Errors = {};
    if (!name.trim()) nextErrors.name = t('이름을 입력해 주세요.', 'Please enter your name.');
    if (!company.trim()) nextErrors.company = t('회사명을 입력해 주세요.', 'Please enter your company name.');
    if (!email.trim()) nextErrors.email = t('이메일을 입력해 주세요.', 'Please enter your email.');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = t('올바른 이메일 형식이 아닙니다.', 'Please enter a valid email address.');
    if (!phone.trim()) nextErrors.phone = t('연락처를 입력해 주세요.', 'Please enter your phone number.');
    if (!message.trim()) nextErrors.message = t('문의내용을 입력해 주세요.', 'Please enter your inquiry.');
    if (services.length === 0) nextErrors.services = t('서비스를 최소 1개 선택해 주세요.', 'Please select at least one service.');
    if (!agreePrivacy) nextErrors.terms = t('개인정보처리방침에 동의해 주세요.', 'Please agree to the privacy policy.');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className={styles.page}>
        <GNB />
        <div className={styles.content}>
          <div className={styles.doneCard}>
            <h1>{t('문의가 접수되었습니다', 'Your inquiry has been received')}</h1>
            <p>{t('담당자가 확인 후 입력하신 이메일 또는 연락처로 안내드릴게요.', "We'll review it and get back to you via the email or phone number you provided.")}</p>
            <a className={styles.doneLink} href="#client">{t('홈으로 돌아가기', 'Back to Home')}</a>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <GNB />
      <div className={styles.content}>
        <div className={styles.shell}>
          <h1 className={styles.title}>{t('작업 문의', 'Work Inquiry')}</h1>
          <p className={styles.subtitle}>{t('로그인 상태로 문의하시면 프로젝트 진행관리가 더 간편합니다.', 'Submitting while logged in makes project management easier.')} <a href="#login">{t('로그인', 'Log in')}</a></p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div>
              <span className={styles.fieldLabel}>{t('프로젝트명', 'Project Name')}</span>
              <TextField label={t('프로젝트명', 'Project Name')} hideLabel placeholder={t('프로젝트명을 입력해 주세요', 'Enter the project name')} value={projectName} onChange={(event) => setProjectName(event.target.value)} />
            </div>

            <div>
              <span className={styles.fieldLabel}>{t('이름', 'Name')} <i>*</i></span>
              <TextField label={t('이름', 'Name')} hideLabel placeholder={t('이름을 입력해 주세요', 'Enter your name')} value={name} onChange={(event) => setName(event.target.value)} error={errors.name} />
            </div>

            <div>
              <span className={styles.fieldLabel}>{t('회사명', 'Company Name')} <i>*</i></span>
              <TextField label={t('회사명', 'Company Name')} hideLabel placeholder={t('회사명을 입력해 주세요', 'Enter your company name')} value={company} onChange={(event) => setCompany(event.target.value)} error={errors.company} />
            </div>

            <div>
              <span className={styles.fieldLabel}>{t('이메일', 'Email')} <i>*</i></span>
              <TextField label={t('이메일', 'Email')} hideLabel type="email" placeholder={t('이메일을 입력해 주세요', 'Enter your email')} value={email} onChange={(event) => setEmail(event.target.value)} error={errors.email} />
            </div>

            <div>
              <span className={styles.fieldLabel}>{t('연락처(핸드폰)', 'Phone Number')} <i>*</i></span>
              <TextField label={t('연락처', 'Phone Number')} hideLabel type="tel" placeholder={t("'-' 없이 숫자만 입력하세요.", 'Enter digits only, no dashes.')} value={phone} onChange={(event) => setPhone(event.target.value)} error={errors.phone} />
            </div>

            <div>
              <span className={styles.fieldLabel}>{t('작업기한', 'Work Period')}</span>
              <div className={styles.dateRange}>
                <input type="date" aria-label={t('작업 시작일', 'Start date')} value={startDate} onChange={(event) => setStartDate(event.target.value)} />
                <span aria-hidden="true">~</span>
                <input type="date" aria-label={t('작업 종료일', 'End date')} value={endDate} onChange={(event) => setEndDate(event.target.value)} />
              </div>
            </div>

            <div>
              <span className={styles.fieldLabel}>{t('예산', 'Budget')}</span>
              <div className={styles.budgetInput}>
                <input type="number" min={0} placeholder={t('숫자로 기입해 주세요', 'Enter a number')} value={budget} onChange={(event) => setBudget(event.target.value)} />
                <span>KRW</span>
              </div>
            </div>

            <div>
              <span className={styles.fieldLabel}>{t('문의내용', 'Inquiry Details')} <i>*</i></span>
              <textarea className={styles.textarea} placeholder={t('문의내용', 'Inquiry details')} value={message} onChange={(event) => setMessage(event.target.value)} />
              {errors.message && <p className={styles.fieldError}>{errors.message}</p>}

              <div className={styles.fileRow}>
                <button type="button" className={styles.fileButton} onClick={() => fileInputRef.current?.click()}>{t('파일 선택', 'Choose File')}</button>
                <button type="button" className={styles.fileAdd} aria-label={t('파일 추가', 'Add file')} onClick={() => fileInputRef.current?.click()}><Plus size={16} /></button>
              </div>
              <input ref={fileInputRef} type="file" multiple hidden onChange={(event) => setFileNames(Array.from(event.target.files ?? []).map((file) => file.name))} />
              {fileNames.length > 0 && <ul className={styles.fileList}>{fileNames.map((name) => <li key={name}>{name}</li>)}</ul>}

              <ul className={styles.noteList}>
                <li>{t('자유롭게 기입해주세요.', 'Feel free to write anything relevant.')}</li>
                <li>{t('성우 언어, 한글 회사명/브랜드명 등 녹음시 주의해야할 용어 기재', 'Note the voice actor language, company/brand names, or any terms that need care during recording')}</li>
                <li>{t('그 외에 원하는 느낌이나 가이드 기입', 'Any other desired tone or guidance')}</li>
                <li>{t('파일 여러개일시 구글 드라이브 올려서 문의내용에 링크 공유 부탁합니다.', 'For multiple files, please upload to Google Drive and share the link in your inquiry.')}</li>
              </ul>
            </div>

            <div>
              <span className={styles.fieldLabel}>{t('서비스 선택 (최소 1개, 다중선택 가능)', 'Select services (at least 1, multiple allowed)')} <i>*</i></span>
              <div className={styles.serviceGrid}>
                {serviceOptions.map((option) => (
                  <button key={option} type="button" className={services.includes(option) ? styles.optionActive : styles.option} aria-pressed={services.includes(option)} onClick={() => toggleService(option)}>{t(option, serviceLabelEn[option])}</button>
                ))}
              </div>
              {errors.services && <p className={styles.fieldError}>{errors.services}</p>}
            </div>

            <div>
              <span className={styles.fieldLabel}>{t('레퍼런스 Voice', 'Reference Voice')}</span>
              <div className={styles.referenceRow}>
                <button type="button" className={referenceVoice === 'mylist' ? styles.optionActive : styles.option} aria-pressed={referenceVoice === 'mylist'} onClick={() => setReferenceVoice('mylist')}>{t('My Voice List 추가하기', 'Add from My Voice List')}</button>
                <button type="button" className={referenceVoice === 'recommend' ? styles.optionActive : styles.option} aria-pressed={referenceVoice === 'recommend'} onClick={() => setReferenceVoice('recommend')}>{t('추천 받음', 'Recommend for me')}</button>
              </div>
            </div>

            <div>
              <span className={styles.fieldLabel}>{t('싱크 선택', 'Sync Type')}</span>
              <div className={styles.syncGrid}>
                {syncOptions.map((option) => (
                  <button key={option} type="button" className={sync === option ? styles.optionActive : styles.option} aria-pressed={sync === option} onClick={() => setSync(option)}>{t(option, syncLabelEn[option])}</button>
                ))}
              </div>
              <ul className={styles.noteList}>
                <li>{t('싱크없음 (대본에 맞춰 정속도로 녹음)', 'None (recorded at a steady pace following the script)')}</li>
                <li>{t('타임싱크 (영상, 기계음 가이드에 맞춰 녹음)', 'Time sync (recorded to match video or a machine-voice guide)')}</li>
                <li>{t('영상에 나오는 인터뷰, 인물의 입모양에 맞춰서 녹음.', "Lip sync (recorded to match a speaker's mouth movement in the video)")}</li>
              </ul>
            </div>

            <div>
              <span className={styles.fieldLabel}>{t('세금계산서 발행 여부', 'Tax Invoice')}</span>
              <div className={styles.taxGrid}>
                {taxOptions.map((option) => (
                  <button key={option} type="button" className={taxInvoice === option ? styles.optionActive : styles.option} aria-pressed={taxInvoice === option} onClick={() => setTaxInvoice(option)}>{t(option, taxLabelEn[option])}</button>
                ))}
              </div>
              <p className={styles.note}>{t('- 발행시 견적서는 부가세 10%포함하여 진행되며, 미발행시 부가세 제외됩니다.', '- If issued, the quote includes 10% VAT; if not issued, VAT is excluded.')}</p>
            </div>

            <div>
              <span className={styles.fieldLabel}>{t('사업자등록증 첨부', 'Business Registration')}</span>
              <div className={styles.fileRow}>
                <button type="button" className={styles.fileButton} onClick={() => bizFileInputRef.current?.click()}>{bizFileName || t('파일 선택', 'Choose File')}</button>
                <button type="button" className={styles.fileAdd} aria-label={t('사업자등록증 첨부', 'Attach business registration')} onClick={() => bizFileInputRef.current?.click()}><Plus size={16} /></button>
              </div>
              <input ref={bizFileInputRef} type="file" hidden onChange={(event) => setBizFileName(event.target.files?.[0]?.name ?? '')} />
            </div>

            <div>
              <Checkbox label={t('개인정보처리 방침에 동의합니다.', 'I agree to the privacy policy.')} checked={agreePrivacy} onChange={(event) => setAgreePrivacy(event.target.checked)} />
              {errors.terms && <p className={styles.fieldError}>{errors.terms}</p>}
            </div>

            <button type="submit" className={styles.submit}>{t('작업 문의하기', 'Submit Inquiry')}</button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
