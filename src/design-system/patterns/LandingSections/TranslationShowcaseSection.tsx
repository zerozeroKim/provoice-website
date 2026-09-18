import { Fragment } from 'react';
import { ArrowRight, Award, BookOpen, FileText, Gamepad2, Play, UserCheck } from 'lucide-react';
import styles from './TranslationShowcaseSection.module.css';

const certItems = [
  { title: 'ISO 17100', caption: '국제 표준 번역 인증', tone: 'iso' as const },
  { title: '수출바우처', caption: '정부 지정 공식 수행기관', tone: 'award' as const },
];

const languageFlags = [
  { flag: '🇺🇸', label: '영어' },
  { flag: '🇯🇵', label: '일본어' },
  { flag: '🇨🇳', label: '중국어' },
  { flag: '🇪🇸', label: '스페인어' },
  { flag: '🇫🇷', label: '프랑스어' },
  { flag: '🇩🇪', label: '독일어' },
];

const serviceItems = [
  { icon: <Play />, title: '영상 자막·대사 번역', caption: '영상, 드라마, 영화, 유튜브 등' },
  { icon: <BookOpen />, title: '웹툰 번역 · 자막(레터링)', caption: '웹툰, 웹소설, 디지털 콘텐츠' },
  { icon: <Gamepad2 />, title: '게임 텍스트 로컬라이징', caption: '시나리오, UI/UX, 인게임 텍스트' },
  { icon: <FileText />, title: '기술 문서 · 계약서 · 수출 서류', caption: '매뉴얼, 기술자료, 비즈니스 문서' },
  { icon: <UserCheck />, title: '원어민 감수', caption: '네이티브 리뷰, 품질 검수' },
];

export function TranslationShowcaseSection() {
  return (
    <section className={styles.showcase} aria-label="번역 서비스 (신규 시안)">
      <div className={styles.topGrid}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>GLOBAL TRANSLATION PARTNER</span>
          <h2>언어의 경계를 넘어,<br />콘텐츠가 더 멀리 닿을 수 있도록.</h2>
          <p>국제 표준 인증과 정부 지정 수행기관의 전문성으로<br />정확하고 자연스러운 번역 품질을 제공합니다.</p>

          <div className={styles.certRow}>
            {certItems.map((item, index) => (
              <Fragment key={item.title}>
                {index > 0 && <span className={styles.certDivider} aria-hidden="true" />}
                <div className={styles.certItem}>
                  <span className={`${styles.certBadge} ${item.tone === 'iso' ? styles.certBadgeIso : styles.certBadgeAward}`}>
                    {item.tone === 'iso' ? 'ISO' : <Award />}
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.caption}</span>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <div className={styles.illustration} aria-hidden="true">
          <span className={styles.orbit} />
          <span className={styles.dot} />
          <div className={`${styles.paper} ${styles.paperBack}`}>文</div>
          <div className={`${styles.paper} ${styles.paperFront}`}>A</div>
          <span className={`${styles.pill} ${styles.pillTop}`}>Global<br />Content</span>
          <span className={`${styles.pill} ${styles.pillBottom}`}>Accurate<br />Translation</span>
        </div>

        <div className={styles.sideCopy}>
          <p>좋은 콘텐츠는<br />언어를 넘어<br />더 멀리 갑니다.</p>
          <span className={styles.sideRule} aria-hidden="true" />
          <span className={styles.sideCaption}>BEYOND LANGUAGE,<br />TO A WIDER WORLD.</span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.languageArea}>
        <span className={styles.sectionEyebrow}>SUPPORTED LANGUAGES</span>
        <h3>주요 지원 언어</h3>
        <div className={styles.flagChips}>
          {languageFlags.map((item) => (
            <span key={item.label} className={styles.flagChip}><span className={styles.flagCircle}>{item.flag}</span>{item.label}</span>
          ))}
          <span className={styles.flagChip}>+22개국</span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.serviceArea}>
        <div className={styles.serviceHead}>
          <div>
            <span className={styles.sectionEyebrow}>SERVICE SCOPE</span>
            <h3>번역 서비스 구성</h3>
          </div>
          <button type="button" className={styles.viewAllLink}>전체 과정 보기 <ArrowRight size={16} /></button>
        </div>
        <div className={styles.serviceGrid}>
          {serviceItems.map((item, index) => (
            <article key={item.title} className={styles.serviceCard}>
              <div className={styles.serviceCardHead}>
                <span className={styles.serviceIndex}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.serviceIcon}>{item.icon}</span>
              </div>
              <strong>{item.title}</strong>
              <span>{item.caption}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
