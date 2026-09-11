import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import CursorGlow from "./components/CursorGlow";
import BackToTop from "./components/BackToTop";
import IntroSplash from "./components/IntroSplash";
import Hero from "./sections/Hero";
import FeaturedShowcase from "./sections/FeaturedShowcase";
import About from "./sections/About";
import Journey from "./sections/Journey";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Publications from "./sections/Publications";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";

function App() {
  // The intro plays on every load and hands off into the real page once it finishes.
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <IntroSplash onFinish={() => setIntroDone(true)} />}

      {introDone && (
        <div className="relative">
          <CursorGlow />
          <div className="noise-overlay" aria-hidden="true" />
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <FeaturedShowcase />
            <About />
            <Journey />
            <Skills />
            <Projects />
            <Publications />
            <Certifications />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </div>
      )}
    </>
  );
}

export default App;
