import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { createDemoAudio } from '@/utils/demoAudio';
import { useT } from '@/lib/i18n';
import styles from './SampleVoiceSection.module.css';

/** talent.tags(전문 분야)와 같은 표기 기준 — VoiceProfile의 specialtyFieldEn과 동일한 목록입니다. */
const categoryLabelEn: Record<string, string> = { 내레이션: 'Narration', 광고: 'Advertising', 캐릭터: 'Character', 게임: 'Game', NPC: 'NPC', 키즈: 'Kids', 더빙: 'Dubbing', 연기: 'Acting', 다큐: 'Documentary', 애니메이션: 'Animation' };

function SampleCell({ seed, index }: { seed: number; index: number }) {
  const t = useT();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const src = createDemoAudio(seed + index, 1.8 + (index % 3) * 0.5);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play();
    else audio.pause();
  };

  return (
    <button type="button" className={styles.cell} onClick={toggle} aria-pressed={playing}>
      <audio ref={audioRef} src={src} preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} />
      <span className={styles.cellIcon} aria-hidden="true">{playing ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}</span>
      <span className={styles.cellLabel}>{t(`음성 ${index + 1}`, `Sample ${index + 1}`)}</span>
    </button>
  );
}

export type SampleVoiceGroup = { category: string; count: number };

/** 성우 기본 정보 영역 아래 "샘플 음성 영역": 분야별로 묶어 4개씩 그리드로 보여줍니다. */
export function SampleVoiceSection({ groups, seed }: { groups: SampleVoiceGroup[]; seed: number }) {
  const t = useT();
  if (groups.length === 0) return null;

  return (
    <section className={styles.panel}>
      <h2>{t('샘플 음성', 'Voice Samples')}</h2>
      <div className={styles.groups}>
        {groups.map((group, groupIndex) => (
          <div className={styles.group} key={group.category}>
            <div className={styles.groupHead}>
              <h3>{t(group.category, categoryLabelEn[group.category] ?? group.category)}</h3>
              <span className={styles.count}>{group.count}</span>
            </div>
            <div className={styles.grid}>
              {Array.from({ length: group.count }, (_, index) => (
                <SampleCell key={index} seed={seed + groupIndex * 100} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
