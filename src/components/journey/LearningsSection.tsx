"use client";

/**
 * ============================================
 * LEARNINGS SECTION
 * "What I Learned" - Honest insights
 * Hidden in Journal mode (shows only in Story mode)
 * ============================================
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Sparkles, BookOpen, Heart, User, Users, Mountain } from "@/components/ui/icons";
import { useViewMode } from "./ViewModeContext";
import type { Learning } from "@/types/journey";

interface LearningsSectionProps {
  learnings: Learning[];
}

export function LearningsSection({ learnings }: LearningsSectionProps) {
  const { viewMode } = useViewMode();

  // Hide in Journal mode - this is a Story-mode element
  if (viewMode === "journal") return null;

  if (learnings.length === 0) return null;

  const categoryConfig: Record<string, { icon: typeof Sparkles; color: string; bgColor: string }> = {
    life: { icon: Sparkles, color: "text-accent-gold", bgColor: "bg-accent-gold/10" },
    travel: { icon: Mountain, color: "text-journey-altitude", bgColor: "bg-journey-altitude/10" },
    self: { icon: User, color: "text-journey-solo", bgColor: "bg-journey-solo/10" },
    people: { icon: Users, color: "text-journey-group", bgColor: "bg-journey-group/10" },
    nature: { icon: Mountain, color: "text-green-500", bgColor: "bg-green-500/10" },
    spiritual: { icon: Heart, color: "text-journey-spiritual", bgColor: "bg-journey-spiritual/10" },
    perspective: { icon: BookOpen, color: "text-accent-sky", bgColor: "bg-accent-sky/10" },
    cultural: { icon: Users, color: "text-purple-400", bgColor: "bg-purple-400/10" },
  };

  return (
    <section className="section-spacing">
      <div className="container-narrow">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gold/10 text-accent-gold mb-6">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">
              What I Learned
            </span>
          </div>
          <h2 className="text-display-heading mb-6">Honest Reflections</h2>
          <p className="text-body-large max-w-xl mx-auto">
            Not travel tips. Just truths that surfaced along the way.
          </p>
        </FadeIn>

        {/* Learnings list */}
        <StaggerContainer className="space-y-6">
          {learnings.map((learning, index) => {
            const config = categoryConfig[learning.category] || categoryConfig.life;
            const Icon = config.icon;

            return (
              <StaggerItem key={learning.id}>
                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="group"
                >
                  <div className="relative pl-6 py-4 border-l-2 border-white/10 hover:border-accent-gold/50 transition-colors duration-300">
                    {/* Category indicator */}
                    <div className="absolute left-0 top-4 -translate-x-1/2 flex items-center justify-center">
                      <span
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          config.bgColor
                        )}
                      >
                        <Icon className={cn("w-4 h-4", config.color)} />
                      </span>
                    </div>

                    {/* Content */}
                    <div className="pl-6">
                      <p className="text-lg text-foreground leading-relaxed mb-2">
                        {learning.insight}
                      </p>

                      {learning.context && (
                        <p className="text-sm text-foreground-subtle italic">
                          {learning.context}
                        </p>
                      )}

                      <span
                        className={cn(
                          "inline-block mt-3 text-xs uppercase tracking-wider",
                          config.color
                        )}
                      >
                        {learning.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
