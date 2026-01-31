/**
 * ============================================
 * ALL JOURNEYS PAGE
 * Complete archive of all journeys
 * ============================================
 */

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AllJourneysHero } from "@/components/pages/AllJourneysHero";
import { JourneyGrid } from "@/components/pages/JourneyGrid";
import { getJourneySummaries, getJourneyYears } from "@/data/journeys";

export const metadata = {
  title: "All Journeys",
  description: "The complete archive of journeys - from Banaras to Ladakh, solo rides to group adventures.",
};

export default function AllJourneysPage() {
  const journeys = getJourneySummaries();
  const years = getJourneyYears();

  return (
    <>
      <Header />

      <AllJourneysHero totalJourneys={journeys.length} years={years} />

      <JourneyGrid journeys={journeys} years={years} />

      <Footer />
    </>
  );
}
