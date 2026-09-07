export const colors = {
  purple: { 100: 'var(--purple-100)', 200: 'var(--purple-200)', 300: 'var(--purple-300)', 400: 'var(--purple-400)', 500: 'var(--purple-500)' },
  magenta: { 200: 'var(--magenta-200)', 300: 'var(--magenta-300)', 400: 'var(--magenta-400)', 500: 'var(--magenta-500)' },
  neutral: { 0: 'var(--neutral-0)', 50: 'var(--neutral-50)', 100: 'var(--neutral-100)', 300: 'var(--neutral-300)', 500: 'var(--neutral-500)', 700: 'var(--neutral-700)', 900: 'var(--neutral-900)', 950: 'var(--neutral-950)' },
  success: 'var(--color-success)',
  danger: 'var(--color-danger)',
  info: 'var(--color-info)',
} as const;

export const gradients = {
  brand: 'var(--gradient-brand)',
  deepPurple: 'var(--gradient-deep-purple)',
  aiGlow: 'var(--gradient-ai-glow)',
} as const;
