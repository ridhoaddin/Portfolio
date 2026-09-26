import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Checkerboard } from "@/components/sections/Checkerboard";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StackedScrollManager } from "@/components/StackedScrollManager";
import { AntigravityPreloader } from "@/components/preloader/AntigravityPreloader";

export default function Home() {
  return (
    <>
      <AntigravityPreloader />
      <Navbar />
      <main className="relative">
        {/* Panel 1: Hero + Checkerboard ticker */}
        <div id="hero" className="stacked-section stacked-panel-hero flex flex-col justify-between">
          <Hero />
          <Checkerboard />
        </div>

        {/* Panel 2: About Me */}
        <About />

        {/* Panel 3: Skills & Capabilities */}
        <Skills />

        {/* Panel 4: Featured Projects */}
        <Projects />

        {/* Panel 5: Career Track & Experience */}
        <Experience />

        {/* Panel 6: Contact & Footer */}
        <div id="contact" className="stacked-section stacked-panel-contact flex flex-col justify-between min-h-screen">
          <Contact />
          <Footer />
        </div>
      </main>

      <SmoothScroll />
      <ScrollReveal />
      <StackedScrollManager />
    </>
  );
}
