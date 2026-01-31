"use client";

/**
 * ============================================
 * SPIRITUAL HERO
 * Hero section for spiritual journeys hub
 * ============================================
 */

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/motion";
import { Heart, Sparkles } from "@/components/ui/icons";

interface SpiritualHeroProps {
  journeyCount: number;
}

export function SpiritualHero({ journeyCount }: SpiritualHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-end pb-20 pt-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-journey-spiritual/20 via-background to-background" />

        {/* Decorative elements */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />

        <div className="vignette" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-3xl">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-journey-spiritual/10 border border-journey-spiritual/20 mb-6">
              <Heart className="w-4 h-4 text-journey-spiritual" />
              <span className="text-sm text-journey-spiritual font-medium">
                Spiritual Journeys Collection
              </span>
            </div>
          </FadeIn>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-display-hero mb-6"
          >
            Where the Soul
            <span className="block text-journey-spiritual/80">Finds Answers</span>
          </motion.h1>

          <FadeIn delay={0.4}>
            <p className="text-body-large max-w-2xl mb-8">
              Banaras, Kumbh, and the sacred spaces that teach through silence and chaos alike.
              These journeys weren&apos;t about finding religion — they were about finding something
              within that I didn&apos;t know was missing.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-journey-spiritual" />
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
