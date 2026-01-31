"use client";

/**
 * ============================================
 * CUSTOM ICONS
 * Journey-specific icons and Lucide re-exports
 * ============================================
 */

import {
  Bike,
  Car,
  Plane,
  Train,
  Mountain,
  Compass,
  MapPin,
  Calendar,
  Clock,
  Users,
  User,
  Heart,
  Flame,
  Wind,
  Sun,
  Moon,
  Cloud,
  Camera,
  BookOpen,
  Quote,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Menu,
  Search,
  Filter,
  Grid,
  List,
  Map,
  Navigation,
  Route,
  Gauge,
  Thermometer,
  Droplets,
  Eye,
  Star,
  Sparkles,
  Music,
  type LucideIcon,
} from "lucide-react";

// Re-export Lucide icons for easy access
export {
  Bike,
  Car,
  Plane,
  Train,
  Mountain,
  Compass,
  MapPin,
  Calendar,
  Clock,
  Users,
  User,
  Heart,
  Flame,
  Wind,
  Sun,
  Moon,
  Cloud,
  Camera,
  BookOpen,
  Quote,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Menu,
  Search,
  Filter,
  Grid,
  List,
  Map,
  Navigation,
  Route,
  Gauge,
  Thermometer,
  Droplets,
  Eye,
  Star,
  Sparkles,
  Music,
};

export type { LucideIcon };

/**
 * Get icon component by travel mode
 */
export function getTravelModeIcon(mode: string): LucideIcon {
  const iconMap: Record<string, LucideIcon> = {
    "SOLO BIKE RIDE": Bike,
    "CAR JOURNEY": Car,
    "Flight": Plane,
    "Train": Train,
    "Flight / Train": Plane,
  };
  return iconMap[mode] || Compass;
}

/**
 * Custom Om/Spiritual icon
 */
export function OmIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8" />
      <path d="M9 12c0-1.66 1.34-3 3-3s3 1.34 3 3" />
      <path d="M12 9v6" />
      <path d="M15 12h-6" />
      <circle cx="12" cy="6" r="1" />
    </svg>
  );
}

/**
 * Motorcycle silhouette icon
 */
export function MotorcycleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="5" cy="17" r="3" />
      <circle cx="19" cy="17" r="3" />
      <path d="M5 17h4l3-6h6" />
      <path d="M14 11l-1 3" />
      <path d="M9 11l-2 3" />
      <path d="M18 8l1 9" />
      <path d="M16 8h3" />
    </svg>
  );
}

/**
 * Prayer wheel icon
 */
export function PrayerWheelIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="8" y="4" width="8" height="14" rx="2" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <circle cx="12" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * Ghat/Temple steps icon
 */
export function GhatIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 22h20" />
      <path d="M4 22v-4h4v4" />
      <path d="M8 18v-4h4v4" />
      <path d="M12 14v-4h4v4" />
      <path d="M16 10V6h4v4" />
      <path d="M3 10c3-4 6-6 9-6s6 2 9 6" />
    </svg>
  );
}

/**
 * Altitude/Mountain pass icon
 */
export function AltitudeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 21l4-10 4 10" />
      <path d="M2 21h20" />
      <path d="M12 11V3" />
      <path d="M9 6l3-3 3 3" />
      <path d="M6 15h12" />
    </svg>
  );
}

/**
 * Journal/Diary icon
 */
export function JournalIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}
