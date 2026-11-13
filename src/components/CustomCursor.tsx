import { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest('a') ||
        el.closest('button') ||
        el.closest('input') ||
        el.closest('textarea') ||
        el.closest('[role="button"]') ||
        el.closest('.glass-card') ||
        el.closest('.glass-pill')
      ) {
        setIsHovering(true);
      }
    };

    const onOut = () => setIsHovering(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.16;
      pos.current.y += (target.current.y - pos.current.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x - 3}px, ${target.current.y - 3}px, 0)`;
      }

      if (ringRef.current) {
        const size = isHovering ? 44 : 24;
        ringRef.current.style.transform = `translate3d(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px, 0)`;
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onOut);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(raf);
    };
  }, [isVisible, isHovering]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <div
        ref={ringRef}
        style={{
          width: isHovering ? 44 : 24,
          height: isHovering ? 44 : 24,
        }}
        className={`fixed top-0 left-0 rounded-full border transition-all duration-200 ease-out pointer-events-none ${
          isHovering
            ? 'border-sky-400/60 bg-sky-400/10 backdrop-blur-[2px] shadow-[0_0_20px_rgba(56,189,248,0.35)]'
            : 'border-white/40 bg-white/[0.03] backdrop-blur-[1px]'
        } ${isClicking ? 'scale-75 border-sky-300 bg-sky-400/20' : 'scale-100'}`}
      />
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none transition-transform duration-75 ${
          isHovering ? 'bg-sky-300 shadow-[0_0_8px_#38bdf8]' : 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]'
        }`}
      />
    </div>
  );
};
