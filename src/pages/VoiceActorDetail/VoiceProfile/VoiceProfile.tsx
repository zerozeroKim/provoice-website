import { ArrowRight } from 'lucide-react';
import { Button, VoiceTraitChip, flagFor, type TalentProfile } from '@/design-system';
import styles from './VoiceProfile.module.css';

export function VoiceProfile({ talent }: { talent: TalentProfile }) {
  return (
    <section className={styles.hero} aria-labelledby="voice-actor-name">
      <div className={styles.identity}>
        <span className={styles.avatar}>
          {talent.avatarSrc
            ? <img src={talent.avatarSrc} alt={`${talent.name} 프로필 예시 사진`} width={112} height={112} />
            : <span className={styles.avatarFlag} aria-hidden="true">{flagFor(talent.locale) ?? '🎙️'}</span>}
        </span>
        <div className={styles.body}>
          <h1 id="voice-actor-name">{talent.name}</h1>
          <dl className={styles.facts}>
            <div><dt>성별</dt><dd>{talent.gender ?? '미등록'}</dd></div>
            <div><dt>연령대</dt><dd>{talent.ageRange ?? '미등록'}</dd></div>
            <div><dt>카테고리</dt><dd>{talent.tags.map(tag => <VoiceTraitChip key={tag} label={tag} />)}</dd></div>
            <div><dt>톤</dt><dd>{talent.tones?.length ? talent.tones.map(tone => <span key={tone} className={styles.tone}>{tone}</span>) : <span className={styles.empty}>미등록</span>}</dd></div>
            <div><dt>특기</dt><dd>{talent.specialty ?? '미등록'}</dd></div>
          </dl>
        </div>
      </div>
      <aside className={styles.contact}>
        <Button className={styles.contactButton} trailingIcon={<ArrowRight size={18} />} onClick={() => { window.location.href = 'https://pf.kakao.com/_xfNjDK'; }}>성우문의</Button>
      </aside>
    </section>
  );
}
