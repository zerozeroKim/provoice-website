import { useRef, useState } from 'react';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { Button, VoiceTraitChip, flagFor, talentAges, talentGenders, talentLanguages, talentTones, type TalentProfile } from '@/design-system';
import { useT } from '@/lib/i18n';
import { createDemoAudio } from '@/utils/demoAudio';
import styles from './VoiceProfile.module.css';

const lookup = (pairs: { ko: string; en: string }[], value: string) => pairs.find((pair) => pair.ko === value)?.en ?? value;
/** talent.tags는 TalentSections의 admin용 카테고리 필터 목록이 아니라 landingContent.tsx의 talentTagPool에서 옵니다 — 그 표기에 맞춘 번역입니다. */
const specialtyFieldEn: Record<string, string> = { 내레이션: 'Narration', 광고: 'Advertising', 캐릭터: 'Character', 게임: 'Game', NPC: 'NPC', 키즈: 'Kids', 더빙: 'Dubbing', 연기: 'Acting', 다큐: 'Documentary', 애니메이션: 'Animation' };
const seedFromName = (name: string) => name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
const formatTime = (seconds: number) => {
  const safe = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const m = Math.floor(safe / 60);
  const s = Math.floor(safe % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

export function VoiceProfile({ talent }: { talent: TalentProfile }) {
  const t = useT();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const demoSrc = createDemoAudio(seedFromName(talent.name));
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const toggleDemo = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play();
    else audio.pause();
  };

  const languageLabels = talent.locale.split(' / ').map((code) => {
    const match = talentLanguages.find((item) => item.code === code);
    return match ? t(match.ko, match.en) : code;
  });

  return (
    <section className={styles.hero} aria-labelledby="voice-actor-name">
      <div className={styles.identity}>
        <span className={styles.avatar}>
          {talent.avatarSrc
            ? <img src={talent.avatarSrc} alt={t(`${talent.name} 프로필 예시 사진`, `${talent.name} sample profile photo`)} width={112} height={112} />
            : <span className={styles.avatarFlag} aria-hidden="true">{flagFor(talent.locale) ?? '🎙️'}</span>}
        </span>
        <div className={styles.body}>
          <h1 id="voice-actor-name">{talent.name}</h1>

          <div className={styles.demoPlayer}>
            <audio ref={audioRef} src={demoSrc} preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)} />
            <button type="button" className={styles.demoPlayButton} onClick={toggleDemo} aria-pressed={playing} aria-label={playing ? t('데모릴 일시정지', 'Pause demo reel') : t('데모릴 재생', 'Play demo reel')}>
              {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            </button>
            <span className={styles.demoPlayerLabel}>{t('데모릴', 'Demo Reel')}</span>
            <span className={styles.demoProgressTrack}><span style={{ width: `${progress}%` }} /></span>
            <span className={styles.demoPlayerTime}>{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>

          <dl className={styles.facts}>
            <div><dt>{t('성별', 'Gender')}</dt><dd>{talent.gender ? t(talent.gender, lookup(talentGenders, talent.gender)) : t('미등록', 'Not set')}</dd></div>
            <div><dt>{t('연령대', 'Age Range')}</dt><dd>{talent.ageRange ? t(talent.ageRange, lookup(talentAges, talent.ageRange)) : t('미등록', 'Not set')}</dd></div>
            <div><dt>{t('활동 언어', 'Languages')}</dt><dd>{languageLabels.join(' · ')}</dd></div>
            <div><dt>{t('전문 분야', 'Specialty Field')}</dt><dd>{talent.tags.map(tag => <VoiceTraitChip key={tag} label={t(tag, specialtyFieldEn[tag] ?? tag)} />)}</dd></div>
            <div><dt>{t('톤', 'Tone')}</dt><dd>{talent.tones?.length ? talent.tones.map(tone => <span key={tone} className={styles.tone}>{t(tone, lookup(talentTones, tone))}</span>) : <span className={styles.empty}>{t('미등록', 'Not set')}</span>}</dd></div>
            <div><dt>{t('특기', 'Specialty')}</dt><dd>{talent.specialty ?? t('미등록', 'Not set')}</dd></div>
          </dl>
        </div>
      </div>
      <aside className={styles.contact}>
        <Button className={styles.contactButton} trailingIcon={<ArrowRight size={18} />} onClick={() => { window.location.href = 'https://pf.kakao.com/_xfNjDK'; }}>{t('성우문의', 'Contact Voice Actor')}</Button>
      </aside>
    </section>
  );
}
