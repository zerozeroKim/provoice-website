export const typography = {
  fontFamily: 'var(--font-sans)',
  fontSize: {
    display: 'var(--text-display)',
    heading1: 'var(--text-h1)',
    heading2: 'var(--text-h2)',
    heading3: 'var(--text-h3)',
    bodyLarge: 'var(--text-body-lg)',
    body: 'var(--text-body)',
    bodySmall: 'var(--text-body-sm)',
    caption: 'var(--text-caption)',
  },
  fontWeight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  lineHeight: { tight: 'var(--leading-tight)', heading: 'var(--leading-heading)', body: 'var(--leading-body)', relaxed: 'var(--leading-relaxed)' },
  letterSpacing: { tight: 'var(--tracking-tight)', heading: 'var(--tracking-heading)', body: 'var(--tracking-body)', normal: '0' },
} as const;
