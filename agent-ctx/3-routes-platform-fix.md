# Task 3: Fix Routes page and Platform/Infrastructure page issues

## Work Log

### A. Routes Page (RoutesPage.tsx)

1. **Section width alignment**:
   - HeroSection: Changed `max-w-4xl` → `max-w-3xl` for text-heavy content consistency
   - JourneySection: Changed outer container from `max-w-7xl` → `max-w-[1400px]`, added `max-w-3xl` to header div for text content
   - PricingSection: Changed outer container from `max-w-7xl` → `max-w-[1400px]`, added `max-w-3xl` to header div for text content
   - PreambleSection: Already uses `max-w-3xl` ✓
   - RoutesBridge: Already uses `max-w-[1400px]` ✓

2. **JourneySection enhancement**: Added a Route Journey Steps Timeline with:
   - 5 steps: Application → Acceptance → Departure → Hub Rotation → Return
   - Desktop: Horizontal timeline with connecting line, icon circles, step numbers, titles, and descriptions
   - Mobile: Vertical timeline with connecting line, icon circles, and content
   - Icons: Database (Application), Check (Acceptance), Anchor (Departure), MapPin (Hub Rotation), Flame (Return)
   - Scroll-triggered framer-motion animations with staggered delays
   - xCelero design: #FF4D00 accents, font-mono labels, font-display headings, border circles with hover states
   - Existing annual schedule timeline retained below as "Annual Schedule Timeline"

3. **Missing section transitions**:
   - HeroSection: Added `border-b border-[#111111]/10`
   - RoutesBridge: Added `border-b border-[#111111]/10`
   - Other sections (PreambleSection, MapSection, ArcAccordion, JourneySection, PricingSection) already had border separators

### B. Platform Page (Platform.tsx)

1. **Section width alignment**: Verified all section headers use `max-w-3xl`:
   - CaseForInfrastructure: ✓
   - XEmbassySection: ✓
   - M1CoreSection: ✓
   - CoreTechnologiesSection: ✓
   - RouteHubsSection: ✓

2. **CaseForInfrastructure bottom callout**: Applied contained dark background pattern:
   - Added `rounded-sm overflow-hidden` to the `bg-[#111111] text-white` callout div
   - This follows the established pattern from Task 9 (contained dark bg sections)

3. **CoreTechnologiesSection header**: Verified uses `max-w-3xl` ✓

4. **RouteHubsSection**: Added `border-b border-[#111111]/10` for consistency with other sections' separators

### Verification
- `bun run lint` passes cleanly with no errors
- Dev server compiles successfully
