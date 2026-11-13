import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest('a') ||
        el.closest('button') ||
        el.closest('[role="button"]') ||
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA'
      ) {
        cursor.classList.add('hovering');
      }
    };

    const onOut = () => {
      cursor.classList.remove('hovering');
    };

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      cursor.style.transform = `translate(${pos.current.x - 8}px, ${pos.current.y - 8}px)`;
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor hidden lg:block" />;
};
