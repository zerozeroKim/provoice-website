import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, Bookmark, Check, Download, Heart, Pause, Play, Share2, X } from 'lucide-react';
import type { PortfolioItem } from '../PortfolioCard';
import styles from './PortfolioDetail.module.css';

export type PortfolioDetailProps = { item: PortfolioItem; origin: DOMRect; onClose: () => void };

export function PortfolioDetail({ item, origin, onClose }: PortfolioDetailProps) {
  const [playing, setPlaying] = useState(false);
  const storageKey = `provoice-portfolio-${encodeURIComponent(item.title)}`;
  const [saved, setSaved] = useState(() => localStorage.getItem(`${storageKey}-saved`) === 'true');
  const [liked, setLiked] = useState(() => localStorage.getItem(`${storageKey}-liked`) === 'true');
  const [copied, setCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
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

  const togglePreference = (kind: 'saved' | 'liked', value: boolean) => {
    localStorage.setItem(`${storageKey}-${kind}`, String(value));
    if (kind === 'saved') setSaved(value);
    else setLiked(value);
  };

  const share = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('portfolio', item.title);
    const shareUrl = url.toString();
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const input = document.createElement('textarea');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const downloadAudio = () => {
    if (!item.audioSrc) return;
    const anchor = document.createElement('a');
    anchor.href = item.audioSrc;
    anchor.download = `${item.title}.wav`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play();
    else audio.pause();
  };

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <section ref={panelRef} className={styles.panel} role="dialog" aria-modal="true" aria-labelledby="portfolio-detail-title">
        <button type="button" className={styles.close} aria-label="포트폴리오 상세 닫기" onClick={close}><X size={20} /></button>
        <div ref={imageRef} className={styles.image} style={{ background: item.image }} role="img" aria-label={`${item.title} 프로젝트 이미지`}>
          <div className={styles.badges}>{item.languages.map((language) => <span key={language}>{language}</span>)}{item.tags.slice(0, 2).map((tag) => <span key={tag}>#{tag}</span>)}</div>
          {item.audioSrc && <audio ref={audioRef} src={item.audioSrc} preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} />}
          <div className={styles.audioBar}>
            <button type="button" className={styles.audioPlay} disabled={!item.audioSrc} aria-pressed={playing} aria-label={item.audioSrc ? (playing ? '샘플 일시정지' : '샘플 재생') : '샘플 준비 중'} onClick={toggleAudio}>
              {playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
            </button>
            <span className={styles.audioLabel}>{playing ? '재생 중' : item.audioSrc ? '성우 샘플 듣기' : '샘플 준비 중'}</span>
            <span className={styles.audioTrack}><span style={{ width: playing ? '42%' : '0%' }} /></span>
          </div>
        </div>
        <div ref={contentRef} className={styles.content}>
          <div className={styles.intro}>
            <h2 id="portfolio-detail-title">{item.title}</h2>
            <div className={styles.meta}>{item.tags.map((tag) => <span key={tag}>#{tag}</span>)}{item.highlight && <span>{item.highlight}</span>}</div>
            <p>프로젝트 목표와 콘텐츠의 감정선에 맞춰 캐스팅부터 번역, 녹음과 사운드 후반 작업까지 하나의 팀으로 완성한 다국어 제작 사례입니다.</p>
          </div>
          <div className={styles.actionGrid} aria-label="포트폴리오 작업">
            <button type="button" className={saved ? styles.actionActive : ''} aria-pressed={saved} onClick={() => togglePreference('saved', !saved)}><Bookmark fill={saved ? 'currentColor' : 'none'} />{saved ? '저장됨' : '저장하기'}</button>
            <button type="button" className={liked ? styles.actionActive : ''} aria-pressed={liked} onClick={() => togglePreference('liked', !liked)}><Heart fill={liked ? 'currentColor' : 'none'} />{liked ? '좋아요 취소' : '좋아요'}</button>
            <button type="button" onClick={share}>{copied ? <Check /> : <Share2 />}{copied ? '링크 복사됨' : '공유하기'}</button>
            <button type="button" disabled={!item.audioSrc} onClick={downloadAudio} title={!item.audioSrc ? '다운로드할 음원이 준비되지 않았습니다' : undefined}><Download />{item.audioSrc ? '음원 다운로드' : '음원 준비 중'}</button>
          </div>
          {item.link && <a className={styles.projectLink} href={item.link} target="_blank" rel="noreferrer">프로젝트 원문 보기 <ArrowUpRight size={15} /></a>}
        </div>
      </section>
    </div>
  );
}
