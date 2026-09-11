import { AudioLines, Baby, Clapperboard, Gamepad2, Mic, Smile, type LucideIcon } from 'lucide-react';
import styles from './ActivityFields.module.css';
const fields: Record<string, { icon: LucideIcon; description: string }> = {
  내레이션: { icon: Mic, description: '브랜드의 메시지를 또렷하게' }, 광고: { icon: Clapperboard, description: '기억에 남는 브랜드 보이스' },
  게임: { icon: Gamepad2, description: '세계관에 생동감을 더하는 연기' }, NPC: { icon: Gamepad2, description: '개성이 살아 있는 캐릭터' },
  캐릭터: { icon: Smile, description: '목소리로 완성하는 캐릭터' }, 애니메이션: { icon: Smile, description: '이야기에 생명을 더하는 목소리' },
  키즈: { icon: Baby, description: '아이들과 눈높이를 맞춘 목소리' }, 더빙: { icon: AudioLines, description: '장면에 자연스럽게 녹아드는 연기' },
  연기: { icon: Smile, description: '감정을 섬세하게 전하는 연기' }, 다큐: { icon: Mic, description: '진정성 있게 전하는 이야기' },
};
export function ActivityFields({ tags }: { tags: string[] }) {
  return <section className={styles.panel}>
    <h2>주요 활동 분야</h2>
    <div className={styles.fields}>{tags.map(tag => {
      const { icon: Icon, description } = fields[tag] ?? { icon: Mic, description: '전문 보이스 녹음' };
      return <div className={styles.field} key={tag}><Icon size={29} strokeWidth={1.7} aria-hidden="true" /><h3>{tag}</h3><p>{description}</p></div>;
    })}</div>
  </section>;
}
