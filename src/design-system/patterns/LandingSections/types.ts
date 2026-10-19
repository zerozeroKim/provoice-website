import type { ReactNode } from 'react';
import type { PortfolioItem } from '../../components';

export type { PortfolioItem };
export type HeroStat = { value: string; label: string };
/** accent/vocalRange는 검색용 메타데이터입니다 — 성우 상세 페이지에는 노출하지 않습니다. */
export type TalentProfile = { name: string; avatarSrc?: string; locale: string; tags: string[]; duration: number; gender?: string; tones?: string[]; ageRange?: string; specialty?: string; accent?: string; vocalRange?: string; best?: boolean };
export type ServiceItem = { icon?: ReactNode; imageSrc?: string; imageAlt?: string; title: string; titleEn?: string; description: string; descriptionEn?: string; badge?: string; badgeEn?: string; featured?: boolean; link?: string; linkEn?: string; href?: string; slug?: string };
export type TranslationRow = { label: string; value: string };
