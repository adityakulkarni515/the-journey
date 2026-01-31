"use client";

/**
 * ============================================
 * AFTER SECTION
 * Transformation, perspective shifts, what stayed
 * Hidden in Journal mode (shows only in Story mode)
 * ============================================
 */

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { ArrowRight, Heart, Eye, Sparkles } from "@/components/ui/icons";
import { useViewMode } from "./ViewModeContext";
import type { Transformation } from "@/types/journey";

interface AfterSectionProps {
  transformation: Transformation;
}

export function AfterSection({ transformation }: AfterSectionProps) {
  const { after } = transformation;
  const { viewMode } = useViewMode();

  // Hide in Journal mode - this is a Story-mode element
  if (viewMode === "journal") return null;

  return (
    <section className="section-spacing bg-background-secondary/30">
      <div className="container-wide">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <p className="text-caption mb-4">After Returning</p>
          <h2 className="text-display-heading mb-6">The Transformation</h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Coming back is never just about geography. Something always shifts.
            This is what changed, what I see differently now, and what stayed.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {/* What Changed */}
          <FadeIn delay={0.1}>
            <div className="h-full">
              <div className="card-moment h-full relative overflow-hidden">
                {/* Accent gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500" />

                <div className="flex items-center gap-3 mb-6 mt-2">
                  <span className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-green-500" />
                  </span>
                  <h3 className="text-xl font-display font-semibold text-foreground">
                    What Changed
                  </h3>
                </div>

                <StaggerContainer>
                  <ul className="space-y-4">
                    {after.changes.map((change, index) => (
                      <StaggerItem key={index}>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                          <span className="text-foreground-muted">{change}</span>
                        </li>
                      </StaggerItem>
                    ))}
                  </ul>
                </StaggerContainer>
              </div>
            </div>
          </FadeIn>

          {/* New Perspectives */}
          <FadeIn delay={0.2}>
            <div className="h-full">
              <div className="card-moment h-full relative overflow-hidden">
                {/* Accent gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />

                <div className="flex items-center gap-3 mb-6 mt-2">
                  <span className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-blue-500" />
                  </span>
                  <h3 className="text-xl font-display font-semibold text-foreground">
                    New Perspectives
                  </h3>
                </div>

                <StaggerContainer>
                  <ul className="space-y-4">
                    {after.perspectives.map((perspective, index) => (
                      <StaggerItem key={index}>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                          <span className="text-foreground-muted">{perspective}</span>
                        </li>
                      </StaggerItem>
                    ))}
                  </ul>
                </StaggerContainer>
              </div>
            </div>
          </FadeIn>

          {/* What Stayed */}
          <FadeIn delay={0.3}>
            <div className="h-full">
              <div className="card-moment h-full relative overflow-hidden">
                {/* Accent gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-rose-500" />

                <div className="flex items-center gap-3 mb-6 mt-2">
                  <span className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-pink-500" />
                  </span>
                  <h3 className="text-xl font-display font-semibold text-foreground">
                    What Stayed
                  </h3>
                </div>

                <StaggerContainer>
                  <ul className="space-y-4">
                    {after.whatStayed.map((item, index) => (
                      <StaggerItem key={index}>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0" />
                          <span className="text-foreground-muted">{item}</span>
                        </li>
                      </StaggerItem>
                    ))}
                  </ul>
                </StaggerContainer>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
