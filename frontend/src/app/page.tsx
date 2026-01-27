import { PalantirHero } from '@/components/sections/PalantirHero';
import { InsightsGrid } from '@/components/sections/InsightsGrid';
import { PlatformsSection } from '@/components/sections/PlatformsSection';
import { NewsSection } from '@/components/sections/NewsSection';
import { ImpactSection } from '@/components/sections/ImpactSection';
import { CareersSection } from '@/components/sections/CareersSection';
import { SocietalImpactSection } from '@/components/sections/SocietalImpactSection';

export default function Home() {
  return (
    <main className="bg-white">
      {/* Hero Section - Split Screen with D3 Graphic */}
      <PalantirHero />

      {/* Data Products - White background */}
      <PlatformsSection />

      {/* Key Insights - Alt background for visual rhythm */}
      <InsightsGrid />

      {/* News - Alt background */}
      <NewsSection />

      {/* Impact Stats - White background */}
      <ImpactSection />

      {/* Careers - Alt background */}
      <CareersSection />

      {/* Societal Impact - White background */}
      <SocietalImpactSection />
    </main>
  );
}
