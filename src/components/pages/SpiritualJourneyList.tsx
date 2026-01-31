"use client";

/**
 * ============================================
 * SPIRITUAL JOURNEY LIST
 * List of spiritual journeys with cards
 * ============================================
 */

import { FadeIn } from "@/components/ui/motion";
import { JourneyCard } from "@/components/journey/JourneyCard";
import type { JourneySummary } from "@/types/journey";

interface SpiritualJourneyListProps {
  journeys: JourneySummary[];
}

export function SpiritualJourneyList({ journeys }: SpiritualJourneyListProps) {
  return (
    <section className="section-spacing">
      <div className="container-wide">
        <FadeIn className="mb-12">
          <h2 className="text-display-heading mb-4">The Journeys</h2>
          <p className="text-body-large max-w-2xl">
            Each of these journeys approached spirituality differently — some through solitude,
            others through the chaos of millions.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          {journeys.map((journey, index) => (
            <JourneyCard
              key={journey.id}
              journey={journey}
              index={index}
              variant="default"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
