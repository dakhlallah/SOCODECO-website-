import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { setupAnchorNavigation } from './lib/anchors';
import Navbar from './components/Navbar';
import AboutHero from './components/AboutHero';
import OurStory from './components/OurStory';
import Numbers from './components/Numbers';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function AboutApp() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    const cleanupAnchors = setupAnchorNavigation(lenis);

    return () => {
      cleanupAnchors();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navbar variant="page" />
      <main>
        <AboutHero />
        <OurStory />
        <Numbers />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
