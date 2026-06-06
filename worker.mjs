import { PrismaClient } from "@prisma/client";
import { Worker } from "bullmq";

const redisUrl = process.env.REDIS_URL;
const prisma = new PrismaClient();

if (!redisUrl) {
  throw new Error("REDIS_URL is required for worker.");
}

const worker = new Worker(
  "slot-monitoring",
  async (job) => {
    const { alertId } = job.data;
    const start = new Date();

    const alert = await prisma.alert.findUnique({
      where: { id: String(alertId) },
    });

    if (!alert || alert.status !== "monitoring") {
      return;
    }

    let foundMatch = false;
    let summary = "No earlier matching slot found.";
    let challengeSeen = false;
    let errorMessage = null;

    try {
      // Placeholder availability probe until DVSA integration is connected.
      foundMatch = Math.random() < 0.2;

      if (foundMatch) {
        summary = `Potential earlier slot found near ${alert.preferredLocation}. Notification dispatch queued.`;
      }

      if (Math.random() < 0.03) {
        challengeSeen = true;
        summary = "Challenge encountered. Alert requires user action.";
      }
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : "Unknown worker error";
      summary = "Monitoring attempt failed.";
    }

    const nextCheckAt = new Date(Date.now() + alert.cadenceMinutes * 60 * 1000);

    await prisma.$transaction([
      prisma.monitorRun.create({
        data: {
          alertId: alert.id,
          startedAt: start,
          finishedAt: new Date(),
          foundMatch,
          summary,
          challengeSeen,
          errorMessage,
        },
      }),
      prisma.alert.update({
        where: { id: alert.id },
        data: {
          nextCheckAt,
          status: challengeSeen ? "needs_user_action" : "monitoring",
        },
      }),
    ]);

    if (foundMatch) {
      console.log(
        `[slotwhiz] match alert=${alert.id} channels=${alert.channels.join(",")} location="${alert.preferredLocation}"`,
      );
    }

    if (challengeSeen) {
      console.warn(`[slotwhiz] challenge alert=${alert.id} status=needs_user_action`);
    }
  },
  {
    connection: {
      url: redisUrl,
    },
  },
);

worker.on("ready", () => {
  console.log("[slotwhiz] worker ready");
});

worker.on("completed", (job) => {
  console.log(`[slotwhiz] completed job ${job.id}`);
});

worker.on("failed", (job, error) => {
  console.error(
    `[slotwhiz] failed job ${job?.id ?? "unknown"}: ${error.message}`,
  );
});

async function shutdown() {
  await worker.close();
  await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
