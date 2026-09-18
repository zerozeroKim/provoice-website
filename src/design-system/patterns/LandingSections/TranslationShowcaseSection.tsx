import { Fragment } from 'react';
import { Award } from 'lucide-react';
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
  { title: '영상 자막 · 대사 번역', tag: 'Subtitling' },
  { title: '웹툰 번역 + 식자(레터링)', tag: 'Webtoon' },
  { title: '게임 텍스트 로컬라이징', tag: 'In-game' },
  { title: '기술 문서 · 계약서 · 수출 서류', tag: 'Corporate' },
  { title: '원어민 감수', tag: 'Native QA' },
];

export function TranslationShowcaseSection() {
  return (
    <section className={styles.showcase} aria-label="번역 서비스 (신규 시안)">
      <div className={styles.heroPanel}>
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

            <div className={styles.languageInline}>
              <span className={styles.languageLabel}>SUPPORTED LANGUAGES</span>
              <div className={styles.flagChips}>
                {languageFlags.map((item) => (
                  <span key={item.label} className={styles.flagChip}><span className={styles.flagCircle}>{item.flag}</span>{item.label}</span>
                ))}
                <span className={styles.flagChip}>+22개국</span>
              </div>
            </div>
          </div>

          <div className={styles.illustration} aria-hidden="true">
            <span className={styles.glow} />
            <span className={styles.orbit} />
            <span className={styles.dot} />
            <div className={`${styles.paper} ${styles.paperGhost}`} />
            <div className={`${styles.paper} ${styles.paperBack}`}>文</div>
            <div className={`${styles.paper} ${styles.paperFront}`}>A</div>
            <span className={`${styles.pill} ${styles.pillTop}`}>Global<br />Content</span>
            <span className={`${styles.pill} ${styles.pillBottom}`}>Accurate<br />Translation</span>
          </div>
        </div>
      </div>

      <div className={styles.serviceCardDark}>
        <h3>번역 서비스 구성</h3>
        <div className={styles.serviceRows}>
          {serviceItems.map((item) => (
            <div key={item.title} className={styles.serviceRow}>
              <span>{item.title}</span>
              <strong>{item.tag}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
