import { Queue } from "bullmq";

let monitorQueue: Queue | null = null;

function getMonitorQueue() {
  if (monitorQueue) {
    return monitorQueue;
  }

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    throw new Error("REDIS_URL is required.");
  }

  monitorQueue = new Queue("slot-monitoring", {
    connection: {
      url: redisUrl,
    },
  });

  return monitorQueue;
}

export async function scheduleAlertMonitoring(alertId: string) {
  const queue = getMonitorQueue();
  await queue.add(
    "monitor-alert",
    { alertId },
    {
      jobId: `monitor-alert-${alertId}`,
      repeat: {
        every: 10 * 60 * 1000,
      },
      removeOnComplete: 50,
      removeOnFail: 100,
    },
  );
}
