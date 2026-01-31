"use client";

/**
 * ============================================
 * JOURNEY CARD
 * Premium card component for journey listings
 * Adapts based on travel mode metadata
 * ============================================
 */

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TravelModeBadge, CompanionshipBadge } from "@/components/ui/badge";
import { ArrowRight, Route, Calendar, Mountain } from "@/components/ui/icons";
import type { JourneySummary } from "@/types/journey";

interface JourneyCardProps {
  journey: JourneySummary;
  index?: number;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export function JourneyCard({
  journey,
  index = 0,
  variant = "default",
  className,
}: JourneyCardProps) {
  const isBikeJourney = journey.travelMode === "SOLO BIKE RIDE";
  const isCarJourney = journey.travelMode === "CAR JOURNEY";
  const showRoute = isBikeJourney || isCarJourney;

  if (variant === "featured") {
    return <FeaturedJourneyCard journey={journey} index={index} className={className} />;
  }

  if (variant === "compact") {
    return <CompactJourneyCard journey={journey} className={className} />;
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn("group", className)}
    >
      <Link href={`/journeys/${journey.slug}`} className="block">
        <div className="card-journey overflow-hidden">
          {/* Image Section */}
          <div className="relative aspect-[16/10] overflow-hidden">
            {/* Actual image or placeholder gradient */}
            {journey.thumbnailImage || journey.heroImage ? (
              <img
                src={journey.thumbnailImage || journey.heroImage}
                alt={journey.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-background-secondary to-background-tertiary" />
                {/* Placeholder image pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
              </>
            )}

            {/* Journey year badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-mono text-foreground">
                {journey.year}
              </span>
            </div>

            {/* Travel mode indicator */}
            <div className="absolute top-4 right-4">
              <TravelModeBadge mode={journey.travelMode} size="sm" showLabel={false} />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

            {/* Route stats for bike/car journeys */}
            {showRoute && journey.route && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-foreground/80">
                  <Route className="w-4 h-4" />
                  <span>{journey.route.totalDistance} km</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/80">
                  <Calendar className="w-4 h-4" />
                  <span>{journey.route.totalDays} days</span>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Destination & Region */}
            <p className="text-caption mb-2">{journey.region}</p>

            {/* Title */}
            <h3 className="text-display-subheading text-foreground mb-2 group-hover:text-accent-gold transition-colors duration-300">
              {journey.title}
            </h3>

            {/* Subtitle */}
            {journey.subtitle && (
              <p className="text-foreground-muted text-sm mb-4 line-clamp-2">
                {journey.subtitle}
              </p>
            )}

            {/* Tagline */}
            <p className="text-foreground-subtle text-sm italic mb-6 line-clamp-2">
              &ldquo;{journey.tagline}&rdquo;
            </p>

            {/* Footer with badges and CTA */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TravelModeBadge mode={journey.travelMode} size="sm" />
              </div>

              <span className="inline-flex items-center gap-2 text-sm text-foreground-muted group-hover:text-foreground transition-colors">
                Explore
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* ============================================
   FEATURED JOURNEY CARD
   Larger, more prominent display
   ============================================ */

function FeaturedJourneyCard({
  journey,
  index,
  className,
}: {
  journey: JourneySummary;
  index: number;
  className?: string;
}) {
  const isBikeJourney = journey.travelMode === "SOLO BIKE RIDE";
  const isCarJourney = journey.travelMode === "CAR JOURNEY";
  const showRoute = isBikeJourney || isCarJourney;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className={cn("group", className)}
    >
      <Link href={`/journeys/${journey.slug}`} className="block">
        <div className="relative overflow-hidden rounded-3xl bg-background-secondary border border-white/5 hover:border-white/10 transition-all duration-500">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden">
              {/* Actual image or placeholder gradient */}
              {journey.heroImage ? (
                <img
                  src={journey.heroImage}
                  alt={journey.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-background-secondary via-background-tertiary to-background" />
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>
                </>
              )}

              {/* Featured badge */}
              <div className="absolute top-6 left-6">
                <span className="px-3 py-1.5 bg-accent-gold/20 backdrop-blur-sm rounded-full text-xs font-medium text-accent-gold uppercase tracking-wider">
                  Featured Journey
                </span>
              </div>

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background-secondary lg:via-transparent lg:to-background-secondary" />
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Year & Mode */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-display font-bold text-foreground/20">
                  {journey.year}
                </span>
                <TravelModeBadge mode={journey.travelMode} size="md" />
              </div>

              {/* Title */}
              <h3 className="text-display-heading text-foreground mb-3 group-hover:text-accent-gold transition-colors duration-500">
                {journey.title}
              </h3>

              {/* Subtitle */}
              {journey.subtitle && (
                <p className="text-xl text-foreground-muted mb-6">
                  {journey.subtitle}
                </p>
              )}

              {/* Tagline */}
              <blockquote className="text-lg text-foreground-subtle italic border-l-2 border-accent-gold/30 pl-4 mb-8">
                {journey.tagline}
              </blockquote>

              {/* Stats for route journeys */}
              {showRoute && journey.route && (
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Route className="w-5 h-5 text-foreground-muted" />
                    <span className="text-foreground font-medium">
                      {journey.route.totalDistance} km
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-foreground-muted" />
                    <span className="text-foreground font-medium">
                      {journey.route.totalDays} days
                    </span>
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-8">
                {journey.categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 text-xs text-foreground-subtle bg-white/5 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-3 text-foreground group-hover:text-accent-gold transition-colors">
                <span className="font-medium">Read the story</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* ============================================
   COMPACT JOURNEY CARD
   For sidebar or dense listings
   ============================================ */

function CompactJourneyCard({
  journey,
  className,
}: {
  journey: JourneySummary;
  className?: string;
}) {
  return (
    <Link href={`/journeys/${journey.slug}`} className="block group">
      <div
        className={cn(
          "flex items-center gap-4 p-4 rounded-xl",
          "bg-background-secondary/50 border border-white/5",
          "hover:bg-background-secondary hover:border-white/10 transition-all duration-300",
          className
        )}
      >
        {/* Small thumbnail */}
        <div className="w-16 h-16 rounded-lg bg-background-tertiary flex-shrink-0 overflow-hidden">
          {journey.thumbnailImage || journey.heroImage ? (
            <img
              src={journey.thumbnailImage || journey.heroImage}
              alt={journey.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-background-secondary to-background-tertiary" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-foreground-subtle uppercase tracking-wider mb-1">
            {journey.month} {journey.year}
          </p>
          <h4 className="font-display font-medium text-foreground group-hover:text-accent-gold transition-colors truncate">
            {journey.title}
          </h4>
          <p className="text-sm text-foreground-muted truncate">
            {journey.destination}
          </p>
        </div>

        {/* Arrow */}
        <ArrowRight className="w-4 h-4 text-foreground-subtle group-hover:text-foreground group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}
