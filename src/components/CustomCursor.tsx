import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        dotRef.current.style.opacity = '1';
      }
      if (ringRef.current) {
        ringRef.current.style.opacity = '1';
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest('a') ||
        el.closest('button') ||
        el.closest('input') ||
        el.closest('textarea') ||
        el.closest('.glass-card') ||
        el.closest('.project') ||
        el.closest('.btn')
      ) {
        if (ringRef.current) {
          ringRef.current.classList.add('scale-150', 'bg-[var(--accent-soft)]');
        }
      }
    };

    const onOut = () => {
      if (ringRef.current) {
        ringRef.current.classList.remove('scale-150', 'bg-[var(--accent-soft)]');
      }
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    let raf: number;
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerover', onOver);
    window.addEventListener('pointerout', onOut);
    document.documentElement.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerout', onOut);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 w-9 h-9 -ml-[18px] -mt-[18px] rounded-full border border-[var(--accent)] z-[120] opacity-0 transition-[opacity,transform,background] duration-200 hidden lg:block"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[var(--accent)] z-[121] opacity-0 transition-opacity duration-200 hidden lg:block"
      />
    </>
  );
};
