import { useState } from "react";
import { MotionConfig } from "motion/react";
import Header from './components/Header'
import Hero from "./components/Hero";
import InfraSection from './components/InfraSection'
import ProjectSection from "./components/ProjectSection";
import About from "./components/About";
import CVandContact from "./components/CVandContact";
import Footer from "./components/Footer";
import ServiceStatusProvider from "./components/ServiceStatusProvider";
import { aiProjects } from "./const/aiProjects";
import { realWorldProjects } from "./const/realWorldProjects";
import { productionProjects } from "./const/productionProjects";
import { funProjects } from "./const/funProjects";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-clip bg-white text-slate-800 dark:bg-[#0b0f17] dark:text-slate-100 selection:bg-zinc-200 selection:text-zinc-950">

        {/* Wider than a phone screen; the wrapper's overflow-x-clip stops it widening the page. */}
        <div className="pointer-events-none absolute -top-24 h-[40rem] w-[40rem] rounded-full bg-gradient-to-tr from-zinc-500/20 via-sky-500/10 to-teal-500/20 blur-3xl" />

        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <ServiceStatusProvider>
          <main>
            <Hero />
            <InfraSection />
            <ProjectSection
              id="in-production"
              title="In Production"
              subtitle="Live platforms that organisations and their members rely on"
              projects={productionProjects}
              viewAll
            />
            <ProjectSection
              id="real-world"
              title="Real-World Problems"
              subtitle="Problems from my own life, solved end to end: hardware, firmware, networking and the software on top"
              projects={realWorldProjects}
            />
            <ProjectSection
              id="ai-projects"
              title="AI/ML Projects"
              subtitle="Machine learning models deployed to production with full demo websites"
              projects={aiProjects}
            />
            <ProjectSection
              id="fun"
              title="Just for Fun"
              subtitle="Built for my family and friends to play"
              projects={funProjects}
            />
            <About />
            <CVandContact />
          </main>
        </ServiceStatusProvider>
        <Footer />

      </div>
    </MotionConfig>
  );
}
