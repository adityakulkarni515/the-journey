"use client";

/**
 * ============================================
 * JOURNEY MAP - Travel Routes Visualization
 * Shows travel routes on clean background
 * ============================================
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/motion";
import { TravelModeBadge } from "@/components/ui/badge";
import { X, ArrowRight } from "@/components/ui/icons";
import type { JourneySummary } from "@/types/journey";
import Link from "next/link";
import Image from "next/image";

interface JourneyMapProps {
  journeys: JourneySummary[];
}

// City positions (relative layout showing travel distances)
const cities: Record<string, { x: number; y: number; name: string }> = {
  "Hyderabad": { x: 50, y: 75, name: "Hyderabad" },
  "Kashmir": { x: 35, y: 10, name: "Srinagar" },
  "Ladakh": { x: 45, y: 5, name: "Leh" },
  "Spiti Valley": { x: 40, y: 18, name: "Kaza" },
  "Himachal Pradesh": { x: 38, y: 25, name: "Manali" },
  "Varanasi": { x: 60, y: 45, name: "Varanasi" },
  "Prayagraj": { x: 58, y: 50, name: "Prayagraj" },
  "Uttar Pradesh": { x: 48, y: 32, name: "Delhi" },
  "North India": { x: 50, y: 30, name: "North India" },
  "North East India": { x: 85, y: 40, name: "Tawang" },
  "Kolkata": { x: 72, y: 55, name: "Kolkata" },
  "West Bengal": { x: 70, y: 52, name: "Bengal" },
};

const HOME = cities["Hyderabad"];

export function JourneyMap({ journeys }: JourneyMapProps) {
  const [selected, setSelected] = useState<JourneySummary | null>(null);
  const [hovered, setHovered] = useState<JourneySummary | null>(null);

  const destinations = journeys.reduce((acc, j) => {
    const key = j.destination || j.region;
    if (!acc[key]) acc[key] = { city: cities[key] || cities[j.region], journeys: [] };
    acc[key].journeys.push(j);
    return acc;
  }, {} as Record<string, { city: typeof cities[string] | undefined; journeys: JourneySummary[] }>);

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <FadeIn className="text-center mb-10">
          <p className="text-accent-gold/80 text-sm tracking-widest uppercase mb-2">Travel Map</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
            My Journey Across India
          </h2>
          <p className="text-foreground-muted text-sm max-w-md mx-auto">
            All journeys start from Hyderabad. Hover on destinations to see routes.
          </p>
        </FadeIn>

        <div className="relative max-w-3xl mx-auto">
          {/* Map Container */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-white/10">

            {/* Grid pattern background */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '30px 30px',
            }} />

            {/* SVG for routes */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Route lines */}
              {Object.entries(destinations).map(([key, dest]) => {
                if (!dest.city) return null;
                const j = dest.journeys[0];
                const isBike = j.travelMode === "SOLO BIKE RIDE";
                const isCar = j.travelMode === "CAR JOURNEY";
                const isActive = selected?.id === j.id || hovered?.id === j.id;
                const color = isBike ? "#f59e0b" : isCar ? "#a855f7" : "#ec4899";

                // Control point for curved line
                const dx = dest.city.x - HOME.x;
                const dy = dest.city.y - HOME.y;
                const cx = HOME.x + dx * 0.5;
                const cy = HOME.y + dy * 0.5 - Math.abs(dy) * 0.15;

                return (
                  <g key={key}>
                    {/* Glow effect */}
                    <path
                      d={`M ${HOME.x} ${HOME.y} Q ${cx} ${cy} ${dest.city.x} ${dest.city.y}`}
                      fill="none"
                      stroke={color}
                      strokeWidth={isActive ? 1.5 : 0.8}
                      strokeOpacity={isActive ? 0.4 : 0.15}
                      strokeLinecap="round"
                    />
                    {/* Main line */}
                    <path
                      d={`M ${HOME.x} ${HOME.y} Q ${cx} ${cy} ${dest.city.x} ${dest.city.y}`}
                      fill="none"
                      stroke={color}
                      strokeWidth={isActive ? 0.6 : 0.3}
                      strokeOpacity={isActive ? 1 : 0.7}
                      strokeDasharray={isBike ? "2,1" : isCar ? "3,2" : "1,1"}
                      strokeLinecap="round"
                    />
                    {/* Arrow at destination */}
                    <circle
                      cx={dest.city.x}
                      cy={dest.city.y}
                      r={isActive ? 1.2 : 0.8}
                      fill={color}
                      opacity={isActive ? 1 : 0.6}
                    />
                  </g>
                );
              })}

              {/* Home marker in SVG */}
              <circle cx={HOME.x} cy={HOME.y} r="1.5" fill="#34d399" />
            </svg>

            {/* Home Marker - Hyderabad */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="absolute z-30"
              style={{ left: `${HOME.x}%`, top: `${HOME.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="relative">
                <span className="absolute w-10 h-10 -m-3 rounded-full bg-emerald-400/30 animate-ping" />
                <span className="absolute w-7 h-7 -m-1.5 rounded-full bg-emerald-400/50 animate-pulse" />
                <div className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-lg shadow-emerald-400/50" />
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2">
                  <span className="px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full shadow-lg whitespace-nowrap">
                    HYDERABAD
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Destination Markers */}
            {Object.entries(destinations).map(([key, dest], i) => {
              if (!dest.city) return null;
              const j = dest.journeys[0];
              const isActive = selected?.id === j.id || hovered?.id === j.id;
              const isBike = j.travelMode === "SOLO BIKE RIDE";
              const isCar = j.travelMode === "CAR JOURNEY";
              const hasMultiple = dest.journeys.length > 1;

              const markerColor = isBike ? "bg-amber-400" : isCar ? "bg-purple-400" : "bg-pink-400";
              const shadowColor = isBike ? "shadow-amber-400/50" : isCar ? "shadow-purple-400/50" : "shadow-pink-400/50";
              const glowColor = isBike ? "bg-amber-400/40" : isCar ? "bg-purple-400/40" : "bg-pink-400/40";

              return (
                <motion.div
                  key={key}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                  className="absolute z-20"
                  style={{ left: `${dest.city.x}%`, top: `${dest.city.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <button
                    onClick={() => setSelected(selected?.id === j.id ? null : j)}
                    onMouseEnter={() => setHovered(j)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn("relative transition-all duration-200", isActive && "scale-150 z-40")}
                  >
                    {isActive && (
                      <span className={cn("absolute w-8 h-8 -m-2 rounded-full animate-ping", glowColor)} />
                    )}
                    <div className={cn("w-4 h-4 rounded-full border-2 border-white shadow-lg", markerColor, shadowColor)}>
                      {hasMultiple && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-slate-800 text-[9px] font-bold rounded-full flex items-center justify-center shadow-lg">
                          {dest.journeys.length}
                        </span>
                      )}
                    </div>
                    <div className={cn(
                      "absolute left-1/2 -translate-x-1/2 top-full mt-2 transition-opacity",
                      isActive ? "opacity-100" : "opacity-0"
                    )}>
                      <span className="px-2 py-1 bg-slate-800 text-white text-[10px] font-medium rounded-lg shadow-lg whitespace-nowrap border border-white/10">
                        {dest.city.name}
                      </span>
                    </div>
                  </button>
                </motion.div>
              );
            })}

            {/* Hover Card */}
            <AnimatePresence>
              {hovered && !selected && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-64 z-50"
                >
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-2xl">
                    <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                      {hovered.thumbnailImage && (
                        <Image src={hovered.thumbnailImage} alt="" width={56} height={56} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400">{hovered.month} {hovered.year}</p>
                      <h4 className="text-sm font-bold text-slate-800 truncate">{hovered.title}</h4>
                      <p className="text-[10px] text-amber-600 font-medium">Click to view →</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Selected Panel */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-4 right-4 w-52 z-50"
                >
                  <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    <button
                      onClick={() => setSelected(null)}
                      className="absolute top-2 right-2 z-10 p-1 bg-black/40 hover:bg-black/60 rounded-full transition"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>

                    <div className="h-24 relative">
                      {selected.thumbnailImage ? (
                        <Image src={selected.thumbnailImage} alt="" fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-slate-200" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-2 left-2">
                        <TravelModeBadge mode={selected.travelMode} size="sm" />
                      </div>
                    </div>

                    <div className="p-3">
                      <p className="text-[9px] text-slate-400">{selected.month} {selected.year}</p>
                      <h3 className="text-sm font-bold text-slate-800 leading-tight">{selected.title}</h3>

                      {selected.route && (
                        <div className="flex gap-3 mt-2 pt-2 border-t border-slate-100">
                          <div className="text-center">
                            <p className="text-sm font-bold text-slate-700">{selected.route.totalDistance}</p>
                            <p className="text-[8px] text-slate-400">km</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-bold text-slate-700">{selected.route.totalDays}</p>
                            <p className="text-[8px] text-slate-400">days</p>
                          </div>
                        </div>
                      )}

                      <Link
                        href={`/journeys/${selected.slug}`}
                        className="mt-3 flex items-center justify-center gap-1 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-lg transition"
                      >
                        Read Story <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 shadow shadow-emerald-400/50" />
              <span className="text-foreground-muted">Home (Hyderabad)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 shadow shadow-amber-400/50" />
              <span className="text-foreground-muted">Solo Bike Ride</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-400 shadow shadow-purple-400/50" />
              <span className="text-foreground-muted">Road Trip</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-pink-400 shadow shadow-pink-400/50" />
              <span className="text-foreground-muted">Spiritual</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
