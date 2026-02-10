import { HomeHero } from '@/components/sections/HomeHero';
import { WhatWeDoSection } from '@/components/sections/WhatWeDoSection';
import { InsightsGrid } from '@/components/sections/InsightsGrid';
import { PlatformsSection } from '@/components/sections/PlatformsSection';
import { NewsSection } from '@/components/sections/NewsSection';
import { SocietalImpactSection } from '@/components/sections/SocietalImpactSection';

export default function Home() {
  return (
    <main className="bg-white">
      {/* Hero Section - Split Screen with D3 Graphic */}
      <HomeHero />

      {/* What We Do - Services overview */}
      <WhatWeDoSection />

      {/* Data Products - White background */}
      <PlatformsSection />

      {/* Industries - Alt background for visual rhythm */}
      <InsightsGrid />

      {/* In the News - White background */}
      <NewsSection />

      {/* Societal Commitment - Alt background */}
      <SocietalImpactSection />
    </main>
  );
}
