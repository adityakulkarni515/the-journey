/**
 * ============================================
 * JOURNEY PAGE
 * Individual journey - the mini documentary
 * ============================================
 */

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JourneyContent } from "@/components/journey/JourneyContent";
import { journeys, getJourneyBySlug } from "@/data/journeys";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all journeys
export async function generateStaticParams() {
  return journeys.map((journey) => ({
    slug: journey.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const journey = getJourneyBySlug(slug);

  if (!journey) {
    return {
      title: "Journey Not Found",
    };
  }

  return {
    title: `${journey.title} ${journey.year}`,
    description: journey.tagline,
    openGraph: {
      title: `${journey.title} - The Journey`,
      description: journey.tagline,
      type: "article",
    },
  };
}

export default async function JourneyPage({ params }: PageProps) {
  const { slug } = await params;
  const journey = getJourneyBySlug(slug);

  if (!journey) {
    notFound();
  }

  return (
    <>
      <Header />
      <JourneyContent journey={journey} />
      <Footer />
    </>
  );
}
