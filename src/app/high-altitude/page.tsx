/**
 * ============================================
 * HIGH-ALTITUDE JOURNEYS HUB
 * Collection of mountain journeys
 * Spiti, Ladakh, Kashmir
 * ============================================
 */

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HighAltitudeHero } from "@/components/pages/HighAltitudeHero";
import { HighAltitudeJourneyList } from "@/components/pages/HighAltitudeJourneyList";
import { AltitudeStats } from "@/components/pages/AltitudeStats";
import { getHighAltitudeJourneys } from "@/data/journeys";

export const metadata = {
  title: "High-Altitude Journeys",
  description: "Where thin air clears the mind - Spiti, Ladakh, Kashmir, and the mountains that test your body and gift you perspective.",
};

export default function HighAltitudePage() {
  const journeys = getHighAltitudeJourneys();

  return (
    <>
      <Header />

      <HighAltitudeHero journeyCount={journeys.length} />

      <AltitudeStats journeys={journeys} />

      <HighAltitudeJourneyList journeys={journeys} />

      <Footer />
    </>
  );
}
