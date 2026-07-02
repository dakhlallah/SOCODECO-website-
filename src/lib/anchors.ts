import type Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Anchor navigation that survives ScrollTrigger pins.
 *
 * - Same-page hash clicks (`#id` or `/#id` when already on `/`) are
 *   intercepted and smooth-scrolled with Lenis, using live offsets that
 *   already include pin spacers.
 * - When a page loads WITH a hash (e.g. arriving on `/#projects` from
 *   another page), the browser jumps before the pins exist and lands in
 *   the wrong place — so after mount + refresh we re-scroll to the real
 *   position.
 *
 * Returns a cleanup function.
 */
export function setupAnchorNavigation(lenis: Lenis): () => void {
  const samePath = (url: URL) => url.pathname === window.location.pathname;

  const scrollToHash = (hash: string, immediate = false) => {
    const el = document.querySelector<HTMLElement>(hash);
    if (!el) return false;
    ScrollTrigger.refresh();
    lenis.scrollTo(el, {
      offset: 0,
      duration: immediate ? 0 : 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    return true;
  };

  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const a = (e.target as HTMLElement).closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || !href.includes('#')) return;
    const url = new URL(href, window.location.href);
    if (!samePath(url) || !url.hash) return; // cross-page: let the browser navigate
    if (scrollToHash(url.hash)) {
      e.preventDefault();
      history.replaceState(null, '', url.hash);
    }
  };

  document.addEventListener('click', onClick);

  /* hash landing from another page: wait for pins to mount, then correct */
  let landTimer = 0;
  if (window.location.hash) {
    lenis.stop();
    landTimer = window.setTimeout(() => {
      lenis.start();
      scrollToHash(window.location.hash, true);
    }, 450);
  }

  return () => {
    document.removeEventListener('click', onClick);
    clearTimeout(landTimer);
  };
}
