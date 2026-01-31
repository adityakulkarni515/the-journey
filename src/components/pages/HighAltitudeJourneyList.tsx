"use client";

/**
 * ============================================
 * HIGH ALTITUDE JOURNEY LIST
 * List of high-altitude journeys with elevation info
 * ============================================
 */

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { TravelModeBadge } from "@/components/ui/badge";
import { Mountain, Route, Calendar, ArrowRight, Gauge } from "@/components/ui/icons";
import type { JourneySummary } from "@/types/journey";

interface HighAltitudeJourneyListProps {
  journeys: JourneySummary[];
}

export function HighAltitudeJourneyList({ journeys }: HighAltitudeJourneyListProps) {
  return (
    <section className="section-spacing">
      <div className="container-wide">
        <FadeIn className="mb-12">
          <h2 className="text-display-heading mb-4">The Journeys</h2>
          <p className="text-body-large max-w-2xl">
            Each of these journeys pushed limits — physical, mental, and mechanical.
            The mountains don&apos;t care about your plans.
          </p>
        </FadeIn>

        <StaggerContainer className="space-y-6">
          {journeys.map((journey, index) => (
            <HighAltitudeJourneyCard key={journey.id} journey={journey} index={index} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ============================================
   HIGH ALTITUDE JOURNEY CARD
   Custom card emphasizing altitude and route
   ============================================ */

interface HighAltitudeJourneyCardProps {
  journey: JourneySummary;
  index: number;
}

function HighAltitudeJourneyCard({ journey, index }: HighAltitudeJourneyCardProps) {
  const isBikeJourney = journey.travelMode === "SOLO BIKE RIDE";

  return (
    <StaggerItem>
      <Link href={`/journeys/${journey.slug}`} className="block group">
        <motion.div
          whileHover={{ x: 10 }}
          className={cn(
            "relative overflow-hidden rounded-2xl",
            "bg-background-secondary border border-white/5",
            "hover:border-journey-altitude/30 transition-all duration-500"
          )}
        >
          <div className="grid md:grid-cols-[1fr,2fr] gap-0">
            {/* Visual section */}
            <div className="relative aspect-video md:aspect-auto md:min-h-[200px] overflow-hidden">
              {/* Thumbnail image */}
              <Image
                src={journey.thumbnailImage}
                alt={journey.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-journey-altitude/20 via-transparent to-background-secondary/50" />

              {/* Elevation badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-xs font-mono text-journey-altitude">
                  Max {journey.route?.totalDistance ? "5,799m" : "4,000m+"}
                </span>
              </div>

              {/* Travel mode */}
              <div className="absolute bottom-4 left-4">
                <TravelModeBadge mode={journey.travelMode} size="sm" />
              </div>
            </div>

            {/* Content section */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              {/* Header */}
              <div className="flex items-center gap-4 mb-3">
                <span className="text-3xl font-display font-bold text-foreground/20">
                  {journey.year}
                </span>
                <span className="text-sm text-foreground-subtle">
                  {journey.month}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-display font-semibold text-foreground mb-2 group-hover:text-journey-altitude transition-colors">
                {journey.title}
              </h3>

              {/* Subtitle */}
              {journey.subtitle && (
                <p className="text-foreground-muted mb-4">
                  {journey.subtitle}
                </p>
              )}

              {/* Stats */}
              {journey.route && (
                <div className="flex flex-wrap items-center gap-6 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-foreground-muted">
                    <Route className="w-4 h-4 text-journey-altitude" />
                    <span>{journey.route.totalDistance} km</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground-muted">
                    <Calendar className="w-4 h-4 text-journey-altitude" />
                    <span>{journey.route.totalDays} days</span>
                  </div>
                  {isBikeJourney && (
                    <div className="flex items-center gap-2 text-foreground-muted">
                      <Gauge className="w-4 h-4 text-journey-altitude" />
                      <span>Solo Ride</span>
                    </div>
                  )}
                </div>
              )}

              {/* Tagline */}
              <p className="text-sm text-foreground-subtle italic mb-6 line-clamp-2">
                &ldquo;{journey.tagline}&rdquo;
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 text-sm text-foreground-muted group-hover:text-foreground transition-colors">
                <span>Explore journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>

          {/* Decorative line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-journey-altitude/0 via-journey-altitude/50 to-journey-altitude/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      </Link>
    </StaggerItem>
  );
}
