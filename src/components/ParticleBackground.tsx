import { useEffect, useRef } from 'react';

interface DustPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initDust();
    };

    window.addEventListener('resize', handleResize);

    let dust: DustPoint[] = [];

    const initDust = () => {
      dust = [];
      const count = Math.min(Math.floor(width / 35), 45);
      for (let i = 0; i < count; i++) {
        dust.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -Math.random() * 0.2 - 0.05,
          radius: Math.random() * 1.2 + 0.6,
          alpha: Math.random() * 0.25 + 0.05,
        });
      }
    };

    initDust();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const topGlow = ctx.createRadialGradient(width / 2, 0, 10, width / 2, 0, width * 0.65);
      topGlow.addColorStop(0, 'rgba(30, 41, 59, 0.25)');
      topGlow.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = topGlow;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < dust.length; i++) {
        const d = dust[i];
        d.x += d.vx;
        d.y += d.vy;

        if (d.y < 0) {
          d.y = height + 10;
          d.x = Math.random() * width;
        }
        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${d.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
