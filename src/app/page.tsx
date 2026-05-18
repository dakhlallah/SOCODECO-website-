import Navbar from "@/components/nova/Navbar";
import Hero from "@/components/nova/Hero";
import Principles from "@/components/nova/Principles";
import Services from "@/components/nova/Services";
import About from "@/components/nova/About";
import FeaturedProjects from "@/components/nova/FeaturedProjects";
import Stats from "@/components/nova/Stats";
import CTA from "@/components/nova/CTA";
import Footer from "@/components/nova/Footer";

export default function Home() {
  return (
    <div className="nova">
      <Navbar />
      <main>
        <Hero />
        <Principles />
        <Services />
        <About />
        <FeaturedProjects />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
