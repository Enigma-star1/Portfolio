# Theme Switcher & Work Layout Release — 16 September 2026

## Overview
This release implements a high-visibility, persistent Dark/Light theme switching architecture across the entire portfolio and re-sequences the **Selected Work** section cards so that contextual project information precedes project visuals.

Live at: **https://workwitholamide.vercel.app/**

---

## 1. Dual-Theme Architecture

### Design Tokens (`assets/css/styles.css`)
- **Dark Mode ("Resolve Ink" — Default)**:
  - `--bg`: `#171923` (deep resolve ink)
  - `--text`: `#ece8e1` (warm off-white)
  - `--surface`: `#212433` (subtle elevated card surface)
  - `--border`: `#2f3347` (delicate structural borders)
  - `--accent`: `#c7bcdf` (lilac accent)
  - `--muted`: `rgba(236, 232, 225, 0.72)`
- **Light Mode ("Paper")**:
  - `--bg`: `#f4f2ed` (warm natural paper)
  - `--text`: `#171923` (deep ink)
  - `--surface`: `#ffffff` (pure paper surface)
  - `--border`: `#e2ded6` (soft divider borders)
  - `--accent`: `#465084` (deep slate indigo for crisp contrast)
  - `--muted`: `rgba(23, 25, 35, 0.72)`

### Anti-FOUT & State Management (`assets/js/app.js` + `<head>` script)
- **Zero Flash of Unstyled Theme (FOUT)**: Synchronous inline script placed immediately in `<head>` before any stylesheet or DOM rendering checks `localStorage` or `window.matchMedia('(prefers-color-scheme: light)')` and applies `document.documentElement.setAttribute('data-theme', theme)` instantaneously.
- **Persistence**: Theme choice persists under `localStorage.getItem('enigma-theme')`.
- **System Sync**: Listens to system color scheme changes when no manual override is locked, and syncs across tabs via `window.addEventListener('storage', ...)`.
- **Theme Color Meta**: Synchronously synchronizes `<meta name="theme-color">` to match the active background color for seamless mobile browser chrome integration.

### Vector Brand Assets (`assets/brand/`)
- Automatic theme-aware logo switching between:
  - Light background: `/assets/brand/logo-ink.svg`
  - Dark background: `/assets/brand/logo-paper.svg`
- Rendered purely in CSS via `.logo-light` and `.logo-dark` rules to avoid JavaScript asset swaps or flickering.

### Segmented Pill UI Component
- An editorial segmented switch: `[ ☼ Light | ☾ Dark ]` placed in the navigation header of all 6 pages.
- Uses accessible buttons with `role="switch"`, `aria-checked`, and keyboard focus styles.
- Fully responsive on mobile without causing nav wrapping or horizontal overflow.

---

## 2. Selected Work Section Restructuring (`index.html`)

- **Context-First Visual Hierarchy**: Re-ordered all featured project cards so the category eyebrow (e.g. `01 / Campaigns / Design internship`), headline title (`Tratun Energy ↗`), and context description appear **above** the artwork rather than underneath.
- **Spacing & Layout**: Refined `.work-info` spacing to `padding-bottom: 20px` to maintain balanced breathing room into the top edge of project images without excessive vertical gaps.

---

## 3. Affected Pages

The update was applied symmetrically across all 6 pages:
1. `index.html` (Homepage)
2. `resume.html` (Interactive resume)
3. `work/tratun.html` (Tratun Energy case study)
4. `work/careerpaddy.html` (CareerPaddy case study)
5. `work/grosvenor.html` (Grosvenor Global case study)
6. `work/ektos.html` (Ektos case study)

---

## 4. Verification & Build
- `node scripts/build.cjs`: 6 pages and 66 supporting files (72 total) copied to `public/`.
- Hindsight media exclusion strictly preserved.
- Local preview tested across mobile (360px, 390px, 430px) and desktop (1024px, 1440px, 2880px).
- Production deployment verified on Vercel via GitHub `origin/main`.
