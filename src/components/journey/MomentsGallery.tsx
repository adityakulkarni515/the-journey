"use client";

/**
 * ============================================
 * MOMENTS GALLERY
 * Collection of significant memory cards
 * ============================================
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { MapPin, Quote } from "@/components/ui/icons";
import type { Moment } from "@/types/journey";

interface MomentsGalleryProps {
  moments: Moment[];
}

export function MomentsGallery({ moments }: MomentsGalleryProps) {
  if (moments.length === 0) return null;

  return (
    <section className="section-spacing">
      <div className="container-wide">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <p className="text-caption mb-4">Captured Moments</p>
          <h2 className="text-display-heading mb-6">The Fragments That Remain</h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Not every moment makes it to the timeline. Some exist outside of sequence —
            raw, unordered memories that surface unexpectedly.
          </p>
        </FadeIn>

        {/* Moments grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moments.map((moment, index) => (
            <MomentCard key={moment.id} moment={moment} index={index} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ============================================
   MOMENT CARD
   Single memory with image and caption
   ============================================ */

interface MomentCardProps {
  moment: Moment;
  index: number;
}

function MomentCard({ moment, index }: MomentCardProps) {
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="group cursor-pointer"
      >
        <div className="relative overflow-hidden rounded-2xl bg-background-secondary border border-white/5 hover:border-white/10 transition-all duration-500">
          {/* Image */}
          <div className="relative overflow-hidden">
            {/* Actual image or fallback gradient */}
            {moment.image ? (
              <img
                src={moment.image}
                alt={moment.caption}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="aspect-[4/3] bg-gradient-to-br from-background-secondary to-background-tertiary" />
            )}

            {/* Location badge */}
            {moment.location && (
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                <MapPin className="w-3 h-3 text-foreground/80" />
                <span className="text-xs text-foreground/80">{moment.location}</span>
              </div>
            )}
          </div>

          {/* Caption */}
          <div className="p-5">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-accent-gold/50 flex-shrink-0 mt-1" />
              <p className="text-foreground-muted leading-relaxed text-sm">
                {moment.caption}
              </p>
            </div>

            {/* Timestamp */}
            {moment.timestamp && (
              <p className="text-xs text-foreground-subtle mt-4 text-right">
                {moment.timestamp}
              </p>
            )}
          </div>

          {/* Blur effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-50" />
          </motion.div>
        </div>
      </motion.div>
    </StaggerItem>
  );
}
