import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { setupAnchorNavigation } from './lib/anchors';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExpertisePanels from './components/ExpertisePanels';
import ProjectsGallery from './components/ProjectsGallery';
import Quality from './components/Quality';
import Numbers from './components/Numbers';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
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
      <Navbar />
      <main>
        <Hero />
        <ExpertisePanels />
        <ProjectsGallery />
        <Quality />
        <Numbers />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
