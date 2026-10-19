import { AudioLines, Baby, Clapperboard, Gamepad2, Mic, Smile, type LucideIcon } from 'lucide-react';
import { useT } from '@/lib/i18n';
import styles from './ActivityFields.module.css';
const fields: Record<string, { icon: LucideIcon; description: string; descriptionEn: string; labelEn: string }> = {
  내레이션: { icon: Mic, description: '브랜드의 메시지를 또렷하게', descriptionEn: "Delivering your brand's message with clarity", labelEn: 'Narration' },
  광고: { icon: Clapperboard, description: '기억에 남는 브랜드 보이스', descriptionEn: 'A brand voice people remember', labelEn: 'Advertising' },
  게임: { icon: Gamepad2, description: '세계관에 생동감을 더하는 연기', descriptionEn: 'Performances that bring a world to life', labelEn: 'Game' },
  NPC: { icon: Gamepad2, description: '개성이 살아 있는 캐릭터', descriptionEn: 'Characters with real personality', labelEn: 'NPC' },
  캐릭터: { icon: Smile, description: '목소리로 완성하는 캐릭터', descriptionEn: 'A character completed by voice', labelEn: 'Character' },
  애니메이션: { icon: Smile, description: '이야기에 생명을 더하는 목소리', descriptionEn: 'A voice that brings a story to life', labelEn: 'Animation' },
  키즈: { icon: Baby, description: '아이들과 눈높이를 맞춘 목소리', descriptionEn: "A voice at kids' eye level", labelEn: 'Kids' },
  더빙: { icon: AudioLines, description: '장면에 자연스럽게 녹아드는 연기', descriptionEn: 'A performance that blends naturally into the scene', labelEn: 'Dubbing' },
  연기: { icon: Smile, description: '감정을 섬세하게 전하는 연기', descriptionEn: 'Performances that convey emotion delicately', labelEn: 'Acting' },
  다큐: { icon: Mic, description: '진정성 있게 전하는 이야기', descriptionEn: 'Stories told with authenticity', labelEn: 'Documentary' },
};
export function ActivityFields({ tags }: { tags: string[] }) {
  const t = useT();
  return <section className={styles.panel}>
    <h2>{t('주요 활동 분야', 'Main Areas of Work')}</h2>
    <div className={styles.fields}>{tags.map(tag => {
      const field = fields[tag];
      const Icon = field?.icon ?? Mic;
      const description = field ? t(field.description, field.descriptionEn) : t('전문 보이스 녹음', 'Professional voice recording');
      const label = field ? t(tag, field.labelEn) : tag;
      return <div className={styles.field} key={tag}><Icon size={29} strokeWidth={1.7} aria-hidden="true" /><h3>{label}</h3><p>{description}</p></div>;
    })}</div>
  </section>;
}
