import { AlignJustify, Globe, LayoutGrid, ShieldCheck } from 'lucide-react';
import { Button, SectionHeader } from '../../components';
import styles from './VoiceAIDataSection.module.css';

const features = [
  {
    icon: Globe,
    title: '다국어·다양한 화자 수집',
    description: '언어·억양·연령·성별이 고른 화자 풀에서 스크립트 발화부터 자유발화까지, 목적에 맞게 녹음합니다.',
  },
  {
    icon: ShieldCheck,
    title: '동의 기반 데이터',
    description: '화자 본인의 동의와 AI 학습 목적을 명시한 라이선스 계약을 거친 데이터만 제공합니다.',
  },
  {
    icon: AlignJustify,
    title: '전사·라벨링',
    description: '전사(transcription), 발화 태깅, 품질 검수를 거쳐 바로 학습에 쓸 수 있는 형태로 가공합니다.',
  },
  {
    icon: LayoutGrid,
    title: '목적별 맞춤 설계',
    description: 'TTS, 음성인식(ASR), 음성비서, 콜센터 IVR 등 프로젝트 목적에 맞춰 수집 스크립트를 설계합니다.',
  },
] as const;

export function VoiceAIDataSection({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  return (
    <section className={styles.section} aria-label="AI 학습용 음성 데이터 제작">
      <div className={styles.inner}>
        <SectionHeader
          headingLevel={headingLevel}
          eyebrow="VOICE AI DATA"
          title="AI 학습을 위한 음성 데이터 제작"
          description="30개국 1,000명 이상의 성우·화자 네트워크로, 음성 AI·TTS·음성인식 모델 학습에 필요한 다국어 음성 데이터를 수집하고 정제해 제공합니다. 데이터바우처 공식 공급기업(AI 다국어 데이터)으로 지정된 검증된 파트너입니다."
        />

        <div className={styles.grid}>
          {features.map(({ icon: Icon, title, description }) => (
            <article className={styles.card} key={title}>
              <span className={styles.icon}><Icon size={22} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <div className={styles.badgeRow}>
          <span className={styles.badgeIcon} aria-hidden="true">AI</span>
          <div>
            <strong>데이터바우처 공식 공급기업</strong>
            <p>AI 다국어 데이터 부문 공식 지정 공급기업</p>
          </div>
        </div>

        <div className={styles.ctaRow}>
          <Button size="lg">데이터 제작 문의하기</Button>
        </div>
      </div>
    </section>
  );
}
