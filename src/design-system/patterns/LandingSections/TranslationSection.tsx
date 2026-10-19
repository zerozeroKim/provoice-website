import { ArrowUpRight, Award, BadgeCheck, BookOpen, FileText, Gamepad2, Play, UserCheck } from 'lucide-react';
import { useLanguage, useT } from '@/lib/i18n';
import { SectionHeader } from '../../components';
import styles from './TranslationSection.module.css';
import type { TranslationRow } from './types';

const rowIcons = [<Play />, <BookOpen />, <Gamepad2 />, <FileText />, <UserCheck />];

const rowLabelEn: Record<string, string> = {
  '영상 자막 · 대사 번역': 'Video subtitles · dialogue translation',
  '웹툰 번역 · 자막(레터링)': 'Webtoon translation · lettering',
  '게임 텍스트 로컬라이징': 'In-game text localization',
  '기술 문서 · 계약서 · 수출 서류': 'Technical docs · contracts · export paperwork',
  '원어민 감수': 'Native-speaker review',
};
const languageEn: Record<string, string> = { 영어: 'English', 일본어: 'Japanese', 중국어: 'Chinese', 스페인어: 'Spanish', 아랍어: 'Arabic', 베트남어: 'Vietnamese', 인도네시아어: 'Indonesian', '+ 22개국': '+ 22 more countries' };

export function TranslationSection({ rows, languages }: { rows: TranslationRow[]; languages: string[] }) {
  const t = useT();
  const { language } = useLanguage();
  return (
    <section className={styles.translationSection} aria-label={t('번역 서비스', 'Translation services')}>
      <div className={styles.translationIntro}>
        <SectionHeader
          className={styles.translationHeader}
          eyebrow="TRANSLATION"
          title={t('번역 — 검증된 표준, 검증된 인력', 'Translation — Proven standards, proven people')}
          description={language === 'en'
            ? <>Full-spectrum translation for games, animation, webtoons, technical documents and more, backed by native-speaker review.<br />Webtoon subtitle (lettering) work is also handled within our translation service.</>
            : <>게임·애니메이션·웹툰·기술 문서 등 전 분야 번역을 원어민 감수 시스템으로 제공합니다.<br />웹툰 자막(레터링) 작업도 번역 서비스 안에서 함께 처리합니다.</>}
        />
      </div>
      <div className={styles.translationBody}>
        <div className={styles.translationMain}>
          <div className={styles.certRow}>
            <article className={styles.certCard}>
              <span className={styles.certIcon}><BadgeCheck strokeWidth={1.75} /></span>
              <strong>ISO 17100</strong>
              <span className={styles.certCaption}>{t('국제 표준 번역 인증', 'International translation standard')}</span>
            </article>
            <article className={styles.certCard}>
              <span className={styles.certIcon}><Award strokeWidth={1.75} /></span>
              <strong>{t('수출바우처', 'Export Voucher')}</strong>
              <span className={styles.certCaption}>{t('정부 지정 공식 수행기관', 'Government-designated official partner')}</span>
            </article>
          </div>
          <div className={styles.languageBlock}>
            <div className={styles.languageHeading}><div><span>AVAILABLE LANGUAGES</span><h3>{t('주요 지원 언어', 'Languages Supported')}</h3></div></div>
            <div className={styles.languageChips}>{languages.map((language) => <span key={language}>{t(language, languageEn[language] ?? language)}</span>)}</div>
          </div>
        </div>
        <div className={styles.translationTable}>
          <div className={styles.tableHead}><div><span>SERVICE SCOPE</span><h3>{t('번역 서비스 구성', 'Translation Service Scope')}</h3></div><span>{t('전 과정 원스톱', 'End-to-end, one stop')}</span></div>
          <div className={styles.serviceGrid}>
            {rows.map((row, index) => (
              <article key={row.label} className={styles.serviceCard}>
                <span className={styles.serviceIcon}>{rowIcons[index % rowIcons.length]}</span>
                <strong>{t(row.label, rowLabelEn[row.label] ?? row.label)}</strong>
                <span className={styles.serviceTag}>{row.value}</span>
              </article>
            ))}
          </div>
          <button type="button" className={styles.translationCta}>{t('번역 프로젝트 문의하기', 'Inquire about a translation project')} <ArrowUpRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}
