#!/bin/sh
set -e

# Run schema sync in the background so Render detects an open HTTP port quickly.
npx prisma db push &

exec next start -H 0.0.0.0 -p "${PORT:-3000}"
