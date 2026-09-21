import { useMemo, useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronRight, Pause, Pencil, Play, Search, Star, Trash2, UserCircle2, Volume2 } from 'lucide-react';
import { Button, Chip, Pagination, Select, TextField } from '@/design-system';
import { adminLanguageRows, adminSampleRows, adminTranslatorRows, adminVoiceActorRows, type RosterRow } from './adminData';
import styles from './AdminPage.module.css';

const topTabs = ['계정 관리', '전문가 관리', '프로젝트 관리', '파트너 관리', '설정'] as const;
const expertSidebar = ['성우 관리', '번역가 관리', '샘플 관리', '언어 관리'] as const;
const statusOptions = ['전체', '신청중', '등록완료'] as const;
const sampleTabs = ['성우 샘플', '번역 샘플'] as const;
const PAGE_SIZE = 8;

type TopTab = (typeof topTabs)[number];
type SidebarSection = (typeof expertSidebar)[number];

function RosterManagement({ heading, registerLabel, searchPlaceholder, initialRows }: { heading: string; registerLabel: string; searchPlaceholder: string; initialRows: RosterRow[] }) {
  const [rows, setRows] = useState<RosterRow[]>(initialRows);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<(typeof statusOptions)[number]>('전체');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const normalized = query.trim();
    return rows.filter((row) => (!normalized || row.name.includes(normalized)) && (status === '전체' || row.status === status));
  }, [rows, query, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visibleRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleBest = (id: number) => {
    setRows((current) => current.map((row) => row.id === id ? { ...row, best: !row.best } : row));
  };

  const removeRow = (id: number, name: string) => {
    if (!window.confirm(`${name} 항목을 목록에서 삭제할까요?`)) return;
    setRows((current) => current.filter((row) => row.id !== id));
  };

  return (
    <>
      <div className={styles.contentHead}>
        <h1>{heading}</h1>
      </div>

      <div className={styles.toolbar}>
        <TextField
          label={searchPlaceholder}
          hideLabel
          fieldSize="md"
          leadingIcon={<Search size={17} strokeWidth={1.75} />}
          placeholder={searchPlaceholder}
          value={query}
          onChange={(event) => { setQuery(event.target.value); setPage(1); }}
          containerClassName={styles.searchField}
        />
        <Select aria-label="등록 구분 필터" value={status} onChange={(event) => { setStatus(event.target.value as typeof status); setPage(1); }} className={styles.statusSelect}>
          {statusOptions.map((option) => <option key={option} value={option}>{option}</option>)}
        </Select>
      </div>

      <h2 className={styles.listLabel}>{heading.replace('관리', '목록')}</h2>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>번호</th>
              <th>Best</th>
              <th>프로필 이미지</th>
              <th>이름</th>
              <th>샘플파일수</th>
              <th>등록 구분</th>
              <th>지원일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr key={row.id}>
                <td>{row.displayId}</td>
                <td>
                  <button type="button" className={`${styles.bestButton} ${row.best ? styles.bestSelected : ''}`} onClick={() => toggleBest(row.id)}>
                    <Star size={12} fill={row.best ? 'currentColor' : 'none'} /> {row.best ? '선정' : '해제'}
                  </button>
                </td>
                <td>
                  <span className={styles.avatar}>
                    {row.avatarSrc ? <img src={row.avatarSrc} alt={`${row.name} 프로필`} /> : <UserCircle2 size={22} strokeWidth={1.3} />}
                  </span>
                </td>
                <td className={styles.nameCell}>{row.name}</td>
                <td>{row.sampleCount}</td>
                <td><Chip variant="status" tone={row.status === '등록완료' ? 'success' : 'neutral'} size="sm">{row.status}</Chip></td>
                <td className={styles.dateCell}>{row.appliedAt}</td>
                <td>
                  <div className={styles.rowActions}>
                    <button type="button" className={styles.viewLink}>상세보기<ChevronRight size={13} /></button>
                    <button type="button" className={styles.deleteButton} aria-label={`${row.name} 삭제`} onClick={() => removeRow(row.id, row.name)}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {visibleRows.length === 0 && (
              <tr><td colSpan={8} className={styles.emptyRow}>검색 조건에 맞는 항목이 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.paginationWrap}><Pagination page={page} totalPages={totalPages} onChange={setPage} /></div>

      <Button className={styles.gradientButton}>{registerLabel}</Button>
    </>
  );
}

function SampleManagement() {
  const [tab, setTab] = useState<(typeof sampleTabs)[number]>('성우 샘플');
  const [actorFilter, setActorFilter] = useState('성우 이름');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [playingId, setPlayingId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim();
    return adminSampleRows.filter((row) => (!normalized || row.actorName.includes(normalized)) && (actorFilter === '성우 이름' || row.actorName === actorFilter));
  }, [query, actorFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visibleRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const actorOptions = useMemo(() => Array.from(new Set(adminSampleRows.map((row) => row.actorName))), []);

  if (tab === '번역 샘플') {
    return (
      <>
        <div className={styles.contentHead}><h1>샘플 관리</h1></div>
        <h2 className={styles.listLabel}>샘플 목록</h2>
        <div className={styles.sampleTabs}>
          {sampleTabs.map((option) => (
            <button key={option} type="button" className={option === tab ? styles.sampleTabActive : styles.sampleTab} onClick={() => setTab(option)}>{option}</button>
          ))}
        </div>
        <div className={styles.placeholder}>이 화면은 아직 준비 중입니다.</div>
      </>
    );
  }

  return (
    <>
      <div className={styles.contentHead}><h1>샘플 관리</h1></div>
      <h2 className={styles.listLabel}>샘플 목록</h2>

      <div className={styles.sampleTabs}>
        {sampleTabs.map((option) => (
          <button key={option} type="button" className={option === tab ? styles.sampleTabActive : styles.sampleTab} onClick={() => setTab(option)}>{option}</button>
        ))}
      </div>

      <div className={styles.toolbar}>
        <Select aria-label="성우 이름 필터" value={actorFilter} onChange={(event) => { setActorFilter(event.target.value); setPage(1); }} className={styles.statusSelect}>
          <option value="성우 이름">성우 이름</option>
          {actorOptions.map((name) => <option key={name} value={name}>{name}</option>)}
        </Select>
        <TextField
          label="검색"
          hideLabel
          fieldSize="md"
          placeholder="검색"
          value={query}
          onChange={(event) => { setQuery(event.target.value); setPage(1); }}
          containerClassName={styles.searchField}
        />
      </div>

      <div className={styles.tableWrap}>
        <table className={`${styles.table} ${styles.sampleTable}`}>
          <thead>
            <tr>
              <th>번호</th>
              <th>성우 이름</th>
              <th>첨부파일</th>
              <th>카테고리</th>
              <th>언어</th>
              <th>지역</th>
              <th>성별</th>
              <th>연령</th>
              <th>톤</th>
              <th>new톤</th>
              <th>태그</th>
              <th>등록일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td className={styles.nameCell}>{row.actorName}</td>
                  <td>
                    <div className={styles.playerCell}>
                      <button type="button" className={styles.playButton} aria-label={playingId === row.id ? '일시정지' : '재생'} onClick={() => setPlayingId((current) => current === row.id ? null : row.id)}>
                        {playingId === row.id ? <Pause size={13} /> : <Play size={13} />}
                      </button>
                      <span className={styles.playerTime}>00:00</span>
                      <span className={styles.playerTrack}><span style={{ width: playingId === row.id ? '38%' : '0%' }} /></span>
                      <span className={styles.playerTime}>{row.duration}</span>
                      <Volume2 size={15} strokeWidth={1.75} />
                    </div>
                  </td>
                  <td>{row.category}</td>
                  <td>{row.language}</td>
                  <td>{row.region}</td>
                  <td>{row.gender}</td>
                  <td>{row.age}</td>
                  <td className={styles.wrapCell}>{row.tone}</td>
                  <td>{row.newTone}</td>
                  <td className={styles.wrapCell}>{row.tags || '-'}</td>
                  <td className={styles.dateCell}>{row.registeredAt}</td>
                  <td>
                    <div className={styles.rowActions}>
                      <button type="button" className={styles.editButton} aria-label="수정"><Pencil size={14} /></button>
                      <button type="button" className={styles.deleteButton} aria-label={`샘플 ${row.id} 삭제`}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className={styles.paginationWrap}><Pagination page={page} totalPages={totalPages} onChange={setPage} /></div>

      <Button className={styles.gradientButton}>샘플 추가하기</Button>
    </>
  );
}

function LanguageManagement() {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(adminLanguageRows.length / PAGE_SIZE));
  const visibleRows = adminLanguageRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <div className={styles.contentHead}><h1>언어 관리</h1></div>
      <h2 className={styles.listLabel}>언어 목록</h2>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>번호</th>
              <th>이미지</th>
              <th>언어(한국어)</th>
              <th>언어(영어)</th>
              <th>등록일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr key={row.id}>
                <td>{String(row.id).padStart(3, '0')}</td>
                <td><span className={styles.flagBadge}>{row.flag}</span></td>
                <td className={styles.nameCell}>{row.nameKo}</td>
                <td>{row.nameEn}</td>
                <td className={styles.dateCell}>{row.registeredAt}</td>
                <td>
                  <div className={styles.rowActions}>
                    <button type="button" className={styles.editButton} aria-label="수정"><Pencil size={14} /></button>
                    <button type="button" className={styles.deleteButton} aria-label={`${row.nameKo} 삭제`}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.paginationWrap}><Pagination page={page} totalPages={totalPages} onChange={setPage} /></div>

      <Button className={styles.gradientButton}>언어 추가하기</Button>
    </>
  );
}

