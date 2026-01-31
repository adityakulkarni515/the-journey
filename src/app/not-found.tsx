/**
 * ============================================
 * NOT FOUND PAGE
 * Custom 404 page
 * ============================================
 */

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Compass, ArrowLeft } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="min-h-[80vh] flex items-center justify-center">
        <div className="container-narrow text-center py-20">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent-gold/10 mb-8">
            <Compass className="w-10 h-10 text-accent-gold" />
          </div>

          {/* Title */}
          <h1 className="text-display-heading mb-4">Lost on the Journey</h1>

          {/* Description */}
          <p className="text-body-large max-w-md mx-auto mb-8">
            This path doesn&apos;t lead anywhere — yet. Perhaps the journey you&apos;re looking for
            is somewhere else.
          </p>

          {/* CTA */}
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to the beginning
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
