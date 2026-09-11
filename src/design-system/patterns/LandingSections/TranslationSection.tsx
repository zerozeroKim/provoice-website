import { ArrowRight, ArrowUpRight, BadgeCheck, Languages, Sparkles } from 'lucide-react';
import { SectionHeader } from '../../components';
import styles from './TranslationSection.module.css';
import type { TranslationRow } from './types';

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
          <div className={styles.infoGrid}>
            <article className={`${styles.infoCard} ${styles.infoCardPrimary}`}>
              <div className={styles.cardIcon}><BadgeCheck /></div>
              <div><span className={styles.cardOverline}>QUALITY STANDARD</span><h3>ISO 17100 인증</h3><p>번역·검수·최종 품질관리까지 국제 표준에 맞춰 운영합니다.</p></div>
            </article>
            <article className={styles.infoCard}>
              <div className={styles.cardIcon}><Languages /></div>
              <div><span className={styles.cardOverline}>GLOBAL NETWORK</span><h3>30개국 언어 지원</h3><p>현지 언어와 문화에 익숙한 원어민 전문가가 참여합니다.</p></div>
            </article>
            <article className={styles.infoCard}>
              <div className={styles.cardIcon}><Sparkles /></div>
              <div><span className={styles.cardOverline}>SMART WORKFLOW</span><h3>AI × Human 검수</h3><p>속도는 높이고, 표현의 자연스러움은 사람이 지킵니다.</p></div>
            </article>
          </div>
          <div className={styles.languageBlock}>
            <div className={styles.languageHeading}><div><span>AVAILABLE LANGUAGES</span><h3>주요 지원 언어</h3></div></div>
            <div className={styles.languageChips}>{languages.map((language) => <span key={language}>{language}</span>)}</div>
          </div>
        </div>
        <div className={styles.translationTable}>
          <div className={styles.tableHead}><div><span>SERVICE SCOPE</span><h3>번역 서비스 구성</h3></div><span>전 과정 원스톱</span></div>
          {rows.map((row, index) => (
            <div key={row.label} className={styles.tableRow}>
              <span className={styles.tableIndex}>{String(index + 1).padStart(2, '0')}</span>
              <span>{row.label}</span>
              <span>{row.value}</span>
              <ArrowRight size={16} />
            </div>
          ))}
          <button type="button" className={styles.translationCta}>번역 프로젝트 문의하기 <ArrowUpRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}
