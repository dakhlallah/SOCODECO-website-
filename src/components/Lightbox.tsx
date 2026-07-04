import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLang } from '../lib/i18n';

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Full-screen image viewer — fades in over the page, the photograph
 * scales up out of its card. Closes on backdrop click, the × button
 * or Escape. Rendered in a portal so pinned/transformed galleries
 * can't trap the fixed overlay.
 */
export default function Lightbox({ image, onClose }: { image: LightboxImage | null; onClose: () => void }) {
  const { lang } = useLang();
  const closeLabel = lang === 'fr' ? 'Fermer' : 'Close';

  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [image, onClose]);

  return createPortal(
    <AnimatePresence>
      {image && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={image.caption || image.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#060d16]/95 p-4 backdrop-blur-md sm:p-10"
        >
          <button
            aria-label={closeLabel}
            onClick={onClose}
            className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:rotate-90 hover:border-gold hover:text-gold"
          >
            <X size={20} />
          </button>
          <motion.figure
            initial={{ opacity: 0, scale: 0.92, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 14 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-[1400px]"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
            />
            {image.caption && (
              <figcaption className="mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">
                {image.caption}
              </figcaption>
            )}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
