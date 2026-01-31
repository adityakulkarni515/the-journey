"use client";

/**
 * ============================================
 * FOOTER
 * Minimal footer with newsletter signup option
 * ============================================
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, ArrowRight } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-secondary/50 to-transparent pointer-events-none" />

      <div className="container-wide relative">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-white/5">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display-subheading mb-4"
            >
              Stay on the journey
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-foreground-muted mb-8"
            >
              Occasional stories from the road. No spam, just honest reflections.
            </motion.p>

            {/* Newsletter form placeholder */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-background-secondary border border-white/10 rounded-full text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent-gold/50 transition-colors"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </motion.form>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <Link href="/" className="inline-flex items-center gap-3 text-foreground mb-4">
                <Compass className="w-5 h-5" />
                <span className="font-display text-lg font-semibold">The Journey</span>
              </Link>
              <p className="text-sm text-foreground-subtle max-w-xs">
                A personal archive of journeys, people, emotions, and transformations.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">
                Explore
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/journeys"
                    className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                  >
                    All Journeys
                  </Link>
                </li>
                <li>
                  <Link
                    href="/spiritual"
                    className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                  >
                    Spiritual Journeys
                  </Link>
                </li>
                <li>
                  <Link
                    href="/high-altitude"
                    className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                  >
                    High Altitude
                  </Link>
                </li>
              </ul>
            </div>

            {/* Journey Types */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">
                Journey Types
              </h4>
              <ul className="space-y-3">
                <li>
                  <span className="text-sm text-foreground-muted">
                    Solo Bike Rides
                  </span>
                </li>
                <li>
                  <span className="text-sm text-foreground-muted">
                    Road Trips
                  </span>
                </li>
                <li>
                  <span className="text-sm text-foreground-muted">
                    Flights & Trains
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-foreground-subtle">
              &copy; {new Date().getFullYear()} The Journey. All experiences lived.
            </p>
            <p className="text-xs text-foreground-subtle">
              &ldquo;Journeys, not trips&rdquo;
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
