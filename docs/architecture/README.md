# GIRAS frontend architecture

## Purpose

The frontend is organized around a shared assessment engine. Today it serves the current tryout flow; later market segments compose that engine instead of forking it.

## Dependency direction

`app/router -> layouts -> domains -> core`

`layouts -> components/ui`

Core is infrastructure and has no domain imports. A domain may use core, shared UI, and its own modules. Routes assemble domain pages. Avoid barrel files when they obscure these boundaries or create dependency cycles.

## Current implementation

- `app/providers/AppProviders.tsx` is the sole application provider composition, with one Material UI theme provider and one React Query client provider.
- `app/router/routes.tsx` preserves `/`, `/exams`, `/exams/:id`, and `/attempts/:attemptId`.
- `core/api/axios.ts` is the canonical Axios instance. It preserves `VITE_API_BASE_URL` and the JSON content-type header; no auth or error interceptors were added because none existed.
- `domains/assessment/exam`, `question`, and `attempt` retain the prior API modules, query keys, hooks, types, UI, and local attempt store.
- `layouts/AppLayout.tsx` and `layouts/AppSidebar.tsx` are the existing working shell relocated without a role or workspace redesign.

## Deferred foundations

There is no active authentication implementation, role data, permission contract, organization API, billing flow, or workspace model in this repository. The architecture deliberately does not contain an AuthProvider, protected-route wrapper, organization domain, segment folders, or placeholder APIs.

When those contracts arrive, add organization membership and authorization primitives as identity concerns, then add segment and workspace composition modules that consume `domains/assessment`. Keep the assessment domain shared.

## Migration checklist

1. Move one bounded domain at a time.
2. Preserve endpoint, method, payload, response handling, query keys, and route behavior.
3. Update imports with the `@/` alias where it improves boundary clarity.
4. Run `npx tsc -b --pretty false`, `npm run lint`, and `npm run build`.
5. Test the affected route against the actual backend before removing compatibility code.
