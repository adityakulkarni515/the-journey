"use client";

/**
 * ============================================
 * HIGH ALTITUDE HERO
 * Hero section for high-altitude journeys hub
 * ============================================
 */

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/motion";
import { Mountain, Sparkles } from "@/components/ui/icons";

interface HighAltitudeHeroProps {
  journeyCount: number;
}

export function HighAltitudeHero({ journeyCount }: HighAltitudeHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-end pb-20 pt-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-journey-altitude/20 via-background to-background" />

        {/* Decorative elements */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Mountain silhouette pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-5">
          <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0 200 L100 120 L200 160 L350 80 L450 140 L550 60 L650 100 L800 40 L900 90 L1000 50 L1100 110 L1200 70 L1200 200 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="vignette" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-3xl">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-journey-altitude/10 border border-journey-altitude/20 mb-6">
              <Mountain className="w-4 h-4 text-journey-altitude" />
              <span className="text-sm text-journey-altitude font-medium">
                High-Altitude Collection
              </span>
            </div>
          </FadeIn>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-display-hero mb-6"
          >
            Where Thin Air
            <span className="block text-journey-altitude/80">Clears the Mind</span>
          </motion.h1>

          <FadeIn delay={0.4}>
            <p className="text-body-large max-w-2xl mb-8">
              Spiti, Ladakh, Kashmir — the mountains that test your body and gift you perspective.
              At altitude, distractions disappear. What remains is essential.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-journey-altitude" />
                <span className="text-foreground">
                  <span className="text-2xl font-display font-bold">{journeyCount}</span>
                  <span className="text-foreground-muted ml-2">journeys</span>
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
