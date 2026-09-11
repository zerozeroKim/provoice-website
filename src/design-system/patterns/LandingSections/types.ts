import type { ReactNode } from 'react';
import type { PortfolioItem } from '../../components';

export type { PortfolioItem };
export type HeroStat = { value: string; label: string };
export type TalentProfile = { name: string; avatarSrc: string; locale: string; tags: string[]; duration: number; verified: boolean; gender?: string; tones?: string[]; favorites?: number; completedProjects?: number };
export type ServiceItem = { icon?: ReactNode; imageSrc?: string; imageAlt?: string; title: string; description: string; badge?: string; link?: string };
export type TranslationRow = { label: string; value: string };
