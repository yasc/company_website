import { PalantirHero } from '@/components/sections/PalantirHero';
import { PlatformsSection } from '@/components/sections/PlatformsSection';
import { NewsSection } from '@/components/sections/NewsSection';
import { ImpactSection } from '@/components/sections/ImpactSection';
import { CareersSection } from '@/components/sections/CareersSection';
import { SocietalImpactSection } from '@/components/sections/SocietalImpactSection';

export default function Home() {
  return (
    <main className="bg-black">
      {/* Hero Section - "Proud to serve the NHS" */}
      <PalantirHero />
      
      {/* Platforms Section - AIP, Foundry, Gotham, Apollo */}
      <PlatformsSection />
      
      {/* News Section - "In the News" */}
      <NewsSection />
      
      {/* Impact Section - Healthcare, Government, Defence */}
      <ImpactSection />
      
      {/* Careers Section - "Build the Future with Us" */}
      <CareersSection />
      
      {/* Societal Impact Section - Climate, Privacy, Open Source, Education */}
      <SocietalImpactSection />
    </main>
  );
}