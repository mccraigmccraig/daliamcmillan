# Site Specification — Dalia McMillan

## Configuration
- **Site Type**: General (professional service — solo hypnotherapy practice)
- **Design Language (Starting Point)**: Elegant (Warm Sophistication palette adapted for wellness)
- **Target Audience**: Adults (and children over 8) in Brighton and further afield who are considering hypnotherapy for anxiety, habits, confidence, sleep, mood or pain — people who want a warm, non-clinical, considered practitioner.
- **Primary Goal**: Book free initial consultations via Calendly (https://calendly.com/daliamcdalia).
- **Production URL**: https://daliamcmillan.uk

## Design Evolution
- **Starting aesthetic**: Elegant / Warm Sophistication — refined, calming, generous whitespace, editorial hierarchy.
- **User customizations (initial brief)**:
  - Palette: sage green + warm neutrals + muted terracotta/blush accent (avoiding clinical white/corporate blue).
  - Typography: warm humanist serif for headings + clean sans for body.
  - Softly rounded corners (~14px), soft shadows, generous whitespace.
  - Coastal / Brighton mood cues in imagery.
  - Fully responsive, keyboard-navigable, WCAG AA contrast.
- **Current style**:
  - Palette (HSL, see `src/index.css`):
    - Background `hsl(38 40% 97%)` — warm ivory
    - Foreground `hsl(120 12% 16%)` — deep forest
    - Primary `hsl(102 20% 32%)` — deep sage (buttons, links)
    - Terracotta accent `hsl(13 42% 50%)` — highlights, section labels
    - Blush `hsl(19 42% 83%)` — soft accent surfaces
    - Cream surface `hsl(37 38% 95%)` — cards, alt sections
  - Fonts (Astro Fonts API, in `astro.config.mjs`):
    - Headings: **Fraunces** (Google, variable 300–700, warm humanist serif, italics used for emphasis)
    - Body: **DM Sans** (Google, 400/500/600, clean humanist sans)
  - Radius: `--radius: 0.875rem`. Cards and CTA banners use larger `2rem` for a soft, wellness feel.
  - Shadows: two-layer soft shadows tinted with warm brown (not neutral gray).
  - Gradients: `--gradient-warm` (ivory → blush → sage) for hero backgrounds; `--gradient-cta` (deep sage → mid sage) for CTA banners.
  - Motion: gentle `fade-up` staggered reveals in the hero; hover lift on cards; no bounce/snappy motion.
  - Imagery: Unsplash placeholders that echo the intended photography (coastal, warm indoor light, natural textures). Alt text describes the *intended real* photo (e.g. "Dalia McMillan, hypnotherapist, seated in a calm therapy room").

## Pages
- `/` — Home. Hero, trust signals row, "What is SFH", 4-card teaser, CTA banner. **JSON-LD**: `ProfessionalService` schema (Dalia McMillan / Brighton / booking action).
- `/about/` — About Dalia. Full copy verbatim from brief, portrait placeholder, credentials sidecard.
- `/how-it-works/` — Two-card layout for "typical session" and "free consultation", closing CTA.
- `/what-i-can-help-with/` — Four themed groupings with individual chips. Closing "not sure?" card with both Calendly and Contact CTAs.
- `/contact/` — Booking card + details card + simple 3-field form (name/email/message) with `mailto:dalia@daliamcmillan.uk` action as the v1 fallback.

## Booking
Every CTA labeled Book/Calendly points to `https://calendly.com/daliamcdalia` with `target="_blank" rel="noopener"`. Reusable component: `src/components/BookingButton.astro`.

## Technical
- Astro 6, `output: "static"`, `trailingSlash: "always"`.
- Static build only — no SSR needed. Cloudflare adapter is loaded in production only (image service = custom, prerenderEnvironment = node) so the site can also deploy as plain static assets if preferred.
- `@astrojs/sitemap` auto-generates `sitemap-index.xml`. `robots.txt` references it.
- `site` set to `https://daliamcmillan.uk` — canonical URLs, sitemap, OpenGraph, JSON-LD all bake this in.
- Each `.astro` page passes its own `title` and `description`; Layout renders `<title>`, `<meta name="description">` and self-referencing `<link rel="canonical">` at build time. No shared generic meta block.
- Fonts served via Astro Fonts API (self-hosted, preloaded, no `@font-face` in CSS).

## Adding future hand-written variant pages
File-based routing is unchanged. To add a small number of unique location / issue pages later:
- Add `src/pages/brighton-anxiety-hypnotherapy.astro`, `src/pages/online-sessions.astro`, etc.
- Each page should keep the same `Layout` component and pass its own `title` + `description` so it gets its own canonical + meta baked in.
- No content collection needed for a handful of hand-written pages — plain routes stay simplest. If the set grows beyond a dozen and needs shared data (e.g. a locations frontmatter table), promote them to `src/content/pages/*.md` at that point.

## Accessibility notes
- Skip-to-content link in Layout.
- Semantic landmarks: `<header>`, `<nav aria-label>`, `<main id="main">`, `<footer>`.
- `aria-current="page"` on active nav links.
- Focus-visible ring in warm sage on every interactive element.
- Mobile nav: native `<button aria-expanded>` toggle with vanilla JS — no React island, no hydration cost.
- All images have descriptive alt text; decorative gradients marked `aria-hidden`.
- Contrast: primary text (`120 12% 16%` on `38 40% 97%`) ~ 10.5:1; muted text ~ 5.4:1; primary sage button (`102 20% 32%` bg, ivory text) ~ 7:1. All above WCAG AA.
