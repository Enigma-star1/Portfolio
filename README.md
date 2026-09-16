# Enigma Studio — portfolio

Current handover: 16 September 2026. The Resolve portfolio is live with dual theme support (Dark "Resolve Ink" and Light "Paper" modes) and narrative-first work presentation.

- Live website: https://workwitholamide.vercel.app/
- GitHub: https://github.com/Enigma-star1/Portfolio
- Production branch: `main`; Vercel project: `portfolio` in `enigma-269b`.
- Working source: `C:/Users/ENIGMA/Documents/portfolio`.

## Where to edit

| Location | Purpose |
|---|---|
| `index.html` | Homepage: selected work, identity, more visual work, UI/UX, motion, about and contact. |
| `work/*.html` | Tratun, CareerPaddy, Grosvenor and Ektos project pages. |
| `resume.html` | Readable resume; original downloadable document is in `assets/resume`. |
| `assets/css/styles.css` | Responsive styles, Dark/Light theme design tokens and transitions. |
| `assets/js/app.js` | Theme switcher, image dialog, video coordination and copy-email action. |
| `assets/brand` | Website logo variants, hero artwork, mockups and sharing image. |
| `assets/images`, `assets/videos` | Media used by the current website. |
| `assets/fonts` | Self-hosted fonts and licenses. |
| `scripts/build.cjs` | Copies only referenced public files into `public`. |
| `vercel.json` | Production build/output and response headers. |
| `docs/HANDOVER.md`, `docs/ASSET-MAP.md` | Current handover, archive locations and asset inventory. |
| `public` | Generated output. Rebuild it; do not edit it directly or commit it. |

## Build and preview

From the project folder, run `node scripts/build.cjs` (or `npm run build`). There are no package dependencies to install. Use Node 22 or newer.

Serve `public` with an HTTP server, for example `python -m http.server 3000 --directory public`, and visit `http://localhost:3000`. If Python is unavailable, use your editor's local HTTP server with `public` as its root. Do not double-click HTML files: the site uses root-relative asset paths.

## Publish

Review the changes, run the build and check the preview. Commit the intended source changes and push to `main`. The existing Vercel GitHub integration builds the project and serves `public`. Check the Vercel deployment and live domain after pushing. New deployment approval is required unless the user has already authorised publishing the relevant changes.

HTML references to CSS include a version query. Update it when changing CSS to avoid the one-hour asset cache serving an earlier stylesheet.

## Archives

Original files and experiments have been preserved in the website handover archive under `C:/Users/ENIGMA/Documents/BRANDS/STUDIO/Enigma-Studio-Branding/archives/Website-Handover-2026-09-16`. Hindsight is archived and excluded from the website. The old plans are historical, not current implementation instructions.

See `docs/HANDOVER.md` for restoration details. The public brand presentation and full identity masters remain in the separate STUDIO brand folder.
