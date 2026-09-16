# Website handover — 16 September 2026

The portfolio is complete and published at https://workwitholamide.vercel.app/. Current design: Resolve identity with dual theme support (Dark "Resolve Ink" default with full Light "Paper" theme option via an accessible segmented pill toggle), warm editorial typography and lilac/accent controls.

Homepage order: 01 Selected Work (context-first: metadata & titles precede artwork) → 02 Brand Identity → 03 More Visual Work → 04 UI/UX → 05 Motion → 06 About → Contact.

## Authoritative locations

- Website source: `C:/Users/ENIGMA/Documents/portfolio`.
- Brand book, identity masters and public presentation: `C:/Users/ENIGMA/Documents/BRANDS/STUDIO/Enigma-Studio-Branding/outputs`.
- Website archive: `C:/Users/ENIGMA/Documents/BRANDS/STUDIO/Enigma-Studio-Branding/archives/Website-Handover-2026-09-16`.
- Original website: `Before-Resolve` inside the archive; verified against the pre-redesign backup.
- Unused source images, alternatives and Hindsight: `Unused-Assets`, preserving their original relative paths.
- Superseded website plans, previous guides and old root code: `Historical-Documents`.
- Portable current source snapshot: `Current-Website-Source.zip` inside the archive. This dated working-copy snapshot includes the concurrent, uncommitted theme edits. GitHub is the continuing committed version history.
- Archived-file inventory and hashes: `Archive-Manifest.json` inside the archive.

## Restoring files

To reuse an archived asset, find its `original_path` in the manifest and copy it from `Unused-Assets` into that location in the website source. Add the required page reference, rebuild, preview and commit it. The archive is not served publicly.

To inspect the original website, copy `Before-Resolve` into a separate working folder. Do not overwrite the live source blindly. The portable current ZIP can similarly be extracted to a separate folder and built with Node.

Archive directories and the full original backup are local storage, not an off-device backup. The current website code and required assets are maintained in GitHub. The original Codex backup is also retained as an extra copy; the STUDIO archive is the documented handover location.

## Verification

All original-backup files and archived assets were checked with SHA-256. The production build was rerun successfully after archiving and theme integration. All previously generated media assets retained their hashes, and no required file was removed. The persistent Dark/Light theme toggle system and the title-first Selected Work layout have been comprehensively implemented across all 6 pages, verified locally, and deployed to production via Vercel.

The September 15 release note records the initial build. The dated roadmaps and brand website mockups describe earlier proposals/concepts, not the current live theme or section order.
