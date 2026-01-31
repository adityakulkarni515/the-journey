"use client";

/**
 * ============================================
 * AMBIENT AUDIO PLAYER
 * Plays ambient music with smooth fade-in
 * Mute button included
 * ============================================
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Target volume
  const TARGET_VOLUME = 0.4;

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(trackUrl);
    audio.loop = true;
    audio.volume = TARGET_VOLUME;
    audioRef.current = audio;

    // Track play state
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Auto-play on first user interaction
    let hasStarted = false;

    const tryPlay = () => {
      if (!hasStarted && audioRef.current) {
        audioRef.current.play()
          .then(() => {
            hasStarted = true;
            // Remove listeners once audio starts
            window.removeEventListener("click", tryPlay);
            window.removeEventListener("scroll", tryPlay);
            window.removeEventListener("keydown", tryPlay);
          })
          .catch(() => {});
      }
    };

    window.addEventListener("click", tryPlay);
    window.addEventListener("scroll", tryPlay);
    window.addEventListener("keydown", tryPlay);

    return () => {
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("scroll", tryPlay);
      window.removeEventListener("keydown", tryPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
      audioRef.current = null;
    };
  }, [trackUrl]);

  // Sync muted state with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Toggle mute
  const handleToggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="relative"
      >
        {/* Main mute/unmute button */}
        <button
          type="button"
          onClick={handleToggleMute}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            "bg-background-secondary border transition-all duration-300",
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

        {/* Pulse animation when playing and not muted */}
        {!isMuted && isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border border-accent-gold/30"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Expanded info on hover */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-3 w-64 p-4 bg-background-secondary/95 backdrop-blur-xl rounded-xl border border-white/10"
            >
              <p className="text-sm text-foreground-muted mb-2">
                Ambient Audio {isMuted ? "(Muted)" : isPlaying ? "(Playing)" : "(Click to start)"}
              </p>
              <p className="text-xs text-foreground-subtle">
                {description}
              </p>
              <p className="text-xs text-foreground-subtle mt-2">
                Click to {isMuted ? "unmute" : "mute"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
