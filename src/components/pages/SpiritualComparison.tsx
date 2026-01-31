"use client";

/**
 * ============================================
 * SPIRITUAL COMPARISON
 * Compare solo vs group spirituality
 * ============================================
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/motion";
import { User, Users } from "@/components/ui/icons";

export function SpiritualComparison() {
  return (
    <section className="section-spacing bg-background-secondary/30">
      <div className="container-wide">
        <FadeIn className="text-center mb-16">
          <p className="text-caption mb-4">A Reflection</p>
          <h2 className="text-display-heading mb-6">Solo vs Group Spirituality</h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Banaras alone felt different than Kumbh with friends.
            Here&apos;s what I observed about spirituality in different contexts.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Solo */}
          <FadeIn delay={0.1}>
            <div className="card-moment h-full">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-14 h-14 rounded-2xl bg-journey-solo/10 flex items-center justify-center">
                  <User className="w-7 h-7 text-journey-solo" />
                </span>
                <div>
                  <h3 className="text-xl font-display font-semibold text-foreground">
                    Solo Spirituality
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    Banaras 2023, 2024
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-journey-solo mt-2 flex-shrink-0" />
                  <span className="text-foreground-muted">
                    Placeholder: The silence has more space when you&apos;re alone
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-journey-solo mt-2 flex-shrink-0" />
                  <span className="text-foreground-muted">
                    Placeholder: No one to share the moment with — but no one to dilute it either
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-journey-solo mt-2 flex-shrink-0" />
                  <span className="text-foreground-muted">
                    Placeholder: Your thoughts are louder, confrontations with self are unavoidable
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-journey-solo mt-2 flex-shrink-0" />
                  <span className="text-foreground-muted">
                    Placeholder: The experience is entirely personal, unmediated
                  </span>
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* Group */}
          <FadeIn delay={0.2}>
            <div className="card-moment h-full">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-14 h-14 rounded-2xl bg-journey-group/10 flex items-center justify-center">
                  <Users className="w-7 h-7 text-journey-group" />
                </span>
                <div>
                  <h3 className="text-xl font-display font-semibold text-foreground">
                    Group Spirituality
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    Maha Kumbh 2025
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-journey-group mt-2 flex-shrink-0" />
                  <span className="text-foreground-muted">
                    Placeholder: Shared experiences create a different kind of sacred
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-journey-group mt-2 flex-shrink-0" />
                  <span className="text-foreground-muted">
                    Placeholder: Witnessing others&apos; faith can strengthen or question your own
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-journey-group mt-2 flex-shrink-0" />
                  <span className="text-foreground-muted">
                    Placeholder: The collective energy of millions is its own phenomenon
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-journey-group mt-2 flex-shrink-0" />
                  <span className="text-foreground-muted">
                    Placeholder: Late-night conversations deepen the experience
                  </span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>

        {/* Insight */}
        <FadeIn delay={0.3}>
          <div className="mt-12 p-8 rounded-2xl bg-journey-spiritual/5 border border-journey-spiritual/10 text-center">
            <p className="text-lg text-foreground-muted italic max-w-2xl mx-auto">
              Placeholder: Write your insight here about how solo and group spirituality
              complement each other, and what you learned about faith from experiencing both.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
