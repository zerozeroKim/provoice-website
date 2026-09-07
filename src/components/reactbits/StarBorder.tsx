import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import './StarBorder.css';

type StarBorderProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  color?: string;
  speed?: string;
  thickness?: number;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  children: ReactNode;
};

export default function StarBorder({
  as: Component = 'button',
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  backgroundColor = '#000000',
  textColor = '#ffffff',
  borderColor = '#222222',
  children,
  style,
  ...rest
}: StarBorderProps) {
  const movementStyle = {
    background: `radial-gradient(circle, ${color}, transparent 10%)`,
    animationDuration: speed,
  } as CSSProperties;

  return (
    <Component className={`star-border-container ${className}`} style={{ padding: `${thickness}px 0`, ...style }} {...rest}>
      <div className="star-border-gradient-bottom" style={movementStyle} />
      <div className="star-border-gradient-top" style={movementStyle} />
      <div className="star-border-inner-content" style={{ background: backgroundColor, color: textColor, borderColor }}>
        {children}
      </div>
    </Component>
  );
}
