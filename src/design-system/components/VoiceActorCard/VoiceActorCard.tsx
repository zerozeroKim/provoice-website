import type { HTMLAttributes, ReactNode } from 'react';
import { VoiceTraitChip } from '../VoiceTraitChip';
import styles from './VoiceActorCard.module.css';

export type VoiceActorCardProps = Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> & {
  name: string;
  nickname?: string;
  avatarSrc?: string;
  flag?: ReactNode;
  flagLabel?: string;
  verified?: boolean;
  best?: boolean;
  tags?: string[];
  duration: number;
  currentTime?: number;
  playing?: boolean;
  onPlayToggle?: () => void;
  /** 비로그인 사용자에게 샘플을 잠금 상태로 보여줍니다. */
  locked?: boolean;
  onUnlock?: () => void;
  /** 로그인한 회원에게만 노출되는 다운로드 버튼입니다. */
  canDownload?: boolean;
  onDownload?: () => void;
  /** 성우 본인 화면에서 다운로드 횟수를 노출할 때 전달합니다. */
  downloadCount?: number;
};

const formatTime = (seconds: number) => {
  const safe = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const m = Math.floor(safe / 60);
  const s = Math.floor(safe % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const VerifiedIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor" /><path d="M6 10.3 8.6 13 14 7.3" stroke="var(--neutral-0)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8.5" r="3.25" stroke="currentColor" strokeWidth="1.75" /><path d="M5 19c1.2-3.2 4-5 7-5s5.8 1.8 7 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>
);
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" /></svg>
);
const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" /><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" /></svg>
);
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.75" /><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>
);
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v11m0 0 3.5-3.5M12 15l-3.5-3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 18.5h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>
);

export function VoiceActorCard({ name, nickname, avatarSrc, flag, flagLabel, verified = false, best = false, tags = [], duration, currentTime = 0, playing = false, onPlayToggle, locked = false, onUnlock, canDownload = false, onDownload, downloadCount, className = '', ...props }: VoiceActorCardProps) {
  const progress = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  return (
    <div data-component="VoiceActorCard" className={`${styles.card} ${className}`} {...props}>
      <div className={styles.header}>
        <span className={styles.avatar}>
          {avatarSrc ? <img src={avatarSrc} alt="" /> : <span className={styles.avatarFallback}><PersonIcon /></span>}
        </span>

        <span className={styles.profileMain}>
          <span className={styles.nameLine}>
            <span className={styles.name}>{name}</span>
            {verified && <span className={styles.verified} role="img" aria-label="프로보이스 인증 성우"><VerifiedIcon /></span>}
          </span>
          {(nickname || flag) && (
            <span className={styles.metaLine}>
              {nickname && <span>{nickname}</span>}
              {nickname && flag && <span className={styles.metaDivider} aria-hidden="true">|</span>}
              {flag && <span>{flag} {flagLabel}</span>}
            </span>
          )}
        </span>

        {best && <span className={styles.best}>BEST</span>}
      </div>

      <ul className={styles.traits}>
        {tags.map((tag) => <li key={tag}><VoiceTraitChip label={tag} /></li>)}
      </ul>

      <div className={styles.audioGroup}>
        {locked ? (
          <button type="button" className={`${styles.audioSurface} ${styles.lockedPlayer}`} onClick={onUnlock}>
            <span className={styles.lockIcon} aria-hidden="true"><LockIcon /></span>
            <span className={styles.lockedText}>로그인하고 샘플 듣기</span>
            <span className={styles.time}>{formatTime(duration)}</span>
          </button>
        ) : (
          <div className={`${styles.audioSurface} ${styles.player}`}>
            <button type="button" className={styles.playButton} aria-label={playing ? '일시정지' : '샘플 재생'} aria-pressed={playing} onClick={onPlayToggle}>
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <span className={styles.sampleMain}>
              <span className={styles.sampleMeta}><span>보이스 샘플</span><span>{formatTime(currentTime)} / {formatTime(duration)}</span></span>
              <span className={styles.progressTrack} aria-hidden="true"><span style={{ width: `${progress}%` }} /></span>
            </span>
            {canDownload && <button type="button" className={styles.downloadButton} aria-label="샘플 다운로드" onClick={onDownload}><DownloadIcon /></button>}
          </div>
        )}

        {!locked && typeof downloadCount === 'number' && (
          <p className={styles.downloadStat}><DownloadIcon />다운로드 {downloadCount}회</p>
        )}
      </div>
    </div>
  );
}
