import { useEffect, useRef } from 'react';

interface DustPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
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

    const colors = ['rgba(56, 189, 248, ', 'rgba(99, 102, 241, ', 'rgba(52, 211, 153, ', 'rgba(255, 255, 255, '];

    const initDust = () => {
      dust = [];
      const count = Math.min(Math.floor(width / 30), 55);
      for (let i = 0; i < count; i++) {
        dust.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -Math.random() * 0.3 - 0.08,
          radius: Math.random() * 1.4 + 0.6,
          alpha: Math.random() * 0.3 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    initDust();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const topGlow = ctx.createRadialGradient(width / 2, 0, 10, width / 2, 0, width * 0.7);
      topGlow.addColorStop(0, 'rgba(15, 23, 42, 0.45)');
      topGlow.addColorStop(0.5, 'rgba(8, 12, 24, 0.2)');
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
        ctx.fillStyle = `${d.color}${d.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < dust.length; j++) {
          const d2 = dust[j];
          const dx = d.x - d2.x;
          const dy = d.y - d2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 90) * 0.08})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
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
