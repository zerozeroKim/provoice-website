import { AlignJustify, Globe, LayoutGrid, ShieldCheck } from 'lucide-react';
import { useT } from '@/lib/i18n';
import { Button, SectionHeader } from '../../components';
import styles from './VoiceAIDataSection.module.css';

const features = [
  {
    icon: Globe,
    title: '다국어·다양한 화자 수집',
    titleEn: 'Multilingual, Diverse Speakers',
    description: '언어·억양·연령·성별이 고른 화자 풀에서 스크립트 발화부터 자유발화까지, 목적에 맞게 녹음합니다.',
    descriptionEn: 'Recorded to fit the purpose, from scripted to free-form speech, from a speaker pool balanced across language, accent, age and gender.',
  },
  {
    icon: ShieldCheck,
    title: '동의 기반 데이터',
    titleEn: 'Consent-Based Data',
    description: '화자 본인의 동의와 AI 학습 목적을 명시한 라이선스 계약을 거친 데이터만 제공합니다.',
    descriptionEn: 'We only provide data covered by the speaker’s own consent and a license agreement that explicitly states its AI training purpose.',
  },
  {
    icon: AlignJustify,
    title: '전사·라벨링',
    titleEn: 'Transcription & Labeling',
    description: '전사(transcription), 발화 태깅, 품질 검수를 거쳐 바로 학습에 쓸 수 있는 형태로 가공합니다.',
    descriptionEn: 'Processed through transcription, utterance tagging and quality review into a form ready for training.',
  },
  {
    icon: LayoutGrid,
    title: '목적별 맞춤 설계',
    titleEn: 'Tailored by Use Case',
    description: 'TTS, 음성인식(ASR), 음성비서, 콜센터 IVR 등 프로젝트 목적에 맞춰 수집 스크립트를 설계합니다.',
    descriptionEn: 'Collection scripts are designed to fit the project’s purpose — TTS, speech recognition (ASR), voice assistants, call-center IVR, and more.',
  },
] as const;

export function VoiceAIDataSection({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const t = useT();
  return (
    <section className={styles.section} aria-label={t('AI 학습용 음성 데이터 제작', 'Voice data production for AI training')}>
      <div className={styles.inner}>
        <SectionHeader
          headingLevel={headingLevel}
          eyebrow="VOICE AI DATA"
          title={t('AI 학습을 위한 음성 데이터 제작', 'Voice Data Production for AI Training')}
          description={t('30개국 1,000명 이상의 성우·화자 네트워크로, 음성 AI·TTS·음성인식 모델 학습에 필요한 다국어 음성 데이터를 수집하고 정제해 제공합니다. 데이터바우처 공식 공급기업(AI 다국어 데이터)으로 지정된 검증된 파트너입니다.', 'With a network of 1,000+ voice actors and speakers across 30 countries, we collect and refine the multilingual voice data needed to train voice AI, TTS and speech-recognition models. We are a verified partner designated as an official Data Voucher supplier (AI multilingual data).')}
        />

        <div className={styles.grid}>
          {features.map(({ icon: Icon, title, titleEn, description, descriptionEn }) => (
            <article className={styles.card} key={title}>
              <span className={styles.icon}><Icon size={22} /></span>
              <h3>{t(title, titleEn)}</h3>
              <p>{t(description, descriptionEn)}</p>
            </article>
          ))}
        </div>

        <div className={styles.badgeRow}>
          <span className={styles.badgeIcon} aria-hidden="true">AI</span>
          <div>
            <strong>{t('데이터바우처 공식 공급기업', 'Official Data Voucher Supplier')}</strong>
            <p>{t('AI 다국어 데이터 부문 공식 지정 공급기업', 'Officially designated supplier for the AI multilingual data category')}</p>
          </div>
        </div>

        <div className={styles.ctaRow}>
          <Button size="lg">{t('데이터 제작 문의하기', 'Inquire About Data Production')}</Button>
        </div>
      </div>
    </section>
  );
}
