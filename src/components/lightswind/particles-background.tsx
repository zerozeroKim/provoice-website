import React, { useEffect, useRef } from 'react';

interface ParticlesBackgroundProps {
  colors?: string[];
  size?: number;
  countDesktop?: number;
  countTablet?: number;
  countMobile?: number;
  zIndex?: number;
  height?: string;
  shape?: 'random' | 'orbit' | 'wave';
}

const hexToRgba = (hex: string, alpha: number) => {
  const value = hex.replace('#', '');
  const normalized = value.length === 3
    ? value.split('').map((char) => char + char).join('')
    : value;

  const num = Number.parseInt(normalized, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getCount = (width: number, desktop: number, tablet: number, mobile: number) => {
  if (width > 1024) return desktop;
  if (width > 768) return tablet;
  return mobile;
};

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  colors = ['#ff223e', '#5d1eb2', '#ff7300'],
  size = 3,
  countDesktop = 60,
  countTablet = 50,
  countMobile = 40,
  zIndex = 0,
  height = '100vh',
  shape = 'random',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const getSceneSize = () => {
      const rect = canvas.getBoundingClientRect();
      return {
        width: rect.width || window.innerWidth,
        height: rect.height || window.innerHeight,
      };
    };

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      active: false,
      vx: 0,
      vy: 0,
    };

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
      baseY: number;
      phase: number;
      drift: number;
    }> = [];

    const buildParticles = () => {
      const { width, height } = getSceneSize();
      const count = getCount(width, countDesktop, countTablet, countMobile);
      particles.length = 0;

      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.6,
          radius: size * (0.45 + Math.random() * 0.7),
          alpha: 0.24 + Math.random() * 0.45,
          color: colors[i % colors.length],
          baseY: Math.random() * height,
          phase: Math.random() * Math.PI * 2,
          drift: 0.3 + Math.random() * 1.2,
        });
      }
    };

    const resizeCanvas = () => {
      const { width, height } = getSceneSize();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      buildParticles();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nextX = event.clientX - rect.left;
      const nextY = event.clientY - rect.top;

      mouse.vx = (nextX - mouse.x) * 0.15;
      mouse.vy = (nextY - mouse.y) * 0.15;
      mouse.x = nextX;
      mouse.y = nextY;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    const animate = () => {
      const { width, height } = getSceneSize();
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (mouse.active) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.hypot(dx, dy) || 1;

          if (distance < 140) {
            const force = (1 - distance / 140) * 0.6;
            const waveY = Math.sin((particle.x + particle.phase) * 0.08) * 12 * particle.drift;
            particle.y += waveY * force * 0.3;
            particle.vx += (dx / distance) * force * 0.08;
            particle.vy += (dy / distance) * force * 0.08;
          }
        }

        const speed = Math.hypot(particle.vx, particle.vy);
        if (speed > 1.1) {
          particle.vx = (particle.vx / speed) * 1.1;
          particle.vy = (particle.vy / speed) * 1.1;
        }

        particle.vx *= 0.992;
        particle.vy *= 0.992;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        const glow = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 6,
        );

        glow.addColorStop(0, hexToRgba(particle.color, particle.alpha));
        glow.addColorStop(0.2, hexToRgba(particle.color, particle.alpha * 0.35));
        glow.addColorStop(1, hexToRgba(particle.color, 0));

        context.fillStyle = glow;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius * 3.2, 0, Math.PI * 2);
        context.fill();
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    const frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [colors, size, countDesktop, countTablet, countMobile]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height,
        zIndex,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
};

export default ParticlesBackground;
