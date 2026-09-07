# GIRAS Frontend

GIRAS is a React frontend for the current individual tryout experience. Its architecture keeps the assessment engine shared so future school, tutoring, and enterprise products can consume the same capabilities without duplicating them.

## Tech stack

- React 19, TypeScript, and Vite
- Material UI
- React Router
- TanStack React Query
- Zustand
- Axios

## Architecture

- `src/app`: application composition, configuration, and router
- `src/core`: cross-cutting infrastructure only
- `src/components/ui`: reusable presentation components
- `src/domains/assessment`: shared assessment business domain
- `src/layouts`: current application shell
- `src/theme`: Material UI theme

Assessment owns its API endpoints, query hooks, types, feature UI, and local attempt state. Core never imports from a domain. Layouts and routes may import domains; shared UI remains domain-agnostic.

## State management

- TanStack React Query owns server data, caching, and mutations.
- Zustand is limited to local interactive state; attempt pagination and selected answers remain in the attempt domain.
- Authentication is not yet implemented in this codebase, so no AuthProvider, role, permission, or organization API abstraction has been introduced.

## Environment

Set this local environment variable when an API base URL is required:

`VITE_API_BASE_URL=http://localhost:8000`

Environment access is centralized in `src/app/config/env.ts`.

## Commands

- `npm run dev`
- `npm run lint`
- `npx tsc -b --pretty false`
- `npm run build`
- `npm run preview`

There is currently no test script.

## Architectural rules

- Keep API transport in `core/api`; keep endpoints and request/response types in their owning domain.
- Preserve current API paths, payloads, React Query keys, routes, and behavior during structural changes.
- Prefer explicit imports and `@/` aliases over barrel exports that can introduce cycles.
- Put only truly generic UI in `components/ui` or `components/common`.
- Add organization membership, roles, permissions, and segment workspaces only alongside verified backend contracts and product requirements.

See [the architecture guide](docs/architecture/README.md) for boundaries and migration guidance.
