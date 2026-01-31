"use client";

/**
 * ============================================
 * JOURNEY GRID
 * Filterable grid of all journeys
 * ============================================
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { JourneyCard } from "@/components/journey/JourneyCard";
import { YearBadge, TravelModeBadge } from "@/components/ui/badge";
import { Filter, Grid, List } from "@/components/ui/icons";
import type { JourneySummary, TravelMode } from "@/types/journey";

interface JourneyGridProps {
  journeys: JourneySummary[];
  years: number[];
}

const travelModes: TravelMode[] = [
  "SOLO BIKE RIDE",
  "CAR JOURNEY",
  "Flight",
  "Flight / Train",
];

export function JourneyGrid({ journeys, years }: JourneyGridProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMode, setSelectedMode] = useState<TravelMode | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter journeys
  const filteredJourneys = journeys.filter((journey) => {
    if (selectedYear && journey.year !== selectedYear) return false;
    if (selectedMode && journey.travelMode !== selectedMode) return false;
    return true;
  });

  return (
    <section className="section-spacing">
      <div className="container-wide">
        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Year filters */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-foreground-muted mr-2">Year:</span>
            <button
              onClick={() => setSelectedYear(null)}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-all",
                selectedYear === null
                  ? "bg-foreground text-background"
                  : "text-foreground-muted hover:text-foreground"
              )}
            >
              All
            </button>
            {years.map((year) => (
              <YearBadge
                key={year}
                year={year}
                isActive={selectedYear === year}
                onClick={() => setSelectedYear(selectedYear === year ? null : year)}
              />
            ))}
          </div>

          {/* Mode filters */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-foreground-muted mr-2">Type:</span>
            <button
              onClick={() => setSelectedMode(null)}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-all",
                selectedMode === null
                  ? "bg-foreground text-background"
                  : "text-foreground-muted hover:text-foreground"
              )}
            >
              All
            </button>
            {travelModes.map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(selectedMode === mode ? null : mode)}
                className={cn(
                  "transition-all",
                  selectedMode === mode ? "opacity-100" : "opacity-60 hover:opacity-100"
                )}
              >
                <TravelModeBadge mode={mode} size="sm" />
              </button>
            ))}
          </div>

          {/* View toggle & count */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <p className="text-sm text-foreground-muted">
              Showing {filteredJourneys.length} of {journeys.length} journeys
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === "grid"
                    ? "bg-white/10 text-foreground"
                    : "text-foreground-muted hover:text-foreground"
                )}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === "list"
                    ? "bg-white/10 text-foreground"
                    : "text-foreground-muted hover:text-foreground"
                )}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Journey grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedYear}-${selectedMode}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={cn(
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            )}
          >
            {filteredJourneys.map((journey, index) => (
              <JourneyCard
                key={journey.id}
                journey={journey}
                index={index}
                variant={viewMode === "list" ? "compact" : "default"}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredJourneys.length === 0 && (
          <div className="text-center py-16">
            <p className="text-foreground-muted">
              No journeys match your filters.
            </p>
            <button
              onClick={() => {
                setSelectedYear(null);
                setSelectedMode(null);
              }}
              className="mt-4 text-accent-gold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
