"use client";

/**
 * ============================================
 * JOURNEY INTRO
 * Introduction and "Why I Went" section
 * Hidden in Journal mode (shows only in Story mode)
 * ============================================
 */

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/motion";
import { useViewMode } from "./ViewModeContext";
import type { Journey } from "@/types/journey";

interface JourneyIntroProps {
  journey: Journey;
}

export function JourneyIntro({ journey }: JourneyIntroProps) {
  const { viewMode } = useViewMode();

  // Hide in Journal mode - this is a Story-mode element
  if (viewMode === "journal") return null;

  return (
    <section className="section-spacing">
      <div className="container-article">
        {/* Introduction */}
        <FadeIn>
          <div className="prose-journey mb-16">
            <p className="text-xl md:text-2xl leading-relaxed text-foreground-muted">
              {journey.introduction}
            </p>
          </div>
        </FadeIn>

        {/* Why I Went */}
        <FadeIn delay={0.2}>
          <div className="relative pl-8 border-l border-accent-gold/30">
            <div className="absolute left-0 top-0 w-1 h-12 bg-gradient-to-b from-accent-gold to-transparent" />

            <p className="text-caption mb-4">Why I Went</p>
            <p className="text-lg text-foreground-muted leading-relaxed">
              {journey.whyIWent}
            </p>
          </div>
        </FadeIn>

        {/* Reading time indicator */}
        <FadeIn delay={0.3}>
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-foreground-subtle">
              {journey.readingTime} min read
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
