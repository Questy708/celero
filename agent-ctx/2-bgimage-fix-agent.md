# Task 2: Fix Program Images — Convert backgroundImage to <img> with object-cover

**Agent**: bgimage-fix-agent
**Date**: 2026-03-04

## Work Log

1. Read worklog.md and all 5 target files (Programs.tsx, Community.tsx, Home.tsx, CaseStudies.tsx, CareersPage.tsx)
2. Searched all `backgroundImage` usages across the pages directory
3. Identified 3 files with `backgroundImage: url(...)` patterns that need conversion:
   - **Programs.tsx line 199**: `style={{ backgroundImage: \`url(${program.image})\` }}` → converted to `<img>` with object-cover
   - **CaseStudies.tsx line 99**: `style={{ backgroundImage: \`url(${featured.image})\` }}` → converted to `<img>` with object-cover
   - **CareersPage.tsx line 692**: `style={{ backgroundImage: \`url(${card.image})\` }}` → converted to `<img>` with object-cover (preserved group-hover:scale-110 transition)
4. Identified 3 `backgroundImage` usages that are CSS patterns (radial-gradient), NOT image URLs — correctly left unchanged:
   - Community.tsx line 570: dot-grid pattern on member card silhouette
   - Community.tsx line 1317: dot-grid pattern on CTA section overlay
   - Home.tsx line 1315: dot-grid pattern on newsletter section
5. Verified zero remaining `backgroundImage: url(...)` patterns via grep
6. Ran `bun run lint` — passes cleanly with no errors

## Stage Summary

- All 3 `backgroundImage` URL patterns converted to `<img>` with `object-cover` for more reliable rendering
- CSS gradient patterns (radial-gradient) left unchanged as they are not image URLs
- Overlays and content positioned on top of images unchanged
- CareersPage.tsx preserved the `group-hover:scale-110` transition on the img element
- Clean lint, no errors
