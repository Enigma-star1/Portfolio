# Resolve portfolio release — 15 September 2026

Rebuilt the portfolio around the approved light Resolve identity. Preserved the existing personal copy and project rationale, with four dedicated project pages for Tratun, CareerPaddy, Grosvenor and Ektos. Added four Enigma identity application mockups, a full graphic collection and a readable resume.

The three motion pieces use native portrait video controls and preload none. Corrected AYAC to Annual Youth Alive Convention and identified Brainstorming as CareerPaddy educational content. Updated posters using frames from the original videos. Hindsight is absent from all pages and excluded from the production build; the source video remains available locally.

## Verification before publication

- Six pages built successfully with only referenced assets and font licenses in `public`.
- 190 local HTML references checked with no missing targets before final formatting; the production build independently checks every copied dependency.
- Homepage checked at 360, 430, 768, 1024 and 1440 pixel widths: no horizontal overflow; identity grid collapses to one column on mobile.
- Desktop and phone compositions visually inspected; mockup grid images visibly confirmed after scrolling.
- Image dialog opens via Enter, closes via Escape and restores focus to its opener.
- Ektos page contains five onboarding screens and renders without overflow on mobile.
- Browser confirmed all videos use preload none and zero MP4 requests before playback. Natural Footies playback reached its expected end without a media error.
- Browser console reported no errors during homepage interaction checks.
- JavaScript syntax checks passed; reduced-motion CSS is present.

Local pre-redesign backup: `C:/Users/ENIGMA/Documents/Codex/2026-09-08/wan/portfolio-before-resolve`.

Build: `node scripts/build.cjs`. No runtime or build dependencies. Vercel serves the generated `public` directory through the existing GitHub integration. Unrelated existing working-tree changes were left unstaged.
