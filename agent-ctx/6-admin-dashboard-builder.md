# Task 6: Admin Dashboard Builder

## Task
Build comprehensive Admin Dashboard page at /home/z/my-project/src/artemis/pages/AdminDashboard.tsx

## Work Done
- Created AdminDashboard.tsx (~680 lines) with full admin operations hub
- Dark theme (bg-[#111111]) with #FF4D00 accent, left-aligned layout
- Header with "Admin" label, "Operations Hub" title, refresh button, timestamp
- 4 stat cards: Subscribers, Investment Inquiries (with total amount), Applications (founder/partner split), Pending Items
- 3 tabs with animated indicator: Subscribers, Investment Inquiries, Applications
- Subscribers tab: email, source, consent badge, date, delete
- Inquiries tab: name, email, amount, tier badge, accredited badge, status dropdown, date, delete
- Applications tab: All/Founders/Partners filter, expandable rows with full details, status dropdown, delete
- Color-coded badges for status (pending/reviewing/contacted/declined/invested+accepted) and tier (scout/syndicate/partner/anchor)
- Loading skeletons, empty states, auto-refresh on mutations, delete confirmation
- Registered /admin route in page.tsx
- Clean lint, compiles successfully

## Files Changed
- `/home/z/my-project/src/artemis/pages/AdminDashboard.tsx` (NEW)
- `/home/z/my-project/src/app/page.tsx` (added import + route)

## API Integration
- GET /api/admin?section=stats
- GET /api/admin?section=subscribers
- GET /api/admin?section=inquiries
- GET /api/admin?section=applications
- PATCH /api/admin (status update)
- DELETE /api/admin (delete record)
