"use client";

/**
 * ============================================
 * ANALYTICS PROVIDER
 * Wraps the app to track page views on navigation
 * ============================================
 */

import { Suspense } from "react";
import { usePageTracking } from "./usePageTracking";

function PageTracker() {
  usePageTracking();
  return null;
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <PageTracker />
      </Suspense>
      {children}
    </>
  );
}
