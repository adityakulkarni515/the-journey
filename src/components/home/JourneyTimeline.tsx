"use client";

/**
 * ============================================
 * JOURNEY TIMELINE
 * Vertical scroll-based timeline of all journeys
 * ============================================
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { TravelModeBadge } from "@/components/ui/badge";
import { ArrowRight, Route, MapPin, Calendar } from "@/components/ui/icons";
import type { JourneySummary } from "@/types/journey";

interface JourneyTimelineProps {
  journeys: JourneySummary[];
}

export function JourneyTimeline({ journeys }: JourneyTimelineProps) {
  // Group journeys by year
  const journeysByYear = journeys.reduce(
    (acc, journey) => {
      const year = journey.year;
      if (!acc[year]) acc[year] = [];
      acc[year].push(journey);
      return acc;
    },
    {} as Record<number, JourneySummary[]>
  );

  const years = Object.keys(journeysByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <section className="section-spacing">
      <div className="container-wide">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <p className="text-caption mb-4">The Archive</p>
          <h2 className="text-display-title mb-6">Every Journey, Every Story</h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Scroll through time. Each journey answered a different question,
            left a different mark.
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {years.map((year, yearIndex) => (
            <div key={year} className="mb-24 last:mb-0">
              {/* Year marker */}
              <FadeIn delay={yearIndex * 0.1}>
                <div className="relative flex items-center justify-start md:justify-center mb-12">
                  {/* Line dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-gold border-4 border-background z-10" />

                  {/* Year label */}
                  <div className="ml-12 md:ml-0 px-6 py-2 bg-background-secondary rounded-full border border-white/10">
                    <span className="text-2xl md:text-3xl font-display font-bold text-foreground">
                      {year}
                    </span>
                  </div>
                </div>
              </FadeIn>

              {/* Journey cards for this year */}
              <div className="space-y-8">
                {journeysByYear[year].map((journey, journeyIndex) => (
                  <TimelineJourneyCard
                    key={journey.id}
                    journey={journey}
                    index={journeyIndex}
                    isEven={journeyIndex % 2 === 0}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   TIMELINE JOURNEY CARD
   Individual card within the timeline
   ============================================ */

interface TimelineJourneyCardProps {
  journey: JourneySummary;
  index: number;
  isEven: boolean;
}

function TimelineJourneyCard({ journey, index, isEven }: TimelineJourneyCardProps) {
  const isBikeJourney = journey.travelMode === "SOLO BIKE RIDE";
  const isCarJourney = journey.travelMode === "CAR JOURNEY";
  const showRoute = (isBikeJourney || isCarJourney) && journey.route;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "relative grid md:grid-cols-2 gap-8 items-center",
        "pl-12 md:pl-0"
      )}
    >
      {/* Timeline connector dot */}
      <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 w-3 h-3 rounded-full bg-foreground-subtle border-2 border-background" />

      {/* Content - alternates sides on desktop */}
      <div className={cn("md:pr-12", isEven ? "md:col-start-1" : "md:col-start-2")}>
        <Link href={`/journeys/${journey.slug}`} className="block group">
          <div className="card-journey p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-foreground-subtle">
                  {journey.month}
                </span>
                <TravelModeBadge mode={journey.travelMode} size="sm" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-display-subheading text-foreground mb-2 group-hover:text-accent-gold transition-colors duration-300">
              {journey.title}
            </h3>

            {/* Subtitle */}
            {journey.subtitle && (
              <p className="text-foreground-muted mb-4">
                {journey.subtitle}
              </p>
            )}

            {/* Route stats for bike/car journeys */}
            {showRoute && (
              <div className="flex items-center gap-6 mb-4 text-sm">
                <div className="flex items-center gap-2 text-foreground-muted">
                  <Route className="w-4 h-4" />
                  <span>{journey.route!.totalDistance} km</span>
                </div>
                <div className="flex items-center gap-2 text-foreground-muted">
                  <Calendar className="w-4 h-4" />
                  <span>{journey.route!.totalDays} days</span>
                </div>
              </div>
            )}

            {/* Destination for non-route journeys */}
            {!showRoute && (
              <div className="flex items-center gap-2 text-sm text-foreground-muted mb-4">
                <MapPin className="w-4 h-4" />
                <span>{journey.destination}</span>
              </div>
            )}

            {/* Tagline */}
            <p className="text-sm text-foreground-subtle italic mb-6 line-clamp-2">
              &ldquo;{journey.tagline}&rdquo;
            </p>

            {/* Impact preview bars */}
            <div className="space-y-2 mb-6">
              <ImpactBar
                label="Physical"
                value={journey.impact.physical}
                color="from-orange-500 to-red-500"
              />
              <ImpactBar
                label="Emotional"
                value={journey.impact.emotional}
                color="from-pink-500 to-purple-500"
              />
              <ImpactBar
                label="Spiritual"
                value={journey.impact.spiritual}
                color="from-violet-500 to-indigo-500"
              />
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 text-sm text-foreground-muted group-hover:text-foreground transition-colors">
              <span>Read the story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </div>

      {/* Empty space for alternating layout */}
      <div
        className={cn(
          "hidden md:block",
          isEven ? "md:col-start-2" : "md:col-start-1 md:row-start-1"
        )}
      />
    </motion.div>
  );
}

/* ============================================
   IMPACT BAR
   Small visual indicator for journey impact
   ============================================ */

interface ImpactBarProps {
  label: string;
  value: number;
  color: string;
}

function ImpactBar({ label, value, color }: ImpactBarProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-foreground-subtle w-16">{label}</span>
      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full bg-gradient-to-r", color)}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>
      <span className="text-xs text-foreground-subtle w-8 text-right">{value}</span>
    </div>
  );
}
