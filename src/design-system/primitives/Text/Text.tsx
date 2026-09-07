import type { CSSProperties, ElementType, HTMLAttributes, PropsWithChildren } from 'react';

type TextProps = PropsWithChildren<HTMLAttributes<HTMLElement>> & {
  as?: ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: CSSProperties['fontWeight'];
  tone?: 'default' | 'muted' | 'danger';
};

const sizes = { sm: '0.875rem', md: '1rem', lg: '1.25rem', xl: '1.875rem' };
const tones = { default: 'var(--color-neutral-900)', muted: 'var(--color-neutral-500)', danger: 'var(--color-danger)' };

export function Text({ as: Component = 'p', size = 'md', weight, tone = 'default', style, ...props }: TextProps) {
  return <Component style={{ fontSize: sizes[size], fontWeight: weight, color: tones[tone], ...style }} {...props} />;
}
