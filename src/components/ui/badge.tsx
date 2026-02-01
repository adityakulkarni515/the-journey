"use client";

/**
 * ============================================
 * BADGE COMPONENTS
 * Travel mode, category, and metadata badges
 * ============================================
 */

import { cn } from "@/lib/utils";
import { getTravelModeIcon, Bike, Car, Plane, User, Users, Mountain, Heart, Music } from "./icons";
import type { TravelMode, Companionship, JourneyCategory } from "@/types/journey";

/* ============================================
   TRAVEL MODE BADGE
   ============================================ */

interface TravelModeBadgeProps {
  mode: TravelMode;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function TravelModeBadge({
  mode,
  size = "md",
  showLabel = true,
  className,
}: TravelModeBadgeProps) {
  const Icon = getTravelModeIcon(mode);

  const sizeClasses = {
    sm: "px-2 py-1 text-xs gap-1",
    md: "px-3 py-1.5 text-xs gap-2",
    lg: "px-4 py-2 text-sm gap-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const styleMap: Record<TravelMode, string> = {
    "SOLO BIKE RIDE": "bg-journey-solo/10 text-journey-solo border-journey-solo/20",
    "CAR JOURNEY": "bg-journey-group/10 text-journey-group border-journey-group/20",
    "Flight": "bg-accent-sky/10 text-accent-sky border-accent-sky/20",
    "Train": "bg-accent-sky/10 text-accent-sky border-accent-sky/20",
    "Flight / Train": "bg-accent-sky/10 text-accent-sky border-accent-sky/20",
  };

  const labelMap: Record<TravelMode, string> = {
    "SOLO BIKE RIDE": "Solo Bike Ride",
    "CAR JOURNEY": "Road Trip",
    "Flight": "Flight",
    "Train": "Train",
    "Flight / Train": "Flight & Train",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium uppercase tracking-wider",
        sizeClasses[size],
        styleMap[mode],
        className
      )}
    >
      <Icon className={iconSizes[size]} />
      {showLabel && <span>{labelMap[mode]}</span>}
    </span>
  );
}

/* ============================================
   COMPANIONSHIP BADGE
   ============================================ */

interface CompanionshipBadgeProps {
  companionship: Companionship;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CompanionshipBadge({
  companionship,
  size = "md",
  className,
}: CompanionshipBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs gap-1",
    md: "px-3 py-1.5 text-xs gap-2",
    lg: "px-4 py-2 text-sm gap-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const configMap: Record<Companionship, { icon: typeof User; label: string; style: string }> = {
    "Solo": {
      icon: User,
      label: "Solo",
      style: "bg-journey-solo/10 text-journey-solo border-journey-solo/20",
    },
    "Mixed": {
      icon: Users,
      label: "Mixed",
      style: "bg-foreground/5 text-foreground-muted border-foreground/10",
    },
    "Solo / Mixed": {
      icon: User,
      label: "Solo & Mixed",
      style: "bg-foreground/5 text-foreground-muted border-foreground/10",
    },
    "FRIENDS": {
      icon: Users,
      label: "With Friends",
      style: "bg-journey-group/10 text-journey-group border-journey-group/20",
    },
  };

  const config = configMap[companionship];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium uppercase tracking-wider",
        sizeClasses[size],
        config.style,
        className
      )}
    >
      <Icon className={iconSizes[size]} />
      <span>{config.label}</span>
    </span>
  );
}

/* ============================================
   CATEGORY BADGE
   ============================================ */

interface CategoryBadgeProps {
  category: JourneyCategory;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CategoryBadge({
  category,
  size = "md",
  className,
}: CategoryBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs gap-1",
    md: "px-3 py-1.5 text-xs gap-2",
    lg: "px-4 py-2 text-sm gap-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const configMap: Record<JourneyCategory, { icon: typeof Mountain; label: string; style: string }> = {
    "spiritual": {
      icon: Heart,
      label: "Spiritual",
      style: "bg-journey-spiritual/10 text-journey-spiritual border-journey-spiritual/20",
    },
    "high-altitude": {
      icon: Mountain,
      label: "High Altitude",
      style: "bg-journey-altitude/10 text-journey-altitude border-journey-altitude/20",
    },
    "cultural": {
      icon: Users,
      label: "Cultural",
      style: "bg-accent-gold/10 text-accent-gold border-accent-gold/20",
    },
    "urban": {
      icon: Users,
      label: "Urban",
      style: "bg-foreground/5 text-foreground-muted border-foreground/10",
    },
    "music": {
      icon: Music,
      label: "Music",
      style: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    },
  };

  const config = configMap[category];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium uppercase tracking-wider",
        sizeClasses[size],
        config.style,
        className
      )}
    >
      <Icon className={iconSizes[size]} />
      <span>{config.label}</span>
    </span>
  );
}

/* ============================================
   STAT BADGE (for distances, elevations, etc.)
   ============================================ */

interface StatBadgeProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatBadge({ value, label, icon, className }: StatBadgeProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 px-4 py-3 rounded-xl",
        "bg-background-tertiary/50 border border-white/5",
        className
      )}
    >
      {icon && <span className="text-foreground-muted">{icon}</span>}
      <span className="text-lg font-display font-semibold text-foreground">{value}</span>
      <span className="text-xs text-foreground-subtle uppercase tracking-wider">{label}</span>
    </div>
  );
}

/* ============================================
   YEAR BADGE
   ============================================ */

interface YearBadgeProps {
  year: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function YearBadge({ year, isActive, onClick, className }: YearBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full font-mono text-sm transition-all duration-300",
        isActive
          ? "bg-foreground text-background"
          : "bg-transparent text-foreground-muted border border-white/10 hover:border-white/20 hover:text-foreground",
        className
      )}
    >
      {year}
    </button>
  );
}

/* ============================================
   MOOD INDICATOR
   ============================================ */

interface MoodIndicatorProps {
  mood: string;
  size?: "sm" | "md";
  showLabel?: boolean;
  className?: string;
}

export function MoodIndicator({
  mood,
  size = "md",
  showLabel = false,
  className,
}: MoodIndicatorProps) {
  const moodConfig: Record<string, { color: string; label: string }> = {
    struggling: { color: "bg-red-500", label: "Struggling" },
    neutral: { color: "bg-gray-500", label: "Neutral" },
    content: { color: "bg-green-500", label: "Content" },
    euphoric: { color: "bg-yellow-500", label: "Euphoric" },
    excited: { color: "bg-orange-500", label: "Excited" },
    reflective: { color: "bg-blue-500", label: "Reflective" },
  };

  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
  };

  const config = moodConfig[mood] || moodConfig.neutral;

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className={cn("rounded-full", sizeClasses[size], config.color)} />
      {showLabel && (
        <span className="text-xs text-foreground-muted">{config.label}</span>
      )}
    </span>
  );
}
