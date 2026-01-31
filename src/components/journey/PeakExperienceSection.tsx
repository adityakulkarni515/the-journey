"use client";

/**
 * ============================================
 * PEAK EXPERIENCE SECTION
 * The defining moment of the journey
 * Hidden in Journal mode (shows only in Story mode)
 * ============================================
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/motion";
import { Sparkles } from "@/components/ui/icons";
import { useViewMode } from "./ViewModeContext";
import type { PeakExperience } from "@/types/journey";

interface PeakExperienceSectionProps {
  peakExperience: PeakExperience;
}

export function PeakExperienceSection({ peakExperience }: PeakExperienceSectionProps) {
  const { viewMode } = useViewMode();

  // Hide in Journal mode - this is a Story-mode element
  if (viewMode === "journal") return null;
  const typeStyles = {
    silence: "from-indigo-500/20 to-violet-500/20",
    chaos: "from-orange-500/20 to-red-500/20",
    devotion: "from-pink-500/20 to-rose-500/20",
    awe: "from-cyan-500/20 to-blue-500/20",
    connection: "from-green-500/20 to-emerald-500/20",
    solitude: "from-gray-500/20 to-slate-500/20",
  };

  const typeIcons = {
    silence: "🤫",
    chaos: "🌀",
    devotion: "🙏",
    awe: "😮",
    connection: "🤝",
    solitude: "🧘",
  };

  return (
    <section className="section-spacing overflow-hidden">
      <div className="container-narrow">
        {/* Section label */}
        <FadeIn className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gold/10 text-accent-gold mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Peak Experience
            </span>
          </div>
        </FadeIn>

        {/* Main card */}
        <FadeIn delay={0.1}>
          <motion.div
            className={cn(
              "relative p-8 md:p-12 rounded-3xl overflow-hidden",
              "border border-white/10"
            )}
          >
            {/* Background gradient */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-50",
                typeStyles[peakExperience.type]
              )}
            />

            {/* Content */}
            <div className="relative">
              {/* Type indicator */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{typeIcons[peakExperience.type]}</span>
                <span className="text-sm text-foreground-muted uppercase tracking-wider">
                  A moment of {peakExperience.type}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-display-heading text-foreground mb-6">
                {peakExperience.title}
              </h2>

              {/* Description */}
              <p className="text-xl text-foreground-muted leading-relaxed mb-8">
                {peakExperience.description}
              </p>

              {/* Quote if present */}
              {peakExperience.quote && (
                <blockquote className="relative pl-6 border-l-2 border-accent-gold/50">
                  <p className="text-lg text-foreground/80 italic">
                    &ldquo;{peakExperience.quote}&rdquo;
                  </p>
                </blockquote>
              )}

              {/* Image placeholder */}
              {peakExperience.image && (
                <div className="mt-8 aspect-video rounded-xl bg-background-secondary overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-background-secondary to-background-tertiary" />
                </div>
              )}
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
