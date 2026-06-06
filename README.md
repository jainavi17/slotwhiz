# SlotWhiz

SlotWhiz helps learners monitor earlier practical test slots and get alerts.

## Stack

- Next.js App Router (frontend + API routes)
- Prisma + PostgreSQL-compatible datasource
- BullMQ + Redis worker for recurring 10-minute monitoring jobs
- Docker Compose for one-command local startup

## Quick Start (Docker Compose)

1. Ensure Docker Desktop is running.
2. From this project root:

```bash
docker compose up --build
```

3. Open [http://localhost:3001](http://localhost:3001).

## Environment

Local defaults are in `.env`:

```env
DATABASE_URL="postgresql://slotwhiz:slotwhiz@postgres:5432/slotwhiz?schema=public"
REDIS_URL="redis://redis:6379"
AUTH_SECRET="change-this-to-a-long-random-secret"
```

### Switch to CockroachDB

Replace only `DATABASE_URL` with your Cockroach URL, for example:

```env
DATABASE_URL="postgresql://<user>:<password>@<cockroach-host>:26257/slotwhiz?sslmode=require"
```

No other code/config changes are required.

## Local Development (without Docker)

```bash
npm install
npm run prisma:generate
npm run db:push
npm run dev
```

In a second terminal, run the worker:

```bash
npm run worker
```

## Authentication Flow

- `GET /` is the public marketing page.
- Users sign up at `/signup` and sign in at `/signin`.
- The alert workflow at `/start` is protected and requires authentication.
- Session auth uses an HTTP-only cookie signed with `AUTH_SECRET`.

## CI/CD (GitHub Actions -> GHCR -> Render)

On every push to `main`, GitHub Actions will:

1. Run lint and production build checks
2. Build and push Docker image to `ghcr.io/jainavi17/slotwhiz`
3. Trigger Render deploy hooks with the new image tag (`github.sha`)

Workflow file: `.github/workflows/deploy_to_render.yml`

### Required GitHub repository secrets

| Secret | Purpose |
| --- | --- |
| `CR_PAT` | GitHub PAT with `write:packages` permission to push to GHCR |
| `RENDER_DEPLOY_HOOK` | Render deploy hook URL for the web service |
| `RENDER_WORKER_DEPLOY_HOOK` | Optional deploy hook URL for the background worker service |

### Render service setup

Create two Render services from the same image:

- **Web service**
  - Image: `ghcr.io/jainavi17/slotwhiz`
  - Start command: `npm run start:docker`
  - Port: `3000`
- **Worker service**
  - Image: `ghcr.io/jainavi17/slotwhiz`
  - Start command: `npm run worker`

Set runtime env vars on Render (`DATABASE_URL`, `REDIS_URL`, `AUTH_SECRET`, etc.).

If Render cannot pull private GHCR images, either make the package public in GitHub Packages or add GHCR registry credentials in Render.

## Phase 2 Backend Features Implemented

- Alert records persisted in PostgreSQL via Prisma
- Alert validation with Zod
- Recurring BullMQ jobs (10-minute cadence) per alert
- Dedicated worker process to run monitoring attempts and store run history
- Alert status updates (`monitoring` and `needs_user_action`)
- User authentication (signup/signin/signout + protected alert creation)
