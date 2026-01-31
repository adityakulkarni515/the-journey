"use client";

/**
 * ============================================
 * JOURNEY MAP
 * Interactive India map with journey pins
 * Shows routes for bike/car journeys
 * ============================================
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/motion";
import { TravelModeBadge } from "@/components/ui/badge";
import { MapPin, Route, X, ArrowRight, Mountain } from "@/components/ui/icons";
import type { JourneySummary } from "@/types/journey";
import Link from "next/link";

interface JourneyMapProps {
  journeys: JourneySummary[];
}

// Approximate coordinates for India destinations (for the SVG map)
const locationCoords: Record<string, { x: number; y: number }> = {
  "North India": { x: 55, y: 25 },
  "Varanasi": { x: 68, y: 40 },
  "Uttar Pradesh": { x: 65, y: 38 },
  "Spiti Valley": { x: 55, y: 22 },
  "Himachal Pradesh": { x: 52, y: 24 },
  "Ladakh": { x: 52, y: 15 },
  "Kashmir": { x: 48, y: 18 },
  "Prayagraj": { x: 68, y: 42 },
  "North East India": { x: 88, y: 38 },
  "Kolkata": { x: 78, y: 48 },
  "West Bengal": { x: 78, y: 46 },
};

export function JourneyMap({ journeys }: JourneyMapProps) {
  const [selectedJourney, setSelectedJourney] = useState<JourneySummary | null>(null);
  const [hoveredJourney, setHoveredJourney] = useState<JourneySummary | null>(null);

  // Get unique destinations with their journeys
  const destinations = journeys.reduce(
    (acc, journey) => {
      const key = journey.destination || journey.region;
      if (!acc[key]) {
        acc[key] = {
          name: key,
          coords: locationCoords[key] || locationCoords[journey.region] || { x: 50, y: 40 },
          journeys: [],
        };
      }
      acc[key].journeys.push(journey);
      return acc;
    },
    {} as Record<string, { name: string; coords: { x: number; y: number }; journeys: JourneySummary[] }>
  );

  return (
    <section className="section-spacing overflow-hidden">
      <div className="container-wide">
        {/* Section header */}
        <FadeIn className="text-center mb-12">
          <p className="text-caption mb-4">The Geography of Experiences</p>
          <h2 className="text-display-title mb-6">Where the Stories Happened</h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Click on a pin to explore the journeys to that destination.
            Routes appear for bike and car journeys.
          </p>
        </FadeIn>

        {/* Map container */}
        <div className="relative">
          {/* SVG Map of India */}
          <div className="relative aspect-[4/3] md:aspect-[16/9] bg-background-secondary rounded-2xl border border-white/5 overflow-hidden">
            {/* Decorative grid */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />

            {/* India outline (simplified SVG) */}
            <svg
              viewBox="0 0 100 80"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Simplified India outline */}
              <path
                d="M45 5 L55 5 L60 10 L65 8 L70 12 L72 20 L75 25 L80 28 L85 35 L90 40 L92 45 L90 50 L85 55 L80 60 L75 65 L70 68 L65 70 L60 68 L55 65 L50 62 L45 60 L40 55 L38 50 L40 45 L42 40 L40 35 L38 30 L40 25 L42 20 L45 15 L45 10 Z"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
                className="transition-all duration-500"
              />

              {/* Route lines for bike/car journeys */}
              {journeys
                .filter((j) => j.travelMode === "SOLO BIKE RIDE" || j.travelMode === "CAR JOURNEY")
                .map((journey) => {
                  const start = locationCoords["North India"] || { x: 50, y: 25 };
                  const end = locationCoords[journey.destination] || locationCoords[journey.region];
                  if (!end) return null;

                  const isBike = journey.travelMode === "SOLO BIKE RIDE";
                  const isSelected = selectedJourney?.id === journey.id;
                  const isHovered = hoveredJourney?.id === journey.id;

                  return (
                    <motion.path
                      key={journey.id}
                      d={`M${start.x},${start.y} Q${(start.x + end.x) / 2},${Math.min(start.y, end.y) - 10} ${end.x},${end.y}`}
                      fill="none"
                      stroke={isBike ? "#f59e0b" : "#8b5cf6"}
                      strokeWidth={isSelected || isHovered ? 2 : 1}
                      strokeDasharray={isBike ? "4,2" : "none"}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: isSelected || isHovered ? 0.8 : 0.3,
                      }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  );
                })}
            </svg>

            {/* Destination pins */}
            {Object.values(destinations).map((dest, index) => {
              const hasMultiple = dest.journeys.length > 1;
              const hasBikeJourney = dest.journeys.some((j) => j.travelMode === "SOLO BIKE RIDE");
              const hasSpiritualJourney = dest.journeys.some((j) => j.categories.includes("spiritual"));

              return (
                <motion.button
                  key={dest.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2",
                    "w-4 h-4 rounded-full cursor-pointer",
                    "transition-all duration-300 hover:scale-150",
                    hasBikeJourney
                      ? "bg-journey-solo"
                      : hasSpiritualJourney
                        ? "bg-journey-spiritual"
                        : "bg-accent-gold"
                  )}
                  style={{
                    left: `${dest.coords.x}%`,
                    top: `${dest.coords.y}%`,
                    boxShadow: `0 0 20px ${hasBikeJourney ? "rgba(245, 158, 11, 0.5)" : hasSpiritualJourney ? "rgba(236, 72, 153, 0.5)" : "rgba(212, 165, 116, 0.5)"}`,
                  }}
                  onClick={() => setSelectedJourney(dest.journeys[0])}
                  onMouseEnter={() => setHoveredJourney(dest.journeys[0])}
                  onMouseLeave={() => setHoveredJourney(null)}
                  aria-label={`View journeys to ${dest.name}`}
                >
                  {/* Pulse animation */}
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full animate-ping",
                      hasBikeJourney
                        ? "bg-journey-solo/50"
                        : hasSpiritualJourney
                          ? "bg-journey-spiritual/50"
                          : "bg-accent-gold/50"
                    )}
                  />

                  {/* Multiple journeys indicator */}
                  {hasMultiple && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-foreground text-background text-[8px] font-bold rounded-full flex items-center justify-center">
                      {dest.journeys.length}
                    </span>
                  )}
                </motion.button>
              );
            })}

            {/* Hover tooltip */}
            <AnimatePresence>
              {hoveredJourney && !selectedJourney && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 p-4 bg-background-secondary/95 backdrop-blur-sm rounded-xl border border-white/10"
                >
                  <p className="text-sm text-foreground-muted mb-1">
                    {hoveredJourney.year}
                  </p>
                  <h4 className="font-display font-semibold text-foreground">
                    {hoveredJourney.title}
                  </h4>
                  <p className="text-sm text-foreground-subtle">
                    Click to explore
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Selected journey detail panel */}
          <AnimatePresence>
            {selectedJourney && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute top-4 right-4 w-80 max-w-[calc(100%-2rem)] bg-background/95 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden"
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedJourney(null)}
                  className="absolute top-4 right-4 p-1 text-foreground-muted hover:text-foreground transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Image placeholder */}
                <div className="aspect-video bg-background-secondary relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-background-secondary to-background-tertiary" />
                  <div className="absolute bottom-4 left-4">
                    <TravelModeBadge mode={selectedJourney.travelMode} size="sm" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-caption mb-2">
                    {selectedJourney.month} {selectedJourney.year}
                  </p>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                    {selectedJourney.title}
                  </h3>
                  {selectedJourney.subtitle && (
                    <p className="text-sm text-foreground-muted mb-4">
                      {selectedJourney.subtitle}
                    </p>
                  )}

                  {/* Route info if applicable */}
                  {selectedJourney.route && (
                    <div className="flex items-center gap-4 mb-4 text-sm text-foreground-muted">
                      <span className="flex items-center gap-1">
                        <Route className="w-4 h-4" />
                        {selectedJourney.route.totalDistance} km
                      </span>
                      <span>{selectedJourney.route.totalDays} days</span>
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href={`/journeys/${selectedJourney.slug}`}
                    className="btn-primary w-full justify-center text-sm"
                  >
                    Read the story
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-journey-solo" />
              <span className="text-foreground-muted">Solo Bike Ride</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-journey-group" />
              <span className="text-foreground-muted">Road Trip</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-journey-spiritual" />
              <span className="text-foreground-muted">Spiritual</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent-gold" />
              <span className="text-foreground-muted">Cultural</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
