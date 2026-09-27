import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CinematicSection } from './components/CinematicSection';
import { MetricsSection } from './components/MetricsSection';
import { TechnologySection } from './components/TechnologySection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { FooterSection } from './components/FooterSection';

export const App: React.FC = () => {
  const [entranceComplete, setEntranceComplete] = useState<boolean>(false);

  useEffect(() => {
    // Entrance animation trigger after 800ms delay
    const timer = setTimeout(() => {
      setEntranceComplete(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative min-h-screen bg-black text-white antialiased selection:bg-white selection:text-black overflow-x-hidden"
      style={{ fontFamily: '"Space Mono", monospace' }}
    >
      {/* Fixed Navigation Bar */}
      <Navbar entranceComplete={entranceComplete} />

      <main className="w-full">
        {/* Section 1: Hero (full viewport height, mouse-scrubbed video) */}
        <HeroSection entranceComplete={entranceComplete} />

        {/* Section 2: Cinematic Text (full viewport height, 3D scroll perspective) */}
        <CinematicSection />

        {/* Section 3: Metrics (min-h-screen, performance metrics) */}
        <MetricsSection />

        {/* Section 4: Technology / Adaptive Intelligence (full viewport height) */}
        <TechnologySection />

        {/* Section 5: Architecture (min-h-screen, pure black, 3 layers) */}
        <ArchitectureSection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default App;
