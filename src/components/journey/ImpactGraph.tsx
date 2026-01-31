"use client";

/**
 * ============================================
 * IMPACT GRAPH
 * Visual representation of journey impact metrics
 * Hidden in Journal mode (shows only in Story mode)
 * ============================================
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/motion";
import { useViewMode } from "./ViewModeContext";
import type { JourneyImpact, TravelMode } from "@/types/journey";

interface ImpactGraphProps {
  impact: JourneyImpact;
  travelMode: TravelMode;
}

export function ImpactGraph({ impact, travelMode }: ImpactGraphProps) {
  const { viewMode } = useViewMode();

  // Hide in Journal mode - this is a Story-mode element
  if (viewMode === "journal") return null;

  const isBikeJourney = travelMode === "SOLO BIKE RIDE";
  const isCarJourney = travelMode === "CAR JOURNEY";

  const metrics = [
    {
      key: "physical",
      label: "Physical Effort",
      value: impact.physical,
      color: "from-orange-500 to-red-500",
      description: isBikeJourney
        ? "Riding through challenging terrain"
        : isCarJourney
          ? "Road trip endurance"
          : "Walking, exploring, moving",
    },
    {
      key: "emotional",
      label: "Emotional Impact",
      value: impact.emotional,
      color: "from-pink-500 to-purple-500",
      description: "Moments that moved me, for better or worse",
    },
    {
      key: "spiritual",
      label: "Spiritual Depth",
      value: impact.spiritual,
      color: "from-violet-500 to-indigo-500",
      description: "Connection to something larger than myself",
    },
    {
      key: "chaos",
      label: isCarJourney ? "Social Energy" : "Chaos Level",
      value: impact.chaos,
      color: "from-yellow-500 to-orange-500",
      description: isCarJourney
        ? "Group dynamics and shared moments"
        : "Unpredictability and disruption",
    },
  ];

  return (
    <section className="section-spacing bg-background-secondary/30">
      <div className="container-narrow">
        {/* Section header */}
        <FadeIn className="text-center mb-12">
          <p className="text-caption mb-4">Journey Profile</p>
          <h2 className="text-display-heading mb-6">Impact Metrics</h2>
          <p className="text-body-large max-w-xl mx-auto">
            A subjective measure of how this journey affected different aspects of my being.
          </p>
        </FadeIn>

        {/* Metrics */}
        <FadeIn delay={0.1}>
          <div className="space-y-8">
            {metrics.map((metric, index) => (
              <div key={metric.key}>
                {/* Label row */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-foreground font-medium">
                      {metric.label}
                    </span>
                    <p className="text-sm text-foreground-subtle">
                      {metric.description}
                    </p>
                  </div>
                  <span className="text-2xl font-display font-bold text-foreground">
                    {metric.value}
                  </span>
                </div>

                {/* Bar */}
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className={cn(
                      "h-full rounded-full bg-gradient-to-r",
                      metric.color
                    )}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.value}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: 0.2 + index * 0.1,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Summary insight */}
        <FadeIn delay={0.5}>
          <div className="mt-12 p-6 rounded-xl bg-background-tertiary/50 border border-white/5">
            <p className="text-sm text-foreground-muted text-center">
              {getImpactSummary(impact, travelMode)}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/**
 * Generate a summary based on impact metrics
 */
function getImpactSummary(impact: JourneyImpact, travelMode: TravelMode): string {
  const highest = Object.entries(impact).reduce((a, b) =>
    impact[a[0] as keyof JourneyImpact] > impact[b[0] as keyof JourneyImpact] ? a : b
  )[0];

  const summaries: Record<string, string> = {
    physical: "This journey was primarily about pushing physical limits — the body remembers what the mind tries to forget.",
    emotional: "Above all, this was an emotional journey — one that stirred deep feelings and left lasting impressions.",
    spiritual: "This journey was deeply spiritual — a conversation with something beyond the everyday.",
    chaos: travelMode === "CAR JOURNEY"
      ? "The social energy of this trip was its defining feature — shared chaos, shared laughter, shared memories."
      : "Unpredictability defined this journey — plans changed, expectations shattered, reality rewrote itself.",
  };

  return summaries[highest] || "A balanced journey across all dimensions of experience.";
}
