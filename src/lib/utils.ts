import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 * Handles conditional classes and deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string for display
 */
export function formatDate(date: string | Date, format: "full" | "short" | "month-year" = "full"): string {
  const d = new Date(date);

  switch (format) {
    case "short":
      return d.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    case "month-year":
      return d.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    case "full":
    default:
      return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
  }
}

/**
 * Generate a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

/**
 * Truncate text to a specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

/**
 * Get travel mode styling based on journey type
 */
export function getTravelModeStyles(travelMode: string): {
  badge: string;
  color: string;
  icon: string;
} {
  const modeMap: Record<string, { badge: string; color: string; icon: string }> = {
    "SOLO BIKE RIDE": {
      badge: "badge-solo-bike",
      color: "journey-solo",
      icon: "motorcycle",
    },
    "CAR JOURNEY": {
      badge: "badge-car-journey",
      color: "journey-group",
      icon: "car",
    },
    "Flight": {
      badge: "badge-flight",
      color: "accent-sky",
      icon: "plane",
    },
    "Train": {
      badge: "badge-flight",
      color: "accent-sky",
      icon: "train",
    },
    "Flight / Train": {
      badge: "badge-flight",
      color: "accent-sky",
      icon: "plane",
    },
  };

  return modeMap[travelMode] || modeMap["Flight"];
}

/**
 * Get companionship styling
 */
export function getCompanionshipStyles(companionship: string): {
  label: string;
  color: string;
} {
  const companionMap: Record<string, { label: string; color: string }> = {
    "Solo": {
      label: "Solo Journey",
      color: "text-journey-solo",
    },
    "Mixed": {
      label: "Mixed Company",
      color: "text-foreground-muted",
    },
    "Solo / Mixed": {
      label: "Solo & Mixed",
      color: "text-foreground-muted",
    },
    "FRIENDS": {
      label: "With Friends",
      color: "text-journey-group",
    },
  };

  return companionMap[companionship] || { label: companionship, color: "text-foreground-muted" };
}

/**
 * Calculate reading time for content
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generate placeholder image URL
 * Using Unsplash source for high-quality placeholders
 */
export function getPlaceholderImage(
  width: number = 1200,
  height: number = 800,
  category: "mountain" | "temple" | "road" | "nature" | "spiritual" | "city" = "nature"
): string {
  const categoryKeywords: Record<string, string> = {
    mountain: "himalaya,mountain,snow",
    temple: "temple,india,spiritual",
    road: "road,highway,journey",
    nature: "landscape,india,nature",
    spiritual: "meditation,spiritual,peaceful",
    city: "india,city,street",
  };

  return `https://source.unsplash.com/${width}x${height}/?${categoryKeywords[category]}`;
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if we're on the client side
 */
export const isClient = typeof window !== "undefined";

/**
 * Format distance for display
 */
export function formatDistance(km: number): string {
  if (km >= 1000) {
    return `${(km / 1000).toFixed(1)}K km`;
  }
  return `${km} km`;
}

/**
 * Format elevation for display
 */
export function formatElevation(meters: number): string {
  return `${meters.toLocaleString()} m`;
}
