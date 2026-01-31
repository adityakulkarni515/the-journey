/**
 * ============================================
 * SPIRITUAL JOURNEYS HUB
 * Collection of spiritual journeys
 * Banaras, Maha Kumbh, etc.
 * ============================================
 */

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SpiritualHero } from "@/components/pages/SpiritualHero";
import { SpiritualJourneyList } from "@/components/pages/SpiritualJourneyList";
import { SpiritualComparison } from "@/components/pages/SpiritualComparison";
import { getSpiritualJourneys } from "@/data/journeys";

export const metadata = {
  title: "Spiritual Journeys",
  description: "Where the soul finds answers - Banaras, Maha Kumbh, and the sacred spaces that teach through silence and chaos.",
};

export default function SpiritualPage() {
  const journeys = getSpiritualJourneys();

  return (
    <>
      <Header />

      <SpiritualHero journeyCount={journeys.length} />

      <SpiritualJourneyList journeys={journeys} />

      <SpiritualComparison />

      <Footer />
    </>
  );
}
