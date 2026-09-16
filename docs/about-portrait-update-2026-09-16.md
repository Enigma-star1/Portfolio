# About Section Portrait Update — 16 September 2026

## Overview
This update refreshes the designer portrait in the **About** section (`#about`) of the homepage (`index.html`) with Olamide Balogun's new studio photo.

Live website: **https://workwitholamide.vercel.app/**

---

## 1. Asset Details
- **Source Original**: `assets/images/Personal Image.jpg` (1122×1402 px, 668 KB).
- **Production Asset**: `assets/images/personal-portrait.webp` (1122×1402 px, 131 KB).
- **Encoding**: Generated with WebP libwebp at quality 90 for optimal crispness and 80% bandwidth reduction.

---

## 2. Code Updates
- **`index.html`**:
  - Replaced `/assets/images/hero-portrait.webp` with `/assets/images/personal-portrait.webp` in the `.about-image` container.
  - Kept aspect ratio `4/5` and responsive `width="1122" height="1402"` dimensions for zero cumulative layout shift (CLS).

---

## 3. Verification & Deployment
- `npm run check`: Validation scripts passed with zero syntax or build errors.
- `npm run build`: Production build cleanly generated 6 pages and 66 supporting assets (72 files total).
- `docs/active-public-assets.json`: SHA-256 hashes and byte lengths updated to reflect the new active public assets.
- Production deployment triggered via push to `main` on GitHub to Vercel.
