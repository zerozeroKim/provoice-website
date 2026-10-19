import type { ReactNode } from 'react';
import type { PortfolioItem } from '../../components';

export type { PortfolioItem };
export type HeroStat = { value: string; label: string };
export type TalentProfile = { name: string; avatarSrc?: string; locale: string; tags: string[]; duration: number; gender?: string; tones?: string[]; ageRange?: string; specialty?: string; best?: boolean };
export type ServiceItem = { icon?: ReactNode; imageSrc?: string; imageAlt?: string; title: string; titleEn?: string; description: string; descriptionEn?: string; badge?: string; badgeEn?: string; link?: string; linkEn?: string; href?: string; slug?: string };
export type TranslationRow = { label: string; value: string };