function PlaceholderSection({ label }: { label: string }) {
  return (
    <>
      <div className={styles.contentHead}><h1>{label}</h1></div>
      <div className={styles.placeholder}>이 화면은 아직 준비 중입니다.</div>
    </>
  );
}

export function AdminPage() {
  const [topTab, setTopTab] = useState<TopTab>('전문가 관리');
  const [sidebarSection, setSidebarSection] = useState<SidebarSection>('성우 관리');

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <a className={styles.logo} href="#admin" aria-label="PROVOICE 관리자"><img src="/assets/provoice-logo.png" alt="PROVOICE" /></a>
        <nav className={styles.topNav} aria-label="관리자 메뉴">
          {topTabs.map((tab) => (
            <button key={tab} type="button" className={tab === topTab ? styles.topNavActive : ''} onClick={() => setTopTab(tab)}>{tab}</button>
          ))}
        </nav>
        <div className={styles.topUtility}>
          <a className={styles.exitLink} href="#client"><ArrowLeft size={15} /> 사이트로 나가기</a>
          <span className={styles.utilityDivider} aria-hidden="true" />
          <span className={styles.account}><UserCircle2 size={20} strokeWidth={1.5} /> admin@provoice.co.kr</span>
          <button type="button" className={styles.langSwitch}>🇰🇷 <ChevronDown size={13} /></button>
        </div>
      </header>

      <div className={styles.body}>
        {topTab === '전문가 관리' ? (
          <>
            <aside className={styles.sidebar}>
              {expertSidebar.map((section) => (
                <button key={section} type="button" className={section === sidebarSection ? styles.sidebarActive : ''} onClick={() => setSidebarSection(section)}>{section}</button>
              ))}
            </aside>
            <main className={styles.content}>
              {sidebarSection === '성우 관리' && <RosterManagement heading="성우 관리" registerLabel="성우 등록" searchPlaceholder="성우 이름 검색" initialRows={adminVoiceActorRows} />}
              {sidebarSection === '번역가 관리' && <RosterManagement heading="번역가 관리" registerLabel="번역가 등록" searchPlaceholder="번역가 이름 검색" initialRows={adminTranslatorRows} />}
              {sidebarSection === '샘플 관리' && <SampleManagement />}
              {sidebarSection === '언어 관리' && <LanguageManagement />}
            </main>
          </>
        ) : (
          <main className={styles.content}>
            <PlaceholderSection label={topTab} />
          </main>
        )}
      </div>
    </div>
  );
}
