import { ArrowUpRight, Languages, Megaphone, Mic2 } from 'lucide-react';
import { useT } from '@/lib/i18n';
import { SectionHeader } from '../../components';
import styles from './OtherServicesSection.module.css';
import type { ServiceItem } from './types';

const icons: Record<string, typeof Mic2> = {
  dubbing: Mic2,
  corporate: Megaphone,
  translation: Languages,
};

/** 서비스 페이지들 사이의 교차 탐색용 섹션: 지금 보고 있는 서비스 외 나머지 서비스로 바로 이동합니다. */
export function OtherServicesSection({ services, currentSlug }: { services: ServiceItem[]; currentSlug: string }) {
  const t = useT();
  const otherServices = services.filter((service) => service.slug !== currentSlug);
  if (otherServices.length === 0) return null;

  return (
    <section className={styles.otherServicesSection} aria-label={t('다른 서비스', 'More services')}>
      <div className={styles.inner}>
        <SectionHeader className={styles.header} eyebrow="MORE SERVICES" title={t('다른 서비스도 함께 확인해보세요', 'Explore our other services too')} />
        <div className={styles.grid}>
          {otherServices.map((service) => {
            const Icon = service.slug ? icons[service.slug] : undefined;
            const href = service.href ?? (service.slug ? `?service=${service.slug}#client` : '#client');
            return (
              <a key={service.title} className={styles.card} href={href}>
                {Icon && <span className={styles.icon}><Icon strokeWidth={1.75} /></span>}
                <span className={styles.cardBody}>
                  <strong>{t(service.title, service.titleEn ?? service.title)}</strong>
                  <span className={styles.cardDescription}>{t(service.description, service.descriptionEn ?? service.description)}</span>
                </span>
                <ArrowUpRight className={styles.arrow} size={18} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
