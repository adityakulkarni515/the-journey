# The Journey

A premium personal travel journey website — not a travel blog, but a personal museum of experiences.

## Philosophy

**"Journeys, not trips"**

This website acts as a personal archive of:
- Places visited
- People encountered
- Emotions experienced
- Transformations undergone

Each journey answers three questions:
1. Why I went
2. What changed during the journey
3. What stayed with me after returning

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Typography**: Playfair Display + Inter
- **Maps**: SVG-based India map (Mapbox-ready)
- **Content**: TypeScript data files (CMS-ready)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create environment file (optional, for Mapbox)
cp .env.local.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Homepage
│   ├── journeys/          # All journeys & individual pages
│   ├── spiritual/         # Spiritual journeys hub
│   └── high-altitude/     # High-altitude journeys hub
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── motion.tsx     # Framer Motion wrappers
│   │   ├── badge.tsx      # Badge components
│   │   └── icons.tsx      # Icon components
│   ├── layout/            # Header, Footer
│   ├── home/              # Homepage sections
│   ├── journey/           # Journey page components
│   └── pages/             # Page-specific components
├── data/
│   └── journeys.ts        # All journey data
├── types/
│   └── journey.ts         # TypeScript interfaces
└── lib/
    └── utils.ts           # Utility functions
```

## Adding Content

### Journey Data Structure

All journeys are defined in `src/data/journeys.ts`. Each journey follows this structure:

```typescript
{
  id: "unique-id",
  slug: "url-slug",
  title: "Journey Title",
  subtitle: "Optional subtitle",
  date: "2024-06",
  year: 2024,
  month: "June",

  // Classification
  travelMode: "SOLO BIKE RIDE" | "CAR JOURNEY" | "Flight" | "Flight / Train",
  companionship: "Solo" | "Mixed" | "Solo / Mixed" | "FRIENDS",
  categories: ["spiritual", "high-altitude", "cultural", "urban"],

  // Content sections
  tagline: "One-line summary",
  introduction: "Opening paragraph",
  whyIWent: "Motivation",

  // Journey structure
  transformation: {
    before: { mindset, expectations, fears },
    after: { changes, perspectives, whatStayed }
  },
  peakExperience: { title, description, type },
  timeline: [...dayEntries],
  moments: [...momentCards],
  learnings: [...insights],

  // Impact metrics (0-100)
  impact: {
    physical: 85,
    emotional: 70,
    spiritual: 65,
    chaos: 45
  }
}
```

### Adding a New Journey

1. Add journey data to `src/data/journeys.ts`
2. Replace placeholder content with real stories
3. Add images to `public/images/journeys/[slug]/`
4. Add ambient audio to `public/audio/` (optional)

### Placeholder Content

All placeholder content is clearly marked with "Placeholder:" prefix. Replace these with real content while keeping the component structure intact.

## Travel Mode Adaptations

### Solo Bike Ride
- Emphasizes route maps with daily distances
- Shows terrain difficulty and elevation
- Highlights fatigue and solitude themes
- Stronger motion-based animations

### Car Journey (with Friends)
- Emphasizes group moments
- Shows road-trip style route
- "Social Energy" replaces "Chaos" metric
- Includes "people moments" sections

### Flight/Train
- Focus on destination storytelling
- Simpler route visuals
- Emphasis on culture and rituals

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  journey: {
    solo: "#f59e0b",      // Amber for solo rides
    group: "#8b5cf6",     // Purple for groups
    spiritual: "#ec4899", // Pink for spiritual
    altitude: "#06b6d4",  // Cyan for mountains
  }
}
```

### Fonts

The site uses:
- **Playfair Display** for headings (display font)
- **Inter** for body text
- **JetBrains Mono** for monospace

Modify in `src/app/layout.tsx`.

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

```env
# Mapbox (optional)
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token

# Analytics (optional)
NEXT_PUBLIC_GA_ID=GA-XXXXX
```

## Features Checklist

- [x] Homepage with hero and timeline
- [x] Interactive India map
- [x] Journey page with documentary structure
- [x] Before/During/After sections
- [x] Day-wise expandable timeline
- [x] Moments gallery
- [x] Impact metrics visualization
- [x] Spiritual journeys hub
- [x] High-altitude journeys hub
- [x] View mode toggle (Story/Journal)
- [x] Ambient audio player
- [x] Responsive design
- [x] Dark theme
- [x] Framer Motion animations
- [ ] Real Mapbox integration
- [ ] Search functionality
- [ ] Newsletter integration

## License

Personal use only. All journey content and stories are personal intellectual property.

---

Built with care for documenting life's meaningful journeys.
