"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Partners from "@/components/Partners";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Statistics from "@/components/Statistics";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});
const Preloader = dynamic(() => import("@/components/Preloader"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const Showcase = dynamic(() => import("@/components/Showcase"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <SmoothScroll>
        <main>
          <Navigation />
          <Hero />
          <Partners />
          <About />
          <Showcase />
          <Services />
          <Projects />
          <Statistics />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
