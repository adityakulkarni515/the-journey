"use client";

/**
 * ============================================
 * SPECIAL SECTIONS
 * Spiritual Journeys Hub & High-Altitude Hub
 * ============================================
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/motion";
import { Heart, Mountain, ArrowRight, Sparkles } from "@/components/ui/icons";
import { getSpiritualJourneys, getHighAltitudeJourneys } from "@/data/journeys";

export function SpecialSections() {
  const spiritualJourneys = getSpiritualJourneys();
  const highAltitudeJourneys = getHighAltitudeJourneys();

  return (
    <section className="section-spacing">
      <div className="container-wide">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <p className="text-caption mb-4">Curated Collections</p>
          <h2 className="text-display-title mb-6">Special Journeys</h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Some experiences demand their own space. Explore journeys grouped by
            the kind of transformation they offer.
          </p>
        </FadeIn>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Spiritual Journeys Hub */}
          <SectionCard
            title="Spiritual Journeys"
            subtitle="Where the soul finds answers"
            description="Banaras, Kumbh, and the sacred spaces that teach through silence and chaos alike."
            icon={<Heart className="w-8 h-8" />}
            color="journey-spiritual"
            journeyCount={spiritualJourneys.length}
            href="/spiritual"
            highlights={[
              "Banaras 2023 & 2024 - Solo & Mixed",
              "Maha Kumbh 2025 - With Friends",
              "Compare solo vs group spirituality",
            ]}
          />

          {/* High-Altitude Hub */}
          <SectionCard
            title="High-Altitude Journeys"
            subtitle="Where thin air clears the mind"
            icon={<Mountain className="w-8 h-8" />}
            description="Spiti, Ladakh, Kashmir - the mountains that test your body and gift you perspective."
            color="journey-altitude"
            journeyCount={highAltitudeJourneys.length}
            href="/high-altitude"
            highlights={[
              "Spiti 2023 - Solo Bike, 4,590m",
              "Ladakh 2024 - Umling La, 5,799m",
              "Kashmir 2024 - Winter Valley",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION CARD
   Premium card for special sections
   ============================================ */

interface SectionCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  journeyCount: number;
  href: string;
  highlights: string[];
}

function SectionCard({
  title,
  subtitle,
  description,
  icon,
  color,
  journeyCount,
  href,
  highlights,
}: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      <Link href={href} className="block h-full">
        <div
          className={cn(
            "relative h-full p-8 md:p-10 rounded-3xl",
            "bg-background-secondary border border-white/5",
            "hover:border-white/10 transition-all duration-500",
            "overflow-hidden"
          )}
        >
          {/* Background gradient */}
          <div
            className={cn(
              "absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl",
              `bg-${color}`
            )}
            style={{
              background:
                color === "journey-spiritual"
                  ? "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",
            }}
          />

          {/* Icon */}
          <div
            className={cn(
              "inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6",
              color === "journey-spiritual"
                ? "bg-journey-spiritual/10 text-journey-spiritual"
                : "bg-journey-altitude/10 text-journey-altitude"
            )}
          >
            {icon}
          </div>

          {/* Content */}
          <div className="relative">
            <h3 className="text-display-subheading text-foreground mb-2 group-hover:text-accent-gold transition-colors duration-300">
              {title}
            </h3>
            <p className="text-foreground-muted italic mb-4">{subtitle}</p>
            <p className="text-foreground-subtle mb-6">{description}</p>

            {/* Journey count */}
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-foreground-muted" />
              <span className="text-sm text-foreground-muted">
                {journeyCount} journeys to explore
              </span>
            </div>

            {/* Highlights */}
            <ul className="space-y-2 mb-8">
              {highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-foreground-subtle"
                >
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0",
                      color === "journey-spiritual"
                        ? "bg-journey-spiritual"
                        : "bg-journey-altitude"
                    )}
                  />
                  {highlight}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex items-center gap-2 text-foreground group-hover:text-accent-gold transition-colors">
              <span className="font-medium">Explore collection</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
