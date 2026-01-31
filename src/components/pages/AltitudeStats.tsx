"use client";

/**
 * ============================================
 * ALTITUDE STATS
 * Key statistics for high-altitude journeys
 * ============================================
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Mountain, Route, Calendar, Gauge, Thermometer } from "@/components/ui/icons";
import type { JourneySummary } from "@/types/journey";

interface AltitudeStatsProps {
  journeys: JourneySummary[];
}

export function AltitudeStats({ journeys }: AltitudeStatsProps) {
  // Calculate aggregate stats
  const totalDistance = journeys.reduce(
    (sum, j) => sum + (j.route?.totalDistance || 0),
    0
  );

  const totalDays = journeys.reduce(
    (sum, j) => sum + (j.route?.totalDays || 0),
    0
  );

  const stats = [
    {
      icon: Mountain,
      value: "5,799m",
      label: "Highest Point",
      sublabel: "Umling La, Ladakh",
      color: "text-journey-altitude",
      bgColor: "bg-journey-altitude/10",
    },
    {
      icon: Route,
      value: `${totalDistance.toLocaleString()} km`,
      label: "Total Distance",
      sublabel: "Across all journeys",
      color: "text-journey-solo",
      bgColor: "bg-journey-solo/10",
    },
    {
      icon: Calendar,
      value: `${totalDays}+`,
      label: "Days at Altitude",
      sublabel: "Above 3,000m",
      color: "text-accent-gold",
      bgColor: "bg-accent-gold/10",
    },
    {
      icon: Gauge,
      value: "3",
      label: "Passes Crossed",
      sublabel: "Above 5,000m",
      color: "text-accent-sky",
      bgColor: "bg-accent-sky/10",
    },
  ];

  return (
    <section className="py-12">
      <div className="container-wide">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StaggerItem key={stat.label}>
              <motion.div
                whileHover={{ y: -5 }}
                className="card-moment text-center"
              >
                <span
                  className={cn(
                    "inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4",
                    stat.bgColor
                  )}
                >
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </span>
                <p className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-foreground-muted">{stat.label}</p>
                <p className="text-xs text-foreground-subtle mt-1">{stat.sublabel}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
