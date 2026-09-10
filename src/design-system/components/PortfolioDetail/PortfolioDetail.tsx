import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ExternalLink, FileAudio, Pause, Play, X, XCircle } from 'lucide-react';
import type { PortfolioItem } from '../PortfolioCard';
import styles from './PortfolioDetail.module.css';

export type PortfolioDetailProps = { item: PortfolioItem; origin: DOMRect; onClose: () => void };

export function PortfolioDetail({ item, origin, onClose }: PortfolioDetailProps) {
  const [playing, setPlaying] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const motionFrames = () => {
    const panel = panelRef.current;
    if (!panel) return null;
    const target = panel.getBoundingClientRect();
    return [
      { transform: `translate(${origin.left - target.left}px, ${origin.top - target.top}px) scale(${origin.width / target.width}, ${origin.height / target.height})`, borderRadius: '1.25rem' },
      { transform: 'translate(0, 0) scale(1)', borderRadius: '1.5rem' },
    ];
  };

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!panel || !image || !content) return;
    document.body.style.overflow = 'hidden';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      const frames = motionFrames();
      if (frames) panel.animate(frames, { duration: 380, easing: 'cubic-bezier(.22,.9,.28,1)', fill: 'both' });
      image.animate([{ transform: 'scale(1.035)' }, { transform: 'scale(1)' }], { duration: 440, easing: 'cubic-bezier(.22,.9,.28,1)', fill: 'both' });
      content.animate([{ opacity: 0, transform: 'translateY(-28px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 280, delay: 90, easing: 'cubic-bezier(.22,.9,.28,1)', fill: 'both' });
    }
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && close();
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const close = async () => {
    if (closingRef.current) return;
    closingRef.current = true;
    const panel = panelRef.current;
    const content = contentRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (panel && content && !reduceMotion) {
      content.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-24px)' }], { duration: 110, easing: 'ease-in', fill: 'both' });
      const frames = motionFrames();
      if (frames) await panel.animate(frames.reverse(), { duration: 300, delay: 40, easing: 'cubic-bezier(.7,0,.78,.1)', fill: 'both' }).finished;
    }
    onClose();
  };

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <section ref={panelRef} className={styles.panel} role="dialog" aria-modal="true" aria-labelledby="portfolio-detail-title">
        <button type="button" className={styles.close} aria-label="포트폴리오 상세 닫기" onClick={close}><X size={20} /></button>
        <div ref={imageRef} className={styles.image} style={{ background: item.image }} role="img" aria-label={`${item.title} 프로젝트 이미지`}>
          <div className={styles.badges}>{item.languages.map((language) => <span key={language}>{language}</span>)}<span>{item.tone}</span></div>
          <button type="button" className={styles.playOverlay} aria-pressed={playing} aria-label={playing ? '샘플 일시정지' : '샘플 재생'} onClick={() => setPlaying((value) => !value)}>
            {playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
          </button>
          <div className={styles.audioBar}>
            <span className={styles.audioTrack}><span style={{ width: playing ? '42%' : '0%' }} /></span>
            <span className={styles.audioLabel}>{item.wavAttached ? '성우 샘플' : '샘플 준비 중'}</span>
          </div>
        </div>
        <div ref={contentRef} className={styles.content}>
          <div><span className={styles.kicker}>CASE STUDY · {item.category}</span><h2 id="portfolio-detail-title">{item.title}</h2></div>
          <div className={styles.meta}>{item.tags.map((tag) => <span key={tag}>#{tag}</span>)}{item.highlight && <span>{item.highlight}</span>}</div>
          <p>프로젝트 목표와 콘텐츠의 감정선에 맞춰 캐스팅부터 번역, 녹음과 사운드 후반 작업까지 하나의 팀으로 완성한 다국어 제작 사례입니다.</p>
          <dl className={styles.fileInfo}>
            <div>
              <dt><ExternalLink size={14} strokeWidth={1.75} /> 프로젝트 링크</dt>
              <dd>{item.link ? <a href={item.link} target="_blank" rel="noreferrer">{item.link}</a> : <span className={styles.fileInfoEmpty}>등록된 링크 없음</span>}</dd>
            </div>
            <div>
              <dt><FileAudio size={14} strokeWidth={1.75} /> WAV 원본 파일</dt>
              <dd className={item.wavAttached ? styles.fileInfoOk : styles.fileInfoEmpty}>
                {item.wavAttached ? <><CheckCircle2 size={14} strokeWidth={1.75} /> 첨부됨</> : <><XCircle size={14} strokeWidth={1.75} /> 첨부 안 됨</>}
              </dd>
            </div>
          </dl>
          <button type="button" className={styles.cta}>이런 프로젝트 의뢰하기 <ArrowUpRight size={18} /></button>
        </div>
      </section>
    </div>
  );
}
