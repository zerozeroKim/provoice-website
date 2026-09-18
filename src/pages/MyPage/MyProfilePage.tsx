import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check, Pencil, Plus, RefreshCw, Trash2, Upload } from 'lucide-react';
import { Button, Chip, Footer, GNB, Modal, PortfolioCard, PortfolioDetail, Select, TextField, ToggleGroup } from '@/design-system';
import type { PortfolioItem } from '@/design-system';
import { isLoggedIn } from '@/lib/mockAuth';
import { AVATAR_POOL, createId, getMyProfile, saveMyProfile, type CareerEntry, type MyProfile, type PortfolioEntry } from '@/lib/mockProfile';
import detailStyles from '../VoiceActorDetail/VoiceActorDetailPage.module.css';
import heroStyles from '../VoiceActorDetail/VoiceProfile/VoiceProfile.module.css';
import styles from './MyProfilePage.module.css';

const tabs = ['포트폴리오', '경력·크레딧'] as const;
const languageOptions = ['한국어', '영어', '일본어', '중국어', '스페인어', '아랍어'];
const categoryOptions = ['내레이션', '광고', '캐릭터', '게임', '키즈', '더빙', '오디오북', '다큐'];
const toneOptions = ['자신감', '친근한', '차분한', '진중한', '귀여운', '밝은', '섹시한', '드라마틱'];
const portfolioCategoryOptions = ['게임', '애니메이션', '웹툰', '광고', '더빙', '오디오북', '기업홍보'];
const portfolioTagOptions = ['드라마틱', '진중한', '자신감', '친근한', '귀여운', '재밌는', '차분한', '감성적인', '자연스러운'];
const portfolioGradients = [
  'linear-gradient(135deg, #17122f 0%, #34246d 52%, #5e39c6 100%)',
  'linear-gradient(140deg, #241333 0%, #5b267a 54%, #9c45d0 100%)',
  'linear-gradient(135deg, #101d38 0%, #243f78 55%, #3d68bd 100%)',
  'linear-gradient(135deg, #341629 0%, #71314d 54%, #b6576c 100%)',
  'linear-gradient(135deg, #112b32 0%, #1d5960 55%, #348f82 100%)',
  'linear-gradient(135deg, #171329 0%, #3b2465 52%, #6f36ad 100%)',
];

