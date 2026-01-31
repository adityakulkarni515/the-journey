"use client";

/**
 * ============================================
 * ON THE ROAD SECTION
 * Day-wise timeline with interactive expansion
 * Adapts based on travel mode and view mode
 * ============================================
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { MoodIndicator } from "@/components/ui/badge";
import { useViewMode } from "./ViewModeContext";
import {
  ChevronDown,
  ChevronUp,
  Route,
  Mountain,
  Cloud,
  MapPin,
  Calendar,
  Users,
  Camera,
  BookOpen,
} from "@/components/ui/icons";
import type { DayEntry, RouteData, TravelMode } from "@/types/journey";

interface OnTheRoadProps {
  timeline: DayEntry[];
  route?: RouteData;
  travelMode: TravelMode;
}

export function OnTheRoad({ timeline, route, travelMode }: OnTheRoadProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const { viewMode } = useViewMode();

  const isBikeJourney = travelMode === "SOLO BIKE RIDE";
  const isCarJourney = travelMode === "CAR JOURNEY";
  const showDistances = isBikeJourney || isCarJourney;

  if (timeline.length === 0) {
    return (
      <section className="section-spacing">
        <div className="container-article text-center">
          <FadeIn>
            <p className="text-caption mb-4">On the Road</p>
            <h2 className="text-display-heading mb-6">Day by Day</h2>
            <p className="text-body-large text-foreground-muted">
              Placeholder: Day-wise entries will be added here. Each day will expand
              to reveal photos, journal notes, food discoveries, people met, and costs.
            </p>
          </FadeIn>
        </div>
      </section>
    );
  }

  // Journal View Mode - Raw diary entries
  if (viewMode === "journal") {
    return (
      <section className="section-spacing">
        <div className="container-article">
          {/* Section header */}
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gold/10 text-accent-gold mb-6">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">
                Raw Journal
              </span>
            </div>
            <h2 className="text-display-heading mb-6">Unfiltered Entries</h2>
            <p className="text-body-large max-w-2xl mx-auto">
              These are the raw notes written during the journey — unedited thoughts,
              feelings, and observations as they happened.
            </p>
          </FadeIn>

          {/* Journal entries */}
          <StaggerContainer className="space-y-8">
            {timeline.map((day) => (
              <StaggerItem key={day.day}>
                <article className="relative pl-8 border-l-2 border-white/10 hover:border-accent-gold/30 transition-colors">
                  {/* Date marker */}
                  <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-background border-2 border-accent-gold" />

                  {/* Entry header */}
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-sm font-mono text-foreground-subtle">
                      Day {day.day}
                    </span>
                    <span className="text-sm text-foreground-muted">
                      {day.location}
                    </span>
                    <MoodIndicator mood={day.mood} size="sm" showLabel />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                    {day.title}
                  </h3>

                  {/* Summary as journal entry */}
                  <p className="text-foreground-muted leading-relaxed mb-4 italic">
                    &ldquo;{day.summary}&rdquo;
                  </p>

                  {/* Raw journal entry if exists */}
                  {day.journalEntry && (
                    <div className="mt-4 p-4 bg-background-secondary/30 rounded-lg border border-white/5">
                      <p className="text-sm text-foreground-subtle leading-relaxed">
                        {day.journalEntry}
                      </p>
                    </div>
                  )}

                  {/* Highlights as bullet points */}
                  {day.highlights && day.highlights.length > 0 && (
                    <ul className="mt-4 space-y-1">
                      {day.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                          <span className="text-accent-gold mt-1">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    );
  }

  // Story View Mode - Full interactive timeline (default)
  return (
    <section className="section-spacing">
      <div className="container-wide">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <p className="text-caption mb-4">On the Road</p>
          <h2 className="text-display-heading mb-6">Day by Day</h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Click on any day to expand and see the full story — the conversations,
            failures, discomforts, and surprises.
          </p>
        </FadeIn>

        {/* Route summary for bike/car journeys */}
        {showDistances && route && (
          <FadeIn className="mb-12">
            <div className="flex flex-wrap items-center justify-center gap-8 p-6 rounded-2xl bg-background-secondary/50 border border-white/5">
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-foreground">
                  {route.totalDistance}
                </p>
                <p className="text-sm text-foreground-subtle">Total km</p>
              </div>
              <div className="w-px h-12 bg-white/10 hidden md:block" />
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-foreground">
                  {route.totalDays}
                </p>
                <p className="text-sm text-foreground-subtle">Days</p>
              </div>
              {route.maxElevation && (
                <>
                  <div className="w-px h-12 bg-white/10 hidden md:block" />
                  <div className="text-center">
                    <p className="text-3xl font-display font-bold text-foreground">
                      {route.maxElevation.toLocaleString()}m
                    </p>
                    <p className="text-sm text-foreground-subtle">Max Elevation</p>
                  </div>
                </>
              )}
              {route.terrainDifficulty && (
                <>
                  <div className="w-px h-12 bg-white/10 hidden md:block" />
                  <div className="text-center">
                    <p className="text-3xl font-display font-bold text-foreground capitalize">
                      {route.terrainDifficulty}
                    </p>
                    <p className="text-sm text-foreground-subtle">Terrain</p>
                  </div>
                </>
              )}
            </div>
          </FadeIn>
        )}

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="timeline-line" />

          {/* Day entries */}
          <div className="space-y-6">
            {timeline.map((day, index) => (
              <DayCard
                key={day.day}
                day={day}
                index={index}
                isExpanded={expandedDay === day.day}
                onToggle={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                showDistance={showDistances}
                isBikeJourney={isBikeJourney}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   DAY CARD
   Individual day entry with expandable content
   ============================================ */

interface DayCardProps {
  day: DayEntry;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  showDistance: boolean;
  isBikeJourney: boolean;
}

function DayCard({
  day,
  index,
  isExpanded,
  onToggle,
  showDistance,
  isBikeJourney,
}: DayCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative pl-12 md:pl-16"
    >
      {/* Timeline dot */}
      <div
        className={cn(
          "absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background z-10",
          isExpanded ? "bg-accent-gold" : "bg-foreground-subtle"
        )}
      />

      {/* Card */}
      <div
        className={cn(
          "card-moment cursor-pointer transition-all duration-300",
          isExpanded && "border-accent-gold/30 bg-background-tertiary"
        )}
        onClick={onToggle}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {/* Day number and date */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-display font-bold text-foreground">
                Day {day.day}
              </span>
              <MoodIndicator mood={day.mood} size="sm" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-medium text-foreground mb-2">
              {day.title}
            </h3>

            {/* Location and stats */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {day.location}
              </span>

              {showDistance && day.distance && (
                <span className="flex items-center gap-1">
                  <Route className="w-4 h-4" />
                  {day.distance} km
                </span>
              )}

              {day.elevation && (
                <span className="flex items-center gap-1">
                  <Mountain className="w-4 h-4" />
                  {day.elevation.toLocaleString()}m
                </span>
              )}

              {day.weather && (
                <span className="flex items-center gap-1">
                  <Cloud className="w-4 h-4" />
                  {day.weather}
                </span>
              )}
            </div>
          </div>

          {/* Expand button */}
          <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-foreground-muted" />
            ) : (
              <ChevronDown className="w-5 h-5 text-foreground-muted" />
            )}
          </button>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-white/5">
                {/* Summary */}
                <p className="text-foreground-muted leading-relaxed mb-6">
                  {day.summary}
                </p>

                {/* Highlights */}
                {day.highlights && day.highlights.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <span className="text-accent-gold">✦</span> Highlights
                    </h4>
                    <ul className="space-y-2">
                      {day.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                          <span className="w-1 h-1 rounded-full bg-accent-gold mt-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* People met */}
                {day.peoplemet && day.peoplemet.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4 text-journey-group" /> People Met
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {day.peoplemet.map((person, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs bg-white/5 rounded-full text-foreground-muted"
                        >
                          {person}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Food */}
                {day.food && day.food.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-3">
                      🍜 Food Discoveries
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {day.food.map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs bg-accent-gold/10 rounded-full text-accent-gold"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cost */}
                {day.cost && (
                  <div className="flex items-center gap-2 text-sm text-foreground-subtle">
                    <span>Day&apos;s cost:</span>
                    <span className="font-mono">₹{day.cost.toLocaleString()}</span>
                  </div>
                )}

                {/* Images placeholder */}
                {day.images && day.images.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <Camera className="w-4 h-4" /> Photos
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {day.images.map((_, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-lg bg-background-secondary"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Journal entry toggle */}
                {day.journalEntry && (
                  <div className="mt-6 p-4 bg-background-secondary/50 rounded-lg border border-white/5">
                    <p className="text-sm text-foreground-subtle italic">
                      &ldquo;{day.journalEntry}&rdquo;
                    </p>
                    <p className="text-xs text-foreground-subtle mt-2 text-right">
                      — Raw journal entry
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
