import { useRef, useState, type FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { Checkbox, Footer, GNB, TextField } from '@/design-system';
import styles from './WorkInquiryPage.module.css';

const serviceOptions = ['성우', '대본 번역', '원어민 검수', '대본 작성', '자막 추가', '사운드 BGM', '영상 편집'] as const;
const syncOptions = ['없음', '타임싱크', '립싱크'] as const;
const taxOptions = ['미발행', '발행'] as const;

type Errors = Partial<Record<'name' | 'company' | 'email' | 'phone' | 'message' | 'services' | 'terms', string>>;

export function WorkInquiryPage() {
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
    if (!name.trim()) nextErrors.name = '이름을 입력해 주세요.';
    if (!company.trim()) nextErrors.company = '회사명을 입력해 주세요.';
    if (!email.trim()) nextErrors.email = '이메일을 입력해 주세요.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = '올바른 이메일 형식이 아닙니다.';
    if (!phone.trim()) nextErrors.phone = '연락처를 입력해 주세요.';
    if (!message.trim()) nextErrors.message = '문의내용을 입력해 주세요.';
    if (services.length === 0) nextErrors.services = '서비스를 최소 1개 선택해 주세요.';
    if (!agreePrivacy) nextErrors.terms = '개인정보처리방침에 동의해 주세요.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className={styles.page}>
        <GNB />
        <div className={styles.content}>
          <div className={styles.doneCard}>
            <h1>문의가 접수되었습니다</h1>
            <p>담당자가 확인 후 입력하신 이메일 또는 연락처로 안내드릴게요.</p>
            <a className={styles.doneLink} href="#client">홈으로 돌아가기</a>
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
          <h1 className={styles.title}>작업 문의</h1>
          <p className={styles.subtitle}>로그인 상태로 문의하시면 프로젝트 진행관리가 더 간편합니다. <a href="#login">로그인</a></p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div>
              <span className={styles.fieldLabel}>프로젝트명</span>
              <TextField label="프로젝트명" hideLabel placeholder="프로젝트명을 입력해 주세요" value={projectName} onChange={(event) => setProjectName(event.target.value)} />
            </div>

            <div>
              <span className={styles.fieldLabel}>이름 <i>*</i></span>
              <TextField label="이름" hideLabel placeholder="이름을 입력해 주세요" value={name} onChange={(event) => setName(event.target.value)} error={errors.name} />
            </div>

            <div>
              <span className={styles.fieldLabel}>회사명 <i>*</i></span>
              <TextField label="회사명" hideLabel placeholder="회사명을 입력해 주세요" value={company} onChange={(event) => setCompany(event.target.value)} error={errors.company} />
            </div>

            <div>
              <span className={styles.fieldLabel}>이메일 <i>*</i></span>
              <TextField label="이메일" hideLabel type="email" placeholder="이메일을 입력해 주세요" value={email} onChange={(event) => setEmail(event.target.value)} error={errors.email} />
            </div>

            <div>
              <span className={styles.fieldLabel}>연락처(핸드폰) <i>*</i></span>
              <TextField label="연락처" hideLabel type="tel" placeholder="'-' 없이 숫자만 입력하세요." value={phone} onChange={(event) => setPhone(event.target.value)} error={errors.phone} />
            </div>

            <div>
              <span className={styles.fieldLabel}>작업기한</span>
              <div className={styles.dateRange}>
                <input type="date" aria-label="작업 시작일" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
                <span aria-hidden="true">~</span>
                <input type="date" aria-label="작업 종료일" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
              </div>
            </div>

            <div>
              <span className={styles.fieldLabel}>예산</span>
              <div className={styles.budgetInput}>
                <input type="number" min={0} placeholder="숫자로 기입해 주세요" value={budget} onChange={(event) => setBudget(event.target.value)} />
                <span>KRW</span>
              </div>
            </div>

            <div>
              <span className={styles.fieldLabel}>문의내용 <i>*</i></span>
              <textarea className={styles.textarea} placeholder="문의내용" value={message} onChange={(event) => setMessage(event.target.value)} />
              {errors.message && <p className={styles.fieldError}>{errors.message}</p>}

              <div className={styles.fileRow}>
                <button type="button" className={styles.fileButton} onClick={() => fileInputRef.current?.click()}>파일 선택</button>
                <button type="button" className={styles.fileAdd} aria-label="파일 추가" onClick={() => fileInputRef.current?.click()}><Plus size={16} /></button>
              </div>
              <input ref={fileInputRef} type="file" multiple hidden onChange={(event) => setFileNames(Array.from(event.target.files ?? []).map((file) => file.name))} />
              {fileNames.length > 0 && <ul className={styles.fileList}>{fileNames.map((name) => <li key={name}>{name}</li>)}</ul>}

              <ul className={styles.noteList}>
                <li>자유롭게 기입해주세요.</li>
                <li>성우 언어, 한글 회사명/브랜드명 등 녹음시 주의해야할 용어 기재</li>
                <li>그 외에 원하는 느낌이나 가이드 기입</li>
                <li>파일 여러개일시 구글 드라이브 올려서 문의내용에 링크 공유 부탁합니다.</li>
              </ul>
            </div>

            <div>
              <span className={styles.fieldLabel}>서비스 선택 (최소 1개, 다중선택 가능) <i>*</i></span>
              <div className={styles.serviceGrid}>
                {serviceOptions.map((option) => (
                  <button key={option} type="button" className={services.includes(option) ? styles.optionActive : styles.option} aria-pressed={services.includes(option)} onClick={() => toggleService(option)}>{option}</button>
                ))}
              </div>
              {errors.services && <p className={styles.fieldError}>{errors.services}</p>}
            </div>

            <div>
              <span className={styles.fieldLabel}>레퍼런스 Voice</span>
              <div className={styles.referenceRow}>
                <button type="button" className={referenceVoice === 'mylist' ? styles.optionActive : styles.option} aria-pressed={referenceVoice === 'mylist'} onClick={() => setReferenceVoice('mylist')}>My Voice List 추가하기</button>
                <button type="button" className={referenceVoice === 'recommend' ? styles.optionActive : styles.option} aria-pressed={referenceVoice === 'recommend'} onClick={() => setReferenceVoice('recommend')}>추천 받음</button>
              </div>
            </div>

            <div>
              <span className={styles.fieldLabel}>싱크 선택</span>
              <div className={styles.syncGrid}>
                {syncOptions.map((option) => (
                  <button key={option} type="button" className={sync === option ? styles.optionActive : styles.option} aria-pressed={sync === option} onClick={() => setSync(option)}>{option}</button>
                ))}
              </div>
              <ul className={styles.noteList}>
                <li>싱크없음 (대본에 맞춰 정속도로 녹음)</li>
                <li>타임싱크 (영상, 기계음 가이드에 맞춰 녹음)</li>
                <li>영상에 나오는 인터뷰, 인물의 입모양에 맞춰서 녹음.</li>
              </ul>
            </div>

            <div>
              <span className={styles.fieldLabel}>세금계산서 발행 여부</span>
              <div className={styles.taxGrid}>
                {taxOptions.map((option) => (
                  <button key={option} type="button" className={taxInvoice === option ? styles.optionActive : styles.option} aria-pressed={taxInvoice === option} onClick={() => setTaxInvoice(option)}>{option}</button>
                ))}
              </div>
              <p className={styles.note}>- 발행시 견적서는 부가세 10%포함하여 진행되며, 미발행시 부가세 제외됩니다.</p>
            </div>

            <div>
              <span className={styles.fieldLabel}>사업자등록증 첨부</span>
              <div className={styles.fileRow}>
                <button type="button" className={styles.fileButton} onClick={() => bizFileInputRef.current?.click()}>{bizFileName || '파일 선택'}</button>
                <button type="button" className={styles.fileAdd} aria-label="사업자등록증 첨부" onClick={() => bizFileInputRef.current?.click()}><Plus size={16} /></button>
              </div>
              <input ref={bizFileInputRef} type="file" hidden onChange={(event) => setBizFileName(event.target.files?.[0]?.name ?? '')} />
            </div>

            <div>
              <Checkbox label="개인정보처리 방침에 동의합니다." checked={agreePrivacy} onChange={(event) => setAgreePrivacy(event.target.checked)} />
              {errors.terms && <p className={styles.fieldError}>{errors.terms}</p>}
            </div>

            <button type="submit" className={styles.submit}>작업 문의하기</button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
