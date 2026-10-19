import { ArrowRight } from 'lucide-react';
import { Button, VoiceTraitChip, flagFor, talentAges, talentGenders, talentLanguages, talentTones, type TalentProfile } from '@/design-system';
import { useT } from '@/lib/i18n';
import styles from './VoiceProfile.module.css';

const lookup = (pairs: { ko: string; en: string }[], value: string) => pairs.find((pair) => pair.ko === value)?.en ?? value;
/** talent.tags는 TalentSections의 admin용 카테고리 필터 목록이 아니라 landingContent.tsx의 talentTagPool에서 옵니다 — 그 표기에 맞춘 번역입니다. */
const specialtyFieldEn: Record<string, string> = { 내레이션: 'Narration', 광고: 'Advertising', 캐릭터: 'Character', 게임: 'Game', NPC: 'NPC', 키즈: 'Kids', 더빙: 'Dubbing', 연기: 'Acting', 다큐: 'Documentary', 애니메이션: 'Animation' };

export function VoiceProfile({ talent }: { talent: TalentProfile }) {
  const t = useT();
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
