import { ArrowUpRight, Award, BadgeCheck, BookOpen, FileText, Gamepad2, Play, UserCheck } from 'lucide-react';
import { SectionHeader } from '../../components';
import styles from './TranslationSection.module.css';
import type { TranslationRow } from './types';

const rowIcons = [<Play />, <BookOpen />, <Gamepad2 />, <FileText />, <UserCheck />];

export function TranslationSection({ rows, languages }: { rows: TranslationRow[]; languages: string[] }) {
  return (
    <section className={styles.translationSection} aria-label="번역 서비스">
      <div className={styles.translationIntro}>
        <SectionHeader
          className={styles.translationHeader}
          eyebrow="TRANSLATION"
          title="번역 — 검증된 표준, 검증된 인력"
          description={<>게임·애니메이션·웹툰·기술 문서 등 전 분야 번역을 원어민 감수 시스템으로 제공합니다.<br />웹툰 자막(레터링) 작업도 번역 서비스 안에서 함께 처리합니다.</>}
        />
      </div>
      <div className={styles.translationBody}>
        <div className={styles.translationMain}>
          <div className={styles.certRow}>
            <article className={styles.certCard}>
              <span className={styles.certIcon}><BadgeCheck strokeWidth={1.75} /></span>
              <strong>ISO 17100</strong>
              <span className={styles.certCaption}>국제 표준 번역 인증</span>
            </article>
            <article className={styles.certCard}>
              <span className={styles.certIcon}><Award strokeWidth={1.75} /></span>
              <strong>수출바우처</strong>
              <span className={styles.certCaption}>정부 지정 공식 수행기관</span>
            </article>
          </div>
          <div className={styles.languageBlock}>
            <div className={styles.languageHeading}><div><span>AVAILABLE LANGUAGES</span><h3>주요 지원 언어</h3></div></div>
            <div className={styles.languageChips}>{languages.map((language) => <span key={language}>{language}</span>)}</div>
          </div>
        </div>
        <div className={styles.translationTable}>
          <div className={styles.tableHead}><div><span>SERVICE SCOPE</span><h3>번역 서비스 구성</h3></div><span>전 과정 원스톱</span></div>
          <div className={styles.serviceGrid}>
            {rows.map((row, index) => (
              <article key={row.label} className={styles.serviceCard}>
                <span className={styles.serviceIcon}>{rowIcons[index % rowIcons.length]}</span>
                <strong>{row.label}</strong>
                <span className={styles.serviceTag}>{row.value}</span>
              </article>
            ))}
          </div>
          <button type="button" className={styles.translationCta}>번역 프로젝트 문의하기 <ArrowUpRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}
