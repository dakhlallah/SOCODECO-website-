import { useRef, type ReactNode, type MouseEvent } from 'react';
import gsap from 'gsap';

/**
 * Magnetic button: the pill leans toward the cursor, the label leans a
 * little further; both spring back on leave.
 */
export default function MagneticButton({
  children,
  href,
  variant = 'dark',
  className = '',
}: {
  children: ReactNode;
  href: string;
  variant?: 'dark' | 'light' | 'gold' | 'ghost';
  className?: string;
}) {
  const wrap = useRef<HTMLAnchorElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = wrap.current!;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    gsap.to(el, { x: x * 0.32, y: y * 0.32, duration: 0.5, ease: 'power3.out' });
    gsap.to(inner.current, { x: x * 0.14, y: y * 0.14, duration: 0.5, ease: 'power3.out' });
  };
  const onLeave = () => {
    gsap.to([wrap.current, inner.current], { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1,0.4)' });
  };

  const styles: Record<string, string> = {
    dark: 'bg-ink text-white',
    light: 'bg-white text-ink shadow-[0_0_0_1px_rgba(16,16,16,0.08)]',
    gold: 'bg-gold text-ink',
    ghost: 'border border-white/25 text-white hover:border-gold hover:text-rouge',
  };

  return (
    <a
      ref={wrap}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 will-change-transform ${styles[variant]} ${className}`}
    >
      <span ref={inner} className="inline-flex items-center gap-2.5 will-change-transform">
        {children}
      </span>
    </a>
  );
}
