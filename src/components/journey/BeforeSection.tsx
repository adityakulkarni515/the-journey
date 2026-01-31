"use client";

/**
 * ============================================
 * BEFORE SECTION
 * Mindset, Expectations, Fears before the journey
 * Hidden in Journal mode (shows only in Story mode)
 * ============================================
 */

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { useViewMode } from "./ViewModeContext";
import type { Transformation } from "@/types/journey";

interface BeforeSectionProps {
  transformation: Transformation;
}

export function BeforeSection({ transformation }: BeforeSectionProps) {
  const { before } = transformation;
  const { viewMode } = useViewMode();

  // Hide in Journal mode - this is a Story-mode element
  if (viewMode === "journal") return null;

  return (
    <section className="section-spacing bg-background-secondary/30">
      <div className="container-wide">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <p className="text-caption mb-4">Before the Journey</p>
          <h2 className="text-display-heading mb-6">The Starting Point</h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Every journey begins somewhere — not just geographically, but mentally.
            This is where I was before I left.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Mindset */}
          <FadeIn delay={0.1}>
            <div className="card-moment h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center">
                  <span className="text-accent-gold text-lg">🧠</span>
                </span>
                <h3 className="text-lg font-display font-semibold text-foreground">
                  Mindset
                </h3>
              </div>
              <p className="text-foreground-muted leading-relaxed">
                {before.mindset}
              </p>
            </div>
          </FadeIn>

          {/* Expectations */}
          <FadeIn delay={0.2}>
            <div className="card-moment h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-accent-sky/10 flex items-center justify-center">
                  <span className="text-accent-sky text-lg">✨</span>
                </span>
                <h3 className="text-lg font-display font-semibold text-foreground">
                  Expectations
                </h3>
              </div>
              <ul className="space-y-3">
                {before.expectations.map((expectation, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3 text-foreground-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-sky mt-2 flex-shrink-0" />
                    {expectation}
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Fears */}
          <FadeIn delay={0.3}>
            <div className="card-moment h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-journey-spiritual/10 flex items-center justify-center">
                  <span className="text-journey-spiritual text-lg">😨</span>
                </span>
                <h3 className="text-lg font-display font-semibold text-foreground">
                  Fears
                </h3>
              </div>
              <ul className="space-y-3">
                {before.fears.map((fear, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 text-foreground-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-journey-spiritual mt-2 flex-shrink-0" />
                    {fear}
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
