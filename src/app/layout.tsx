import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics, AnalyticsProvider } from "@/components/analytics";

/* ============================================
   FONT CONFIGURATION
   Premium typography for editorial feel
   ============================================ */

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

/* ============================================
   METADATA
   ============================================ */

export const metadata: Metadata = {
  title: {
    default: "The Journey | A Personal Archive of Experiences",
    template: "%s | The Journey",
  },
  description:
    "From Banaras ghats to Spiti silence — a personal museum of journeys, people, emotions, and transformations.",
  keywords: [
    "travel",
    "journeys",
    "India",
    "solo travel",
    "motorcycle journey",
    "Ladakh",
    "Spiti",
    "Banaras",
    "personal stories",
  ],
  authors: [{ name: "The Traveler" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The Journey",
    title: "The Journey | A Personal Archive of Experiences",
    description:
      "From Banaras ghats to Spiti silence — stories that shaped me.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Journey | A Personal Archive of Experiences",
    description:
      "From Banaras ghats to Spiti silence — stories that shaped me.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ============================================
   ROOT LAYOUT
   ============================================ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <head>
        <GoogleAnalytics />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        {/* Noise texture overlay for premium feel */}
        <div className="noise-overlay fixed inset-0 z-50 pointer-events-none" />

        {/* Main content with analytics tracking */}
        <AnalyticsProvider>
          <main className="relative min-h-screen">{children}</main>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
