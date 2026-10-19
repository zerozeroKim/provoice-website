import { useT } from '@/lib/i18n';
import { SectionHeader } from '../../components';
import styles from './FAQSection.module.css';

const faqs = [
  {
    question: '어떤 서비스를 제공하나요?',
    questionEn: 'What services do you offer?',
    answer: '더빙·번역·사운드·AI 서비스 등 콘텐츠 로컬라이징 전반을 원스톱으로 지원합니다.',
    answerEn: 'We offer one-stop support across dubbing, translation, sound, and AI services for content localization.',
  },
  {
    question: '의뢰는 어떻게 진행되나요?',
    questionEn: 'How does the inquiry process work?',
    answer: '작업문의 폼을 제출하시면 담당 PM이 24시간 내 견적과 일정을 안내해드립니다.',
    answerEn: 'After you submit the work inquiry form, your dedicated PM will send a quote and schedule within 24 hours.',
  },
  {
    question: '비용은 어떻게 산정되나요?',
    questionEn: 'How is the cost calculated?',
    answer: '콘텐츠 분량, 언어 수, 납기에 따라 달라집니다. 작업문의 시 맞춤 견적을 받아보실 수 있습니다.',
    answerEn: 'It depends on content volume, number of languages, and turnaround time. Submit a work inquiry for a custom quote.',
  },
  {
    question: '원하는 성우를 직접 지정할 수 있나요?',
    questionEn: 'Can I choose a specific voice actor?',
    answer: '네, 성우검색에서 조건에 맞는 성우를 찾아 성우문의를 남기실 수 있습니다.',
    answerEn: 'Yes — use Find Voices to search by your criteria and send a contact request to the voice actor you want.',
  },
  {
    question: 'AI 음성도 실제 성우 목소리인가요?',
    questionEn: 'Is the AI voice a real voice actor’s voice?',
    answer: '네, 모든 AI 산출물은 성우 본인의 동의와 라이선스 계약을 거친 음성만 사용합니다.',
    answerEn: 'Yes — every AI output uses only voices the actor has consented to and licensed under contract.',
  },
  {
    question: '작업 기간은 얼마나 걸리나요?',
    questionEn: 'How long does a project take?',
    answer: '분량과 언어 수에 따라 다르며, 영상 자막은 3~5일, 다국어 더빙은 1~2주 내외가 일반적입니다.',
    answerEn: 'It varies by volume and language count — subtitling typically takes 3-5 days, multilingual dubbing 1-2 weeks.',
  },
] as const;

export function FAQSection() {
  const t = useT();
  return (
    <section className={styles.section} aria-label={t('자주 묻는 질문', 'Frequently asked questions')}>
      <div className={styles.inner}>
        <SectionHeader className={styles.header} eyebrow="FAQ" title={t('자주 묻는 질문', 'Frequently Asked Questions')} />
        <div className={styles.list}>
          {faqs.map((faq) => (
            <details className={styles.item} key={faq.question}>
              <summary className={styles.question}>
                <span>{t(faq.question, faq.questionEn)}</span>
                <span className={styles.chevron} aria-hidden="true" />
              </summary>
              <p className={styles.answer}>{t(faq.answer, faq.answerEn)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
