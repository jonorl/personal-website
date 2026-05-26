import { useState } from "react";

import { aiProjects } from "./const/aiProjects";
import { fullStackProjects } from "./const/fullStackProjects";

import Header from './components/Header'
import Hero from "./components/Hero";
import InfraSection from './components/InfraSection'
import MetricTile from './components/MetricTile'
import AiMl from "./components/AiMl";
import TiltCard from "./components/Tiltcard";
import FullStack from "./components/FullStack";
import About from "./components/About";
import CVandContact from "./components/CVandContact";
import Footer from "./components/Footer";

export default function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="relative min-h-screen bg-white text-slate-800 dark:bg-[#0b0f17] dark:text-slate-100 selection:bg-zinc-200 selection:text-zinc-950">

        {/* Decorative gradient blob */}
        <div className="pointer-events-none absolute -top-24 h-[40rem] w-[40rem] rounded-full bg-gradient-to-tr from-zinc-500/20 via-sky-500/10 to-teal-500/20 blur-3xl" />

        <Header dark={dark} menuOpen={menuOpen} setDark={setDark} setMenuOpen={setMenuOpen} />
        <Hero />
        <InfraSection />
        <MetricTile />
        <AiMl />
        <FullStack />
        <About />
        <CVandContact />
        <Footer />
       
      </div>
    </div>
  );
}
