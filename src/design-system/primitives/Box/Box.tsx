import type { CSSProperties, ElementType, HTMLAttributes, PropsWithChildren } from 'react';

export type BoxProps = PropsWithChildren<HTMLAttributes<HTMLElement>> & {
  as?: ElementType;
  padding?: CSSProperties['padding'];
  background?: CSSProperties['background'];
};

export function Box({ as: Component = 'div', padding, background, style, ...props }: BoxProps) {
  return <Component style={{ padding, background, ...style }} {...props} />;
}
