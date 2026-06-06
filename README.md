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

## Phase 2 Backend Features Implemented

- Alert records persisted in PostgreSQL via Prisma
- Alert validation with Zod
- Recurring BullMQ jobs (10-minute cadence) per alert
- Dedicated worker process to run monitoring attempts and store run history
- Alert status updates (`monitoring` and `needs_user_action`)
- User authentication (signup/signin/signout + protected alert creation)
