"use client";

/**
 * ============================================
 * JOURNEY HERO
 * Cinematic opening for each journey page
 * ============================================
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/motion";
import { TravelModeBadge, CompanionshipBadge, StatBadge } from "@/components/ui/badge";
import { Route, Calendar, Mountain, MapPin } from "@/components/ui/icons";
import type { Journey } from "@/types/journey";

interface JourneyHeroProps {
  journey: Journey;
}

export function JourneyHero({ journey }: JourneyHeroProps) {
  const isBikeJourney = journey.travelMode === "SOLO BIKE RIDE";
  const isCarJourney = journey.travelMode === "CAR JOURNEY";
  const hasRoute = isBikeJourney || isCarJourney;

  return (
    <section className="relative min-h-screen flex items-end pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Hero image if available */}
        {journey.heroImage && (
          <img
            src={journey.heroImage}
            alt={journey.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Fallback gradient based on journey type */}
        <div
          className={cn(
            "absolute inset-0",
            journey.heroImage
              ? "bg-black/40"
              : isBikeJourney
                ? "bg-gradient-to-br from-journey-solo/20 via-background to-background"
                : isCarJourney
                  ? "bg-gradient-to-br from-journey-group/20 via-background to-background"
                  : journey.categories.includes("spiritual")
                    ? "bg-gradient-to-br from-journey-spiritual/20 via-background to-background"
                    : "bg-gradient-to-br from-accent-gold/10 via-background to-background"
          )}
        />

        {/* Pattern overlay (only if no hero image) */}
        {!journey.heroImage && (
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="vignette" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-4xl">
          {/* Year badge */}
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl md:text-8xl font-display font-bold text-foreground/10">
                {journey.year}
              </span>
            </div>
          </FadeIn>

          {/* Badges */}
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <TravelModeBadge mode={journey.travelMode} size="md" />
              <CompanionshipBadge companionship={journey.companionship} size="md" />
              {journey.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1.5 text-xs uppercase tracking-wider text-foreground-subtle bg-white/5 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-display-hero mb-4"
          >
            {journey.title}
          </motion.h1>

          {/* Subtitle */}
          {journey.subtitle && (
            <FadeIn delay={0.5}>
              <p className="text-2xl md:text-3xl text-foreground-muted font-display mb-6">
                {journey.subtitle}
              </p>
            </FadeIn>
          )}

          {/* Tagline */}
          <FadeIn delay={0.6}>
            <blockquote className="text-xl text-foreground-subtle italic border-l-2 border-accent-gold/30 pl-6 mb-10 max-w-2xl">
              &ldquo;{journey.tagline}&rdquo;
            </blockquote>
          </FadeIn>

          {/* Stats row */}
          <FadeIn delay={0.7}>
            <div className="flex flex-wrap gap-4">
              {/* Date */}
              <StatBadge
                value={journey.month}
                label={String(journey.year)}
                icon={<Calendar className="w-5 h-5" />}
              />

              {/* Location */}
              <StatBadge
                value={journey.destination}
                label={journey.region}
                icon={<MapPin className="w-5 h-5" />}
              />

              {/* Route stats for bike/car journeys */}
              {hasRoute && journey.route && (
                <>
                  <StatBadge
                    value={`${journey.route.totalDistance} km`}
                    label="Total Distance"
                    icon={<Route className="w-5 h-5" />}
                  />
                  <StatBadge
                    value={`${journey.route.totalDays} days`}
                    label="Duration"
                    icon={<Calendar className="w-5 h-5" />}
                  />
                  {journey.route.maxElevation && (
                    <StatBadge
                      value={`${journey.route.maxElevation.toLocaleString()}m`}
                      label="Max Elevation"
                      icon={<Mountain className="w-5 h-5" />}
                    />
                  )}
                </>
              )}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-foreground/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
