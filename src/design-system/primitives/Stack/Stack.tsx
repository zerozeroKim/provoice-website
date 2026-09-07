import type { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react';

type StackProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  direction?: 'row' | 'column';
  gap?: CSSProperties['gap'];
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
};

export function Stack({ direction = 'column', gap = '1rem', align, justify, wrap, style, ...props }: StackProps) {
  return <div style={{ display: 'flex', flexDirection: direction, gap, alignItems: align, justifyContent: justify, flexWrap: wrap, ...style }} {...props} />;
}
