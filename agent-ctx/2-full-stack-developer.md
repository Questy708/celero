# Task 2: Redesign "4 Engines" Section + Add ApproachBridge

## Summary
Successfully completed both Part A and Part B of the Approach page redesign.

## Changes Made

### Part A: ThreeEnginesSection Redesign
- **Removed**: `connections` array, `nodePositions`, and all complex CSS trick line rendering code (the `ref={(el) => {...}}` pattern that calculated line positions dynamically)
- **Kept**: `engines` data array and `engineTaglines` as specified
- **New Design**: Horizontal flowing pipeline/flywheel diagram with 3 responsive breakpoints:
  - Desktop (lg+): 4 cards in horizontal row with arrow connectors + flyback indicator
  - Tablet (md-lg): 2x2 grid with border cards
  - Mobile (below md): Vertical stack with flowing arrow connectors
- Cards show: icon, engine number, title, tagline, description, explore link (on active)
- Interactive: click/hover highlights with #FF4D00 accent, top accent line, shadow effects

### Part B: ApproachBridge Section
- Added `approachBridgeImages` (3 Unsplash URLs) and `approachWorldDots` (local world map constant)
- CapitalBridge-style layout: 3 overlapping grayscale images + two-column text/map
- Heading: "We don't back slides. We back conviction."
- Map highlights Africa in #FF4D00 with "190 Hubs · 39 Countries" label
- Placed between HeroSection and ThreeEnginesSection

## File Modified
- `src/artemis/pages/Approach.tsx` (933 → 1154 lines)

## Verification
- `bun run lint` passes with no errors
- Dev server compiles successfully