function toggleInList(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function gradientFor(id: string) {
  const seed = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return portfolioGradients[seed % portfolioGradients.length];
}

function EditableHero({ profile, onSave }: { profile: MyProfile; onSave: (next: MyProfile) => void }) {
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(false), 2400);
    return () => window.clearTimeout(timer);
  }, [saved]);

  const update = <K extends keyof MyProfile>(key: K, value: MyProfile[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const cycleAvatar = () => {
    const nextIndex = (AVATAR_POOL.indexOf(draft.avatarSrc) + 1) % AVATAR_POOL.length;
    update('avatarSrc', AVATAR_POOL[nextIndex]);
  };

  return (
    <section className={`${heroStyles.hero} ${styles.heroCompact}`}>
      <div className={heroStyles.identity}>
        <span className={styles.avatarWrap}>
          <img className={`${heroStyles.avatar} ${styles.avatarCompact}`} src={draft.avatarSrc} alt="내 프로필 사진" />
          <button type="button" className={styles.avatarEditButton} aria-label="사진 변경" onClick={cycleAvatar}><RefreshCw size={12} /></button>
        </span>
        <div className={heroStyles.body}>
          <input className={styles.nameInput} value={draft.name} onChange={(event) => update('name', event.target.value)} aria-label="이름" />
          <dl className={`${heroStyles.facts} ${styles.factsCompact}`}>
            <div>
              <dt>성별</dt>
              <dd><ToggleGroup options={['남성', '여성'] as const} value={draft.gender} onChange={(value) => update('gender', value)} ariaLabel="성별" /></dd>
            </div>
            <div>
              <dt>연락처</dt>
              <dd><input className={styles.inlineInput} value={draft.phone} onChange={(event) => update('phone', event.target.value)} aria-label="연락처" /></dd>
            </div>
            <div>
              <dt>언어</dt>
              <dd>{languageOptions.map((option) => <Chip key={option} size="sm" selected={draft.languages.includes(option)} onClick={() => update('languages', toggleInList(draft.languages, option))}>{option}</Chip>)}</dd>
            </div>
            <div>
              <dt>카테고리</dt>
              <dd>{categoryOptions.map((option) => <Chip key={option} size="sm" selected={draft.categories.includes(option)} onClick={() => update('categories', toggleInList(draft.categories, option))}>{option}</Chip>)}</dd>
            </div>
            <div>
              <dt>톤</dt>
              <dd>{toneOptions.map((option) => <Chip key={option} size="sm" selected={draft.tones.includes(option)} onClick={() => update('tones', toggleInList(draft.tones, option))}>{option}</Chip>)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <aside className={`${heroStyles.contact} ${styles.contactCompact}`}>
        <Button size="sm" className={heroStyles.contactButton} onClick={() => { onSave(draft); setSaved(true); }}>저장하기</Button>
        {saved && <p className={styles.savedNote}>저장되었습니다</p>}
      </aside>

      <div className={`${heroStyles.footer} ${styles.footerCompact}`}>
        <div className={styles.bioField}>
          <span className={styles.fieldLabel}>자기소개</span>
          <textarea className={styles.textarea} value={draft.bio} onChange={(event) => update('bio', event.target.value)} placeholder="자기소개를 입력해 주세요" />
        </div>
      </div>
    </section>
  );
}

const emptyPortfolioDraft = (): PortfolioEntry => ({ id: '', title: '', category: portfolioCategoryOptions[0], client: '', tags: [], sampleFileName: undefined, imageFileName: undefined });

function PortfolioTab({ profile, onSave }: { profile: MyProfile; onSave: (next: MyProfile) => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<PortfolioEntry>(emptyPortfolioDraft);
  const [preview, setPreview] = useState<{ item: PortfolioItem; origin: DOMRect } | null>(null);
  const sampleInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const openForCreate = () => { setDraft(emptyPortfolioDraft()); setModalOpen(true); };
  const openForEdit = (entry: PortfolioEntry) => { setDraft(entry); setModalOpen(true); };

  const removeEntry = (id: string) => {
    if (!window.confirm('이 포트폴리오 항목을 삭제할까요?')) return;
    onSave({ ...profile, portfolio: profile.portfolio.filter((item) => item.id !== id) });
  };

  const submitDraft = () => {
    if (!draft.title.trim()) return;
    const exists = profile.portfolio.some((item) => item.id === draft.id);
    const nextEntry = { ...draft, id: draft.id || createId() };
    const nextPortfolio = exists ? profile.portfolio.map((item) => item.id === nextEntry.id ? nextEntry : item) : [nextEntry, ...profile.portfolio];
    onSave({ ...profile, portfolio: nextPortfolio });
    setModalOpen(false);
  };

  const openPreview = (entry: PortfolioEntry, origin: DOMRect) => {
    setPreview({
      origin,
      item: { title: entry.title, category: entry.category, languages: profile.languages, tone: entry.category, tags: entry.tags, client: entry.client, image: gradientFor(entry.id) },
    });
  };

  return (
    <>
      <section className={`${detailStyles.tabPanel} ${styles.tabPanelCompact}`}>
        <div className={detailStyles.sectionHead}>
          <h2>포트폴리오</h2>
          <Button size="sm" leadingIcon={<Plus size={15} />} onClick={openForCreate}>프로젝트 추가</Button>
        </div>

        <div className={`${detailStyles.portfolioGrid} ${styles.portfolioGridCompact}`}>
          {profile.portfolio.map((entry) => (
            <div key={entry.id} className={styles.portfolioTile}>
              <PortfolioCard imageOnly title={entry.title} languages={profile.languages} category={entry.category} tags={entry.tags} client={entry.client} image={gradientFor(entry.id)} onOpen={(origin) => openPreview(entry, origin)} />
              <div className={styles.tileOverlay}>
                <button type="button" className={styles.editButton} aria-label="수정" onClick={() => openForEdit(entry)}><Pencil size={14} /></button>
                <button type="button" className={styles.deleteButton} aria-label="삭제" onClick={() => removeEntry(entry.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          <button type="button" className={styles.addTile} onClick={openForCreate}><Plus size={20} /> 프로젝트 추가</button>
        </div>
      </section>

      <Modal open={modalOpen} title={profile.portfolio.some((item) => item.id === draft.id) ? '포트폴리오 수정' : '포트폴리오 추가'} onClose={() => setModalOpen(false)}>
        <div className={styles.form}>
          <div>
            <span className={styles.fieldLabel}>프로젝트명</span>
            <TextField label="프로젝트명" hideLabel value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} placeholder="프로젝트명을 입력해 주세요" />
          </div>
          <div>
            <span className={styles.fieldLabel}>카테고리</span>
            <Select aria-label="카테고리" value={draft.category} onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))}>
              {portfolioCategoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </Select>
          </div>
          <div>
            <span className={styles.fieldLabel}>클라이언트</span>
            <TextField label="클라이언트" hideLabel value={draft.client} onChange={(event) => setDraft((current) => ({ ...current, client: event.target.value }))} placeholder="클라이언트명 (선택)" />
          </div>
          <div>
            <span className={styles.fieldLabel}>태그</span>
            <div className={styles.chipRow}>
              {portfolioTagOptions.map((option) => (
                <Chip key={option} selected={draft.tags.includes(option)} onClick={() => setDraft((current) => ({ ...current, tags: toggleInList(current.tags, option) }))}>{option}</Chip>
              ))}
            </div>
          </div>
          <div>
            <span className={styles.fieldLabel}>음성 샘플 파일</span>
            <button type="button" className={styles.fileDropzone} onClick={() => sampleInputRef.current?.click()}>
              <span className={styles.fileIcon}><Upload size={16} /></span>
              <span className={draft.sampleFileName ? styles.fileNameSet : styles.fileNamePlaceholder}>{draft.sampleFileName || '파일을 선택해 주세요'}</span>
              <span className={styles.fileCta}>파일 선택</span>
            </button>
            <input ref={sampleInputRef} type="file" accept="audio/*" hidden onChange={(event) => setDraft((current) => ({ ...current, sampleFileName: event.target.files?.[0]?.name }))} />
          </div>
          <div>
            <span className={styles.fieldLabel}>대표 이미지 파일</span>
            <button type="button" className={styles.fileDropzone} onClick={() => imageInputRef.current?.click()}>
              <span className={styles.fileIcon}><Upload size={16} /></span>
              <span className={draft.imageFileName ? styles.fileNameSet : styles.fileNamePlaceholder}>{draft.imageFileName || '파일을 선택해 주세요'}</span>
              <span className={styles.fileCta}>파일 선택</span>
            </button>
            <input ref={imageInputRef} type="file" accept="image/*" hidden onChange={(event) => setDraft((current) => ({ ...current, imageFileName: event.target.files?.[0]?.name }))} />
          </div>
          <div className={styles.footerRow}>
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>취소</Button>
            <Button size="sm" onClick={submitDraft}>저장</Button>
          </div>
        </div>
      </Modal>

      {preview && <PortfolioDetail item={preview.item} origin={preview.origin} onClose={() => setPreview(null)} />}
    </>
  );
}

function CareerTab({ profile, onSave }: { profile: MyProfile; onSave: (next: MyProfile) => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addRow = () => {
    const next: CareerEntry = { id: createId(), year: String(new Date().getFullYear()), title: '', role: '' };
    onSave({ ...profile, career: [next, ...profile.career] });
    setEditingId(next.id);
  };

  const updateRow = (id: string, patch: Partial<CareerEntry>) => {
    onSave({ ...profile, career: profile.career.map((item) => item.id === id ? { ...item, ...patch } : item) });
  };

  const removeRow = (id: string) => {
    if (!window.confirm('이 경력 항목을 삭제할까요?')) return;
    onSave({ ...profile, career: profile.career.filter((item) => item.id !== id) });
  };

  return (
    <section className={`${detailStyles.tabPanel} ${styles.tabPanelCompact}`}>
      <div className={detailStyles.sectionHead}>
        <h2>경력 · 크레딧</h2>
        <Button size="sm" leadingIcon={<Plus size={15} />} onClick={addRow}>경력 추가</Button>
      </div>

      {profile.career.length === 0 && <div className={styles.emptyState}>등록된 경력이 없습니다.</div>}

      <ul className={`${detailStyles.careerList} ${styles.careerListCompact}`}>
        {profile.career.map((item) => (
          <li key={item.id}>
            {editingId === item.id ? (
              <>
                <input className={styles.careerYearInput} value={item.year} onChange={(event) => updateRow(item.id, { year: event.target.value })} aria-label="연도" />
                <input className={styles.careerTitleInput} value={item.title} onChange={(event) => updateRow(item.id, { title: event.target.value })} placeholder="프로젝트명" aria-label="프로젝트명" />
                <div className={styles.careerRowActions}>
                  <input className={styles.careerRoleInput} value={item.role} onChange={(event) => updateRow(item.id, { role: event.target.value })} placeholder="역할" aria-label="역할" />
                  <button type="button" className={styles.editButton} aria-label="완료" onClick={() => setEditingId(null)}><Check size={14} /></button>
                  <button type="button" className={styles.deleteButton} aria-label="삭제" onClick={() => removeRow(item.id)}><Trash2 size={14} /></button>
                </div>
              </>
            ) : (
              <>
                <span className={detailStyles.careerYear}>{item.year}</span>
                <span className={detailStyles.careerTitle}>{item.title || '제목 없음'}</span>
                <div className={styles.careerRowActions}>
                  <span className={detailStyles.careerRole}>{item.role || '역할 없음'}</span>
                  <button type="button" className={styles.editButton} aria-label="수정" onClick={() => setEditingId(item.id)}><Pencil size={14} /></button>
                  <button type="button" className={styles.deleteButton} aria-label="삭제" onClick={() => removeRow(item.id)}><Trash2 size={14} /></button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function MyProfilePage() {
  const [profile, setProfile] = useState<MyProfile>(getMyProfile);
  const [tab, setTab] = useState<(typeof tabs)[number]>('포트폴리오');

  useEffect(() => {
    if (!isLoggedIn()) window.location.hash = '#login';
  }, []);

  if (!isLoggedIn()) return null;

  const persist = (next: MyProfile) => {
    setProfile(next);
    saveMyProfile(next);
  };

  return (
    <main className={detailStyles.page}>
      <GNB />
      <div className={`${detailStyles.shell} ${styles.shellCompact}`}>
        <a className={detailStyles.backLink} href="#client"><ArrowLeft size={16} /> 홈으로</a>

        <EditableHero profile={profile} onSave={persist} />

        <nav className={`${detailStyles.tabBar} ${styles.tabBarCompact}`} aria-label="마이페이지 탭">
          {tabs.map((item) => (
            <button key={item} type="button" className={item === tab ? detailStyles.tabActive : ''} onClick={() => setTab(item)}>{item}</button>
          ))}
        </nav>

        <div className={`${detailStyles.tabBody} ${styles.tabBodyCompact}`}>
          {tab === '포트폴리오' && <PortfolioTab profile={profile} onSave={persist} />}
          {tab === '경력·크레딧' && <CareerTab profile={profile} onSave={persist} />}
        </div>
      </div>
      <Footer />
    </main>
  );
}
