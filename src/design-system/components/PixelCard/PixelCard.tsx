import { useCallback, useEffect, useRef, type CSSProperties, type HTMLAttributes, type PointerEvent, type ReactNode } from 'react';
import { colors as designColors } from '../../tokens/colors';
import styles from './PixelCard.module.css';

type PixelCardVariant = 'default' | 'purple' | 'magenta' | 'dark';

type PixelCardProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  as?: 'div' | 'article';
  variant?: PixelCardVariant;
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
};

type PixelState = {
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  idle: boolean;
  reverse: boolean;
  shimmer: boolean;
};

const variants = {
  default: { gap: 20, speed: 22, colors: `${designColors.neutral[100]},${designColors.purple[100]},${designColors.purple[200]}`, activeColor: 'rgb(128 56 255 / .025)' },
  purple: { gap: 18, speed: 24, colors: `${designColors.purple[100]},${designColors.purple[200]},${designColors.purple[400]}`, activeColor: 'rgb(128 56 255 / .035)' },
  magenta: { gap: 18, speed: 26, colors: `${designColors.magenta[200]},${designColors.magenta[300]},${designColors.purple[200]}`, activeColor: 'rgb(248 0 255 / .03)' },
  dark: { gap: 20, speed: 24, colors: `${designColors.purple[300]},${designColors.purple[400]},${designColors.magenta[300]}`, activeColor: 'rgb(128 56 255 / .045)' },
} as const;

function effectiveSpeed(value: number, reducedMotion: boolean) {
  if (reducedMotion || value <= 0) return 0;
  return Math.min(value, 100) * 0.001;
}

export function PixelCard({
  as: Element = 'div',
  variant = 'default',
  gap,
  speed,
  colors,
  noFocus = false,
  className = '',
  children,
  style,
  ...props
}: PixelCardProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pixelsRef = useRef<PixelState[]>([]);
  const animationRef = useRef<number | null>(null);
  const previousTimeRef = useRef(performance.now());
  const reducedMotionRef = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const config = variants[variant];
  const finalGap = Math.max(3, gap ?? config.gap);
  const finalSpeed = speed ?? config.speed;
  const finalColors = colors ?? config.colors;

  const stopAnimation = useCallback(() => {
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
  }, []);

  const initPixels = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const palette = finalColors.split(',').map((color) => color.trim()).filter(Boolean);
    const pxs: PixelState[] = [];
    for (let x = 0; x < width; x += finalGap) {
      for (let y = 0; y < height; y += finalGap) {
        const dx = x - width / 2;
        const dy = y - height / 2;
        pxs.push({
          x,
          y,
          color: palette[Math.floor(Math.random() * palette.length)] ?? designColors.purple[200],
          speed: (Math.random() * 0.8 + 0.1) * effectiveSpeed(finalSpeed, reducedMotionRef.current),
          size: 0,
          sizeStep: Math.random() * 0.4,
          minSize: 0.25,
          maxSize: Math.random() * 0.55 + 0.25,
          delay: reducedMotionRef.current ? 0 : Math.sqrt(dx * dx + dy * dy),
          counter: 0,
          counterStep: Math.random() * 4 + (width + height) * 0.01,
          idle: false,
          reverse: false,
          shimmer: false,
        });
      }
    }
    pixelsRef.current = pxs;
  }, [finalColors, finalGap, finalSpeed]);

  const animate = useCallback((direction: 'appear' | 'disappear') => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const drawFrame = (time: number) => {
      animationRef.current = requestAnimationFrame(drawFrame);
      const passed = time - previousTimeRef.current;
      if (passed < 1000 / 60) return;
      previousTimeRef.current = time - (passed % (1000 / 60));
      context.clearRect(0, 0, canvas.width, canvas.height);

      let allIdle = true;
      for (const pixel of pixelsRef.current) {
        if (direction === 'appear') {
          pixel.idle = false;
          if (pixel.counter <= pixel.delay) {
            pixel.counter += pixel.counterStep;
            allIdle = false;
            continue;
          }
          if (pixel.size >= pixel.maxSize) pixel.shimmer = true;
          if (pixel.shimmer) {
            if (pixel.size >= pixel.maxSize) pixel.reverse = true;
            if (pixel.size <= pixel.minSize) pixel.reverse = false;
            pixel.size += pixel.reverse ? -pixel.speed : pixel.speed;
          } else {
            pixel.size += pixel.sizeStep;
          }
        } else {
          pixel.shimmer = false;
          pixel.counter = 0;
          pixel.size = Math.max(0, pixel.size - 0.1);
          pixel.idle = pixel.size <= 0;
        }

        if (!pixel.idle) allIdle = false;
        if (pixel.size > 0) {
          const offset = 1 - pixel.size / 2;
          context.fillStyle = pixel.color;
          context.fillRect(pixel.x + offset, pixel.y + offset, pixel.size, pixel.size);
        }
      }
      if (direction === 'disappear' && allIdle) stopAnimation();
    };

    stopAnimation();
    animationRef.current = requestAnimationFrame(drawFrame);
  }, [stopAnimation]);

  useEffect(() => {
    initPixels();
    const observer = new ResizeObserver(initPixels);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      stopAnimation();
    };
  }, [initPixels, stopAnimation]);

  const mergedStyle = {
    '--pixel-card-active-color': config.activeColor,
    ...style,
  } as CSSProperties;

  const moveReflection = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty('--reflection-x', `${x}%`);
    event.currentTarget.style.setProperty('--reflection-y', `${y}%`);
    event.currentTarget.style.setProperty('--reflection-angle', `${(x - 50) * 0.18 + 125}deg`);
  };

  return (
    <Element
      ref={(node) => { containerRef.current = node; }}
      className={`${styles.pixelCard} ${className}`}
      style={mergedStyle}
      onMouseEnter={() => animate('appear')}
      onMouseLeave={() => animate('disappear')}
      onPointerMove={moveReflection}
      onFocus={(event) => {
        if (!noFocus && !event.currentTarget.contains(event.relatedTarget)) animate('appear');
      }}
      onBlur={(event) => {
        if (!noFocus && !event.currentTarget.contains(event.relatedTarget)) animate('disappear');
      }}
      tabIndex={noFocus ? undefined : 0}
      {...props}
    >
      <canvas className={styles.pixelCanvas} ref={canvasRef} aria-hidden="true" />
      <div className={styles.reflectiveNoise} aria-hidden="true" />
      <div className={styles.reflectiveSheen} aria-hidden="true" />
      <div className={styles.reflectiveBorder} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </Element>
  );
}
