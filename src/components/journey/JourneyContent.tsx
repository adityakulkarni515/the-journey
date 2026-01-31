"use client";

/**
 * ============================================
 * JOURNEY CONTENT
 * Client wrapper for journey page with ViewMode context
 * ============================================
 */

import { ViewModeProvider } from "./ViewModeContext";
import { JourneyHero } from "./JourneyHero";
import { JourneyIntro } from "./JourneyIntro";
import { BeforeSection } from "./BeforeSection";
import { OnTheRoad } from "./OnTheRoad";
import { PeakExperienceSection } from "./PeakExperienceSection";
import { AfterSection } from "./AfterSection";
import { MomentsGallery } from "./MomentsGallery";
import { LearningsSection } from "./LearningsSection";
import { ImpactGraph } from "./ImpactGraph";
import { JourneyNav } from "./JourneyNav";
import { AmbientAudioPlayer } from "./AmbientAudioPlayer";
import type { Journey } from "@/types/journey";

interface JourneyContentProps {
  journey: Journey;
}

// Map journey slugs to audio files
const audioMap: Record<string, { track: string; description: string }> = {
  "kashmir-2024": {
    track: "/audio/kashmir.mp3",
    description: "Peaceful Kashmir ambience",
  },
  "mahakumbh-2025": {
    track: "/audio/banaras.mp3",
    description: "Sacred chants and temple bells",
  },
  "banaras-2023": {
    track: "/audio/banaras.mp3",
    description: "Sacred Ganga aarti ambience",
  },
  "banaras-2024": {
    track: "/audio/banaras.mp3",
    description: "Sacred Ganga aarti ambience",
  },
  "ladakh-2024": {
    track: "/audio/ladakh.mp3",
    description: "Mountain winds and monastery bells",
  },
  "spiti-2023": {
    track: "/audio/spiti.mp3",
    description: "High altitude silence and wind",
  },
  "northeast-2025": {
    track: "/audio/ladakh.mp3",
    description: "Mountain winds of Arunachal and Meghalaya",
  },
  "north-india-2022": {
    track: "/audio/banaras.mp3",
    description: "Sacred sounds of North India",
  },
};

export function JourneyContent({ journey }: JourneyContentProps) {
  const audioConfig = audioMap[journey.slug];

  return (
    <ViewModeProvider>
      {/* Ambient Audio with fade-in */}
      {audioConfig && (
        <AmbientAudioPlayer
          trackUrl={audioConfig.track}
          description={audioConfig.description}
        />
      )}

      {/* Hero Section */}
      <JourneyHero journey={journey} />

      {/* Journey Navigation */}
      <JourneyNav journey={journey} />

      {/* Introduction */}
      <JourneyIntro journey={journey} />

      {/* Before the Journey */}
      <BeforeSection transformation={journey.transformation} />

      {/* On the Road - Timeline */}
      <OnTheRoad
        timeline={journey.timeline}
        route={journey.route}
        travelMode={journey.travelMode}
      />

      {/* Moments Gallery */}
      {journey.moments.length > 0 && (
        <MomentsGallery moments={journey.moments} />
      )}

      {/* Peak Experience */}
      <PeakExperienceSection peakExperience={journey.peakExperience} />

      {/* After Returning */}
      <AfterSection transformation={journey.transformation} />

      {/* What I Learned */}
      {journey.learnings.length > 0 && (
        <LearningsSection learnings={journey.learnings} />
      )}

      {/* Impact Graph */}
      <ImpactGraph impact={journey.impact} travelMode={journey.travelMode} />
    </ViewModeProvider>
  );
}
