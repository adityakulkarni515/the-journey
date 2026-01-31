"use client";

/**
 * ============================================
 * PAGE TRACKING HOOK
 * Tracks page views on route changes in Next.js
 * ============================================
 */

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_MEASUREMENT_ID = "G-KX0LS0GSG9";

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

export function usePageTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams]);
}
