"use client";

/**
 * ============================================
 * FEATURED JOURNEYS SECTION
 * Showcase the most impactful journeys
 * ============================================
 */

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/motion";
import { JourneyCard } from "@/components/journey/JourneyCard";
import type { JourneySummary } from "@/types/journey";

interface FeaturedJourneysProps {
  journeys: JourneySummary[];
}

export function FeaturedJourneys({ journeys }: FeaturedJourneysProps) {
  if (journeys.length === 0) return null;

  return (
    <section className="section-spacing bg-background-secondary/30">
      <div className="container-wide">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <p className="text-caption mb-4">Defining Experiences</p>
          <h2 className="text-display-title mb-6">Featured Journeys</h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Some journeys leave deeper marks than others. These are the ones
            that fundamentally changed how I see the world.
          </p>
        </FadeIn>

        {/* Featured cards */}
        <div className="space-y-12">
          {journeys.map((journey, index) => (
            <JourneyCard
              key={journey.id}
              journey={journey}
              index={index}
              variant="featured"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
