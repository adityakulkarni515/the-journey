/**
 * ============================================
 * HOMEPAGE
 * The entry point - a museum of journeys
 * ============================================
 */

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { JourneyTimeline } from "@/components/home/JourneyTimeline";
import { FeaturedJourneys } from "@/components/home/FeaturedJourneys";
import { JourneyMap } from "@/components/home/JourneyMap";
import { SpecialSections } from "@/components/home/SpecialSections";
import { getJourneySummaries, getFeaturedJourneys } from "@/data/journeys";

export default function HomePage() {
  const allJourneys = getJourneySummaries();
  const featuredJourneys = getFeaturedJourneys();

  return (
    <>
      <Header />

      {/* Hero - The opening statement */}
      <Hero />

      {/* Featured Journeys - Highlighted experiences */}
      <FeaturedJourneys journeys={featuredJourneys} />

      {/* Interactive Map - Visual overview */}
      <JourneyMap journeys={allJourneys} />

      {/* Timeline - The complete archive */}
      <JourneyTimeline journeys={allJourneys} />

      {/* Special Sections - Spiritual & High Altitude */}
      <SpecialSections />

      <Footer />
    </>
  );
}
