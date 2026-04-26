// src/App.tsx
import { useRef } from "react";
import { MapProvider } from "./context/Mapcontext";
import NavSection from "./components/navigation";
import HeroSection from "./components/HeroSection";
import ScrollySection from "./components/ScrollySection";
import IntroSection from "./components/IntroSection";
import BpjsSection from "./components/BpjsSection";
import FacilitySection from "./components/FacilitySection";
import QuotesSection from "./components/QuotesSection";
import MedicalSection from "./components/MedicalSection";
import LifeExpectancySection from "./components/LifeExpectancySection";
import FooterSection from "./components/FooterSection";
import { storyConfig } from "./data/storyData";

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <MapProvider>
      <div
        ref={mainRef}
        style={{
          background: "linear-gradient(180deg, #B8FFE7 0%, #F5FFFE 100%)",
          color: "#0f172a",
          minHeight: "100vh",
        }}
      >
        {/* Navigation — sticky top */}
        <NavSection />

        {/* 1. Hero */}
        <section id="hero">
          <HeroSection config={storyConfig} />
        </section>

        {/* 2. Latar Belakang */}
        <section id="latar-belakang">
          <IntroSection />
        </section>

        {/* 3. BPJS */}
        <section id="bpjs">
          <BpjsSection />
        </section>

        {/* 4. Fasilitas Kesehatan Per Kabupaten */}
        <section id="fasilitas">
          <FacilitySection />
        </section>

        {/* 5. Quote */}
        <QuotesSection />

        {/* 6. Tenaga Kesehatan */}
        <section id="tenaga-medis">
          <MedicalSection />
        </section>

        {/* 7. Tren AHH */}
        <section id="tren-ahh">
          <LifeExpectancySection />
        </section>

        {/* 8. Scrollytelling Mapbox */}
        <section id="peta">
          <ScrollySection />
        </section>

        {/* 9. Footer */}
        <FooterSection />
      </div>
    </MapProvider>
  );
}

export default App;