import { useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from 'react';
import { Pause, Play } from 'lucide-react';
import { PixelCard } from '../PixelCard';
import styles from './PortfolioCard.module.css';

export type PortfolioItem<T extends string = string> = {
  category: T;
  title: string;
  languages: string[];
  tone: string;
  tags: string[];
  highlight?: string;
  image?: string;
  /** 프로젝트를 의뢰한 고객사명. 갤러리형(imageOnly) 카드는 hover 시 제목과 함께 보여줍니다. */
  client?: string;
  /** 프로젝트 상세 페이지 등 외부 링크. */
  link?: string;
  /** WAV 원본 파일 첨부 여부. */
  wavAttached?: boolean;
  /** 상세 팝업에서 재생·다운로드할 실제 음원 파일 URL. */
  audioSrc?: string;
};

export type PortfolioCardProps = {
  title: string;
  languages: string[];
  category: string;
  tags: string[];
  highlight?: string;
  image?: string;
  client?: string;
  audioSrc?: string;
  /** 제목·태그 없이 이미지만 채워서 보여주는 갤러리형 타일입니다. */
  imageOnly?: boolean;
  onOpen?: (origin: DOMRect) => void;
  className?: string;
};

export function PortfolioCard({ title, languages, category, tags, highlight, image, client, audioSrc, imageOnly = false, onOpen, className = '' }: PortfolioCardProps) {
  const [activating, setActivating] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const thumbnailStyle = image ? ({ '--portfolio-image': image } as CSSProperties) : undefined;
  const open = (element?: HTMLElement) => {
    if (!onOpen || activating) return;
    setActivating(true);
    const origin = element?.getBoundingClientRect();
    window.setTimeout(() => {
      setActivating(false);
      if (origin) onOpen(origin);
    }, 70);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(event.currentTarget); }
  };
  const toggleAudio = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play();
    else audio.pause();
  };

  return (
    <PixelCard as="article" variant="dark" role={onOpen ? 'button' : undefined} tabIndex={onOpen ? 0 : undefined} onClick={(event) => open(event.currentTarget)} onKeyDown={onKeyDown} className={`${styles.card} ${imageOnly ? styles.imageOnlyCard : ''} ${onOpen ? styles.interactive : ''} ${activating ? styles.activating : ''} ${className}`}>
      <div className={`${styles.thumbnail} ${imageOnly ? styles.thumbnailFill : ''}`} style={thumbnailStyle} role={image ? 'img' : undefined} aria-label={image ? `${title} 프로젝트 썸네일` : undefined}>
        <div className={styles.languages}>
          {languages.map((language) => <span key={language}>{language}</span>)}
        </div>
        <span className={styles.category}>{category}</span>
        {imageOnly && audioSrc && <>
          <audio ref={audioRef} src={audioSrc} preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} />
          <button type="button" className={styles.previewPlay} aria-label={playing ? `${title} 미리듣기 일시정지` : `${title} 미리듣기 재생`} aria-pressed={playing} onClick={toggleAudio}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}<span>{playing ? '재생 중' : '샘플 듣기'}</span></button>
        </>}
        {imageOnly && (
          <div className={styles.hoverInfo} aria-hidden="true">
            <strong>{title}</strong>
            {client && <span>{client}</span>}
          </div>
        )}
      </div>
      {imageOnly && <h3 className={styles.visuallyHidden}>{title}</h3>}
      {!imageOnly && (
        <div className={styles.body}>
          <h3>{title}</h3>
          <div className={styles.tags}>
            {tags.map((tag) => <span key={tag}>{tag}</span>)}
            {highlight && <span className={styles.highlight}>{highlight}</span>}
          </div>
        </div>
      )}
    </PixelCard>
  );
}

export type PortfolioFilterProps<T extends string> = {
  items: readonly T[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
  className?: string;
};

export function PortfolioFilter<T extends string>({ items, value, onChange, ariaLabel = '포트폴리오 카테고리', className = '' }: PortfolioFilterProps<T>) {
  return (
    <div className={`${styles.filter} ${className}`} role="tablist" aria-label={ariaLabel}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          role="tab"
          aria-selected={value === item}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
