import { ArrowRight, BriefcaseBusiness, Heart, ShieldCheck, Star } from 'lucide-react';
import { Button, VoiceTraitChip, type TalentProfile } from '@/design-system';
import styles from './VoiceProfile.module.css';

const languages: Record<string, string> = { KO: '한국어', EN: '영어', JP: '일본어', ZH: '중국어', ES: '스페인어', AR: '아랍어', FR: '프랑스어', DE: '독일어', RU: '러시아어', PT: '포르투갈어', IT: '이탈리아어', TR: '터키어', VI: '베트남어', ID: '인도네시아어', TH: '태국어' };

export function VoiceProfile({ talent, rating }: { talent: TalentProfile; rating: number }) {
  return (
    <section className={styles.hero} aria-labelledby="voice-actor-name">
      <div className={styles.identity}>
        <img className={styles.avatar} src={talent.avatarSrc} alt={`${talent.name} 프로필 예시 사진`} width={112} height={112} />
        <div className={styles.body}>
          {talent.verified && <span className={styles.verified}><ShieldCheck size={15} /> 프로보이스 등록 성우</span>}
          <h1 id="voice-actor-name">{talent.name}</h1>
          <dl className={styles.facts}>
            <div><dt>성별</dt><dd>{talent.gender ?? '미등록'}</dd></div>
            <div><dt>언어</dt><dd>{talent.locale.split(' / ').map(code => languages[code] ?? code).join(' · ')}</dd></div>
            <div><dt>카테고리</dt><dd>{talent.tags.map(tag => <VoiceTraitChip key={tag} label={tag} />)}</dd></div>
            <div><dt>톤</dt><dd>{talent.tones?.length ? talent.tones.map(tone => <span key={tone} className={styles.tone}>{tone}</span>) : <span className={styles.empty}>미등록</span>}</dd></div>
          </dl>
        </div>
      </div>
      <aside className={styles.contact}>
        <Button className={styles.contactButton} trailingIcon={<ArrowRight size={18} />} onClick={() => { window.location.href = 'https://pf.kakao.com/_xfNjDK'; }}>성우 컨택 문의</Button>
      </aside>
      <div className={styles.footer}>
        <span className={styles.note}>프로필 통계 · 프로젝트 · 리뷰는 예시 데이터입니다</span>
        <dl className={styles.stats}>
          <div><dt><Heart size={17} /> 관심</dt><dd>{talent.favorites?.toLocaleString() ?? '—'}</dd></div>
          <div><dt><Star size={17} /> 평점</dt><dd>{rating.toFixed(1)}<span> / 5</span></dd></div>
          <div><dt><BriefcaseBusiness size={17} /> 작업 수</dt><dd>{talent.completedProjects?.toLocaleString() ?? '—'}</dd></div>
        </dl>
      </div>
    </section>
  );
}
