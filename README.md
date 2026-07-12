# Anvil

Task management and image annotation frontend built with Next.js App Router, TypeScript, Tailwind CSS, and React Context.

## Setup

Use Node.js 20.9+ (Node 22 LTS recommended), then run:

```bash
npm install
echo NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 > .env.local
npm run dev
```

Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local`, for example `http://localhost:8000`.

## Routes

- `/` redirects to `/login` or `/tasks` based on a stored access token.
- `/login` posts credentials to `/api/auth/login/`.
- `/tasks` reads and updates task records.
- `/annotate` uploads images and saves normalized polygon points.

## Backend assumptions

The Django response contract was not supplied. This UI assumes login returns `{ access, refresh }`, collection endpoints may return either an array or `{ results: [] }`, task fields match `Task` in `src/types/index.ts`, images expose `image` and `polygons`, and nested polygon endpoints follow `/api/images/:id/polygons/`. Update `src/lib/apiClient.ts` or store adapters if the API differs.

## Verification

Run `npm run lint` and `npm run build`. A live backend is not required for routes to compile; API errors are shown in-page.
