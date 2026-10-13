# Pranaam Resource Allocation Console — React JSX

A responsive, read-only React + Vite dashboard inspired by the approved eight-screen UI design. Data comes from `src/data/mock.json` by default.

## Requirements
- Node.js 20.19+ or 22+
- npm

## Start
```bash
npm install
cp .env.example .env
npm run dev
```
On Windows, copy `.env.example` to `.env` manually. Open the local URL printed by Vite (normally http://localhost:5173).

## Build
```bash
npm run build
npm run preview
```

## Routes
- `/signin`: demo sign-in, navigates without credential validation
- `/dashboard`: customer, trip, GRO and GRL KPIs and charts
- `/customers`: read-only searchable/filterable/sortable/paginated trips
- `/customers/:tripId`: single overview page
- `/staff`: GRO/GRL table
- `/staff/:staffId`: single overview page
- `/allocations`: **All Allocations** table only, no Smart Assign or unassigned trips
- `/reports`: working CSV/XLSX downloads for three datasets

## Data and backend integration
`src/data/mock.json` contains 20 fictional customers, 20 fictional trips, 15 GROs and 5 GRLs, following the sample database structure. **Allocations are intentionally empty**, matching the initial SQL seed; the allocation table shows an empty state. To preview a populated table, manually add objects to `allocations` with `{ "tripId": "TRIP-20261020-001", "groStaffId": 1, "status": "ASSIGNED", "assignedAt": "2026-10-20T08:00:00+05:30" }`.

Data access is centralized in `src/services/dataService.js` and React Query hooks in `src/services/hooks.js`. `src/services/apiClient.js` creates an Axios instance. When backend APIs are ready, set `VITE_DATA_SOURCE=api` and `VITE_API_BASE_URL=...`, then update the service paths and normalize the backend response shapes. **The current Node.js allocation backend does not provide the list endpoints used by this frontend**; they are placeholders and must be implemented separately. Do not switch to API mode until then.

## Design decisions
- Tailwind CSS v4 + custom components + Lucide
- TanStack Table sorting, search and pagination
- Recharts dashboard charts
- Excel generation via `xlsx`; CSV via browser Blob
- Mobile sidebar drawer, responsive cards and horizontally scrolling tables
- No Add Customer/Trip, no other detail tabs, no assignment controls
- Demo sign-in is intentionally **not authentication**. No session is created; pages are accessible by URL. Do not deploy publicly as a secured application.
- Mock fields such as staff availability, skills and language are illustrative; no assignment decisions are calculated in the frontend.

## Folder layout
`src/pages/` screens; `src/components/` reusable table/badges; `src/layout/` shell; `src/data/` JSON; `src/services/` Axios and React Query; `src/utils/` formatting and downloads; `src/styles/` Tailwind entrypoint.
