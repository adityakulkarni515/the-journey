/**
 * ============================================
 * JOURNEY TYPES & INTERFACES
 * Core data structures for the travel journal
 * ============================================
 */

/**
 * Travel modes determine the journey's visual treatment
 */
export type TravelMode =
  | "SOLO BIKE RIDE"
  | "CAR JOURNEY"
  | "Flight"
  | "Train"
  | "Flight / Train";

/**
 * Companionship affects narrative style and sections shown
 */
export type Companionship = "Solo" | "Mixed" | "Solo / Mixed" | "FRIENDS";

/**
 * Journey categories for filtering and special sections
 */
export type JourneyCategory = "spiritual" | "high-altitude" | "urban" | "cultural" | "music";

/**
 * Impact metrics for the journey visualization
 */
export interface JourneyImpact {
  physical: number;    // 0-100: Physical effort required
  emotional: number;   // 0-100: Emotional intensity
  spiritual: number;   // 0-100: Spiritual depth
  chaos: number;       // 0-100: Chaos/unpredictability level
}

/**
 * Geographic coordinate for map markers
 */
export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Location data for route mapping
 */
export interface Location {
  name: string;
  coordinates: Coordinates;
  type: "start" | "end" | "waypoint" | "highlight";
  description?: string;
}

/**
 * Route data for bike/car journeys
 */
export interface RouteData {
  locations: Location[];
  totalDistance: number;        // in kilometers
  totalDays: number;
  maxElevation?: number;        // in meters
  minElevation?: number;
  terrainDifficulty?: "easy" | "moderate" | "challenging" | "extreme";
}

/**
 * Day-wise entry for the journey timeline
 */
export interface DayEntry {
  day: number;
  date: string;
  title: string;
  location: string;
  distance?: number;            // km traveled that day
  elevation?: number;           // max elevation reached
  weather?: string;
  mood: "struggling" | "neutral" | "content" | "euphoric" | "excited";
  summary: string;              // Placeholder text, to be replaced with real content
  highlights?: string[];
  peoplemet?: string[];
  food?: string[];
  cost?: number;               // in INR
  images?: string[];           // placeholder paths
  journalEntry?: string;       // raw journal mode content
}

/**
 * A moment card - a single significant memory
 */
export interface Moment {
  id: string;
  image: string;               // placeholder path
  caption: string;             // 2-3 lines of raw writing
  location?: string;
  timestamp?: string;
  mood?: string;
}

/**
 * Learning/insight from the journey
 */
export interface Learning {
  id: string;
  insight: string;
  context?: string;
  category: "life" | "travel" | "self" | "people" | "nature" | "spiritual";
}

/**
 * Before/After transformation section
 */
export interface Transformation {
  before: {
    mindset: string;
    expectations: string[];
    fears: string[];
  };
  after: {
    changes: string[];
    perspectives: string[];
    whatStayed: string[];
  };
}

/**
 * Peak experience - the defining moment
 */
export interface PeakExperience {
  title: string;
  description: string;
  type: "silence" | "chaos" | "devotion" | "awe" | "connection" | "solitude";
  image?: string;
  quote?: string;
}

/**
 * Ambient audio settings for a journey
 */
export interface AmbientAudio {
  enabled: boolean;
  track?: string;              // path to audio file
  description?: string;        // e.g., "Temple bells and morning chants"
}

/**
 * Main Journey interface
 * This is the complete data structure for a journey
 */
export interface Journey {
  // Core metadata
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  date: string;                // YYYY-MM format
  year: number;
  month: string;

  // Classification
  travelMode: TravelMode;
  companionship: Companionship;
  categories: JourneyCategory[];

  // Location data
  destination: string;
  region: string;              // e.g., "North India", "Himalayas"
  route?: RouteData;

  // Visual assets (placeholders)
  heroImage: string;
  thumbnailImage: string;
  galleryImages: string[];

  // Content sections
  tagline: string;             // One-line summary
  introduction: string;        // Opening paragraph
  whyIWent: string;            // Motivation section

  // Journey structure
  transformation: Transformation;
  peakExperience: PeakExperience;
  timeline: DayEntry[];
  moments: Moment[];
  learnings: Learning[];

  // Optional features
  ambientAudio?: AmbientAudio;
  impact: JourneyImpact;

  // Meta
  readingTime: number;         // in minutes
  featured: boolean;
  published: boolean;
  lastUpdated: string;
}

/**
 * Simplified journey data for list views
 */
export interface JourneySummary {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  year: number;
  month: string;
  destination: string;
  region: string;
  travelMode: TravelMode;
  companionship: Companionship;
  categories: JourneyCategory[];
  tagline: string;
  heroImage: string;
  thumbnailImage: string;
  impact: JourneyImpact;
  featured: boolean;
  route?: {
    totalDistance: number;
    totalDays: number;
  };
}

/**
 * Filter options for journey lists
 */
export interface JourneyFilters {
  year?: number;
  travelMode?: TravelMode;
  companionship?: Companionship;
  category?: JourneyCategory;
  region?: string;
}

/**
 * View mode for journey display
 */
export type JourneyViewMode = "story" | "journal";
