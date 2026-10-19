import { useEffect, useState } from 'react';
import { useT } from '@/lib/i18n';
import { Button, Modal, SectionHeader, ServiceCard } from '../../components';
import styles from './ServiceSection.module.css';
import type { ServiceItem } from './types';

const SERVICE_QUERY_KEY = 'service';

export function ServiceSection({ services }: { services: ServiceItem[] }) {
  const t = useT();
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(null);
  const resolved = services.map((service) => ({
    ...service,
    title: t(service.title, service.titleEn ?? service.title),
    description: t(service.description, service.descriptionEn ?? service.description),
    badge: service.badge ? t(service.badge, service.badgeEn ?? service.badge) : service.badge,
    link: service.link ? t(service.link, service.linkEn ?? service.link) : service.link,
  }));
  const selectedService = selectedServiceSlug ? resolved.find((service) => service.slug === selectedServiceSlug) ?? null : null;

  useEffect(() => {
    const requestedSlug = new URLSearchParams(window.location.search).get(SERVICE_QUERY_KEY);
    if (!requestedSlug) return;
    const match = services.find((service) => service.slug === requestedSlug);
    if (!match) return;
    setSelectedServiceSlug(match.slug ?? null);
    window.history.replaceState(null, '', window.location.pathname + window.location.hash);
  }, [services]);

  const goToService = (service: ServiceItem) => {
    if (service.href) { window.location.hash = service.href; return; }
    setSelectedServiceSlug(service.slug ?? null);
  };

  return (
    <>
      <section className={styles.serviceSection} aria-label={t('서비스 소개', 'Our services')}>
        <div className={styles.serviceInner}>
          <SectionHeader
            className={styles.serviceHeader}
            eyebrow="SERVICE"
            title={t('하나의 팀, 원스톱 로컬라이징', 'One team, one-stop localization')}
            description={t('캐스팅부터 번역, 사운드까지 — 콘텐츠 하나를 세계 여러 시장에 내보낼 수 있도록 설계된 서비스를 제공합니다.', 'From casting to translation to sound — services designed to take a single piece of content into markets worldwide.')}
          />
          <div className={styles.serviceGrid}>
            {resolved.map((service) => <ServiceCard key={service.title} {...service} badgeAccent={service.featured} onOpen={() => goToService(service)} />)}
          </div>
        </div>
      </section>
      <Modal open={Boolean(selectedService)} title={selectedService?.title ?? t('서비스 안내', 'Service details')} onClose={() => setSelectedServiceSlug(null)}>
        {selectedService && (
          <div className={styles.serviceModalBody}>
            {selectedService.imageSrc && <img src={selectedService.imageSrc} alt={selectedService.imageAlt ?? ''} />}
            <p>{selectedService.description}</p>
            <Button fullWidth onClick={() => setSelectedServiceSlug(null)}>{t('프로젝트 문의하기', 'Inquire about this project')}</Button>
            <div className={styles.otherServices}>
              <span className={styles.otherServicesLabel}>{t('다른 서비스 보기', 'See other services')}</span>
              <div className={styles.otherServiceList}>
                {resolved.filter((service) => service.slug !== selectedService.slug).map((service) => (
                  <button key={service.title} type="button" className={styles.otherServiceChip} onClick={() => goToService(service)}>
                    {service.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
