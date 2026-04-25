// src/App.tsx
import { useRef } from "react";
import { MapProvider } from "./context/Mapcontext";
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
          background: "#F5FFFE",
          color: "#0f172a",
          minHeight: "100vh",
        }}
      >
        {/* 1. Hero */}
        <HeroSection config={storyConfig} />

        {/* 2. Latar Belakang — Krisis Kesehatan yang Tersembunyi */}
        <IntroSection />

        {/* 3. BPJS — Persentase Penduduk Ber-BPJS */}
        <BpjsSection />

        {/* 4. Fasilitas Kesehatan Per Kabupaten */}
        <FacilitySection />

        {/* 5. Quote — Dokter dan nakes */}
        <QuotesSection />

        {/* 6. Tenaga Kesehatan — 2370 nakes + distribusi */}
        <MedicalSection />

        {/* 7. Tren AHH — line chart */}
        <LifeExpectancySection />

        {/* 8. Scrollytelling Mapbox */}
        <ScrollySection />

        {/* 9. Footer — Bukan Takdir */}
        <FooterSection />
      </div>
    </MapProvider>
  );
}

export default App;