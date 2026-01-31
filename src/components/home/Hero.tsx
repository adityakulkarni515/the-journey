"use client";

/**
 * ============================================
 * HERO SECTION
 * Cinematic opening with the tagline
 * ============================================
 */

import { motion } from "framer-motion";
import { FadeIn, RevealText } from "@/components/ui/motion";
import { ChevronDown } from "@/components/ui/icons";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary/30 to-background" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(212,165,116,0.3) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Vignette */}
        <div className="vignette" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10 text-center px-4">
        {/* Pre-title */}
        <FadeIn delay={0.2}>
          <p className="text-caption mb-6">A Personal Archive of Experiences</p>
        </FadeIn>

        {/* Main title */}
        <motion.h1
          className="text-display-hero mb-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          <span className="block text-foreground">From Banaras ghats</span>
          <span className="block text-foreground">to Spiti silence</span>
          <span className="block text-accent-gold/80 italic font-normal text-[0.6em] mt-4">
            — stories that shaped me.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <FadeIn delay={0.8}>
          <p className="text-body-large max-w-2xl mx-auto mb-12">
            This is not a travel blog. It&apos;s a museum of journeys — places, people,
            emotions, and the transformations that followed.
          </p>
        </FadeIn>

        {/* Stats preview */}
        <FadeIn delay={1}>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-16">
            <div className="text-center">
              <span className="block text-4xl md:text-5xl font-display font-bold text-foreground">
                9
              </span>
              <span className="text-sm text-foreground-subtle uppercase tracking-wider">
                Journeys
              </span>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10" />
            <div className="text-center">
              <span className="block text-4xl md:text-5xl font-display font-bold text-foreground">
                5,000+
              </span>
              <span className="text-sm text-foreground-subtle uppercase tracking-wider">
                Kilometers
              </span>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10" />
            <div className="text-center">
              <span className="block text-4xl md:text-5xl font-display font-bold text-foreground">
                3
              </span>
              <span className="text-sm text-foreground-subtle uppercase tracking-wider">
                Solo Rides
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-foreground-subtle"
          >
            <span className="text-xs uppercase tracking-widest">Explore</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
