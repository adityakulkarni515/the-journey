"use client";

/**
 * ============================================
 * ALL JOURNEYS HERO
 * Hero section for the journeys archive
 * ============================================
 */

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/motion";
import { Calendar, Route, MapPin } from "@/components/ui/icons";

interface AllJourneysHeroProps {
  totalJourneys: number;
  years: number[];
}

export function AllJourneysHero({ totalJourneys, years }: AllJourneysHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-end pb-16 pt-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary/30 to-background" />

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-3xl">
          <FadeIn>
            <p className="text-caption mb-4">The Complete Archive</p>
          </FadeIn>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-display-hero mb-6"
          >
            All Journeys
          </motion.h1>

          <FadeIn delay={0.3}>
            <p className="text-body-large max-w-2xl mb-10">
              Every journey documented. Every transformation recorded. Browse by year,
              filter by type, or explore the complete archive of experiences.
            </p>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent-gold" />
                </span>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">
                    {totalJourneys}
                  </p>
                  <p className="text-sm text-foreground-subtle">Journeys</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-accent-sky/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent-sky" />
                </span>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">
                    {years[years.length - 1]} - {years[0]}
                  </p>
                  <p className="text-sm text-foreground-subtle">Years Covered</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
