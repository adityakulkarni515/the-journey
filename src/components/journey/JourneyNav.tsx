"use client";

/**
 * ============================================
 * JOURNEY NAV
 * Section navigation and view mode toggle
 * ============================================
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { BookOpen, Eye } from "@/components/ui/icons";
import { useViewMode } from "./ViewModeContext";
import type { Journey } from "@/types/journey";

interface JourneyNavProps {
  journey: Journey;
}

const sections = [
  { id: "intro", label: "Introduction" },
  { id: "before", label: "Before" },
  { id: "on-the-road", label: "On the Road" },
  { id: "peak", label: "Peak Experience" },
  { id: "after", label: "After" },
  { id: "learnings", label: "Learnings" },
];

export function JourneyNav({ journey }: JourneyNavProps) {
  const [isSticky, setIsSticky] = useState(false);
  const { viewMode, setViewMode } = useViewMode();

  useEffect(() => {
    const handleScroll = () => {
      // Become sticky after hero section (roughly 80vh)
      setIsSticky(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isSticky && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 left-0 right-0 z-30 bg-background/90 backdrop-blur-xl border-b border-white/5"
        >
          <div className="container-wide">
            <div className="flex items-center justify-between h-14">
              {/* Journey title (condensed) */}
              <div className="flex items-center gap-4">
                <span className="font-display font-semibold text-foreground hidden sm:inline">
                  {journey.title}
                </span>
                <span className="text-foreground-subtle text-sm hidden md:inline">
                  {journey.year}
                </span>
              </div>

              {/* View mode toggle */}
              <div className="flex items-center gap-2 p-1 bg-background-secondary rounded-full">
                <button
                  onClick={() => setViewMode("story")}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all",
                    viewMode === "story"
                      ? "bg-foreground text-background"
                      : "text-foreground-muted hover:text-foreground"
                  )}
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Story</span>
                </button>
                <button
                  onClick={() => setViewMode("journal")}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all",
                    viewMode === "journal"
                      ? "bg-foreground text-background"
                      : "text-foreground-muted hover:text-foreground"
                  )}
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Journal</span>
                </button>
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
