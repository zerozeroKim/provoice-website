import { useState } from 'react';
import { Button, Modal, SectionHeader, ServiceCard } from '../../components';
import styles from './ServiceSection.module.css';
import type { ServiceItem } from './types';

export function ServiceSection({ services }: { services: ServiceItem[] }) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  return (
    <>
      <section className={styles.serviceSection} aria-label="서비스 소개">
        <div className={styles.serviceInner}>
          <SectionHeader
            className={styles.serviceHeader}
            eyebrow="SERVICE"
            title="하나의 팀, 원스톱 로컬라이징"
            description="캐스팅부터 번역, 사운드까지 — 콘텐츠 하나를 세계 여러 시장에 내보낼 수 있도록 설계된 서비스를 제공합니다."
          />
          <div className={styles.serviceGrid}>
            {services.map((service) => <ServiceCard key={service.title} {...service} onOpen={() => setSelectedService(service)} />)}
          </div>
        </div>
      </section>
      <Modal open={Boolean(selectedService)} title={selectedService?.title ?? '서비스 안내'} onClose={() => setSelectedService(null)}>
        {selectedService && (
          <div className={styles.serviceModalBody}>
            {selectedService.imageSrc && <img src={selectedService.imageSrc} alt={selectedService.imageAlt ?? ''} />}
            <p>{selectedService.description}</p>
            <Button fullWidth onClick={() => setSelectedService(null)}>프로젝트 문의하기</Button>
          </div>
        )}
      </Modal>
    </>
  );
}
