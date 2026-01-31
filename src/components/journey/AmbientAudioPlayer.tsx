"use client";

/**
 * ============================================
 * AMBIENT AUDIO PLAYER
 * Plays ambient music with mute button
 * ============================================
 */

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX } from "@/components/ui/icons";

interface AmbientAudioPlayerProps {
  trackUrl: string;
  description?: string;
}

export function AmbientAudioPlayer({
  trackUrl,
  description = "Ambient sounds from the journey",
}: AmbientAudioPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Set initial volume when audio loads
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.4;
    }
  }, []);

  // Auto-play on scroll
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let started = false;
    const start = () => {
      if (!started) {
        audio.play().then(() => {
          started = true;
          setIsPlaying(true);
        }).catch(() => {});
      }
    };

    const timer = setTimeout(start, 1500);
    window.addEventListener("scroll", start, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", start);
    };
  }, []);

  // Mute/unmute handler
  function handleClick() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = 0.4;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={trackUrl}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="fixed bottom-6 right-6 z-[9999]">
        {/* Pulse animation when playing */}
        {!isMuted && isPlaying && (
          <div className="absolute inset-0 rounded-full border border-accent-gold/30 animate-ping" />
        )}

        <button
          type="button"
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={cn(
            "relative w-12 h-12 rounded-full flex items-center justify-center",
            "bg-background-secondary border transition-all duration-300 cursor-pointer",
            !isMuted && isPlaying
              ? "border-accent-gold/50 text-accent-gold"
              : "border-white/10 text-foreground-muted hover:border-white/20 hover:text-foreground"
          )}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>

        {/* Tooltip on hover */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-3 w-56 p-3 bg-background-secondary/95 backdrop-blur-xl rounded-xl border border-white/10">
            <p className="text-sm text-foreground-muted mb-1">
              {isMuted ? "Audio Muted" : isPlaying ? "Now Playing" : "Scroll to start"}
            </p>
            <p className="text-xs text-foreground-subtle">{description}</p>
            <p className="text-xs text-foreground-subtle mt-1">
              Click to {isMuted ? "unmute" : "mute"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
