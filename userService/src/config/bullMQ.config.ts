import { Queue, QueueOptions } from "bullmq";

const bullMQHost =
  process.env.BULLMQIP || process.env.REDIS_HOST || "localhost";
const bullMQPort = process.env.BULLMQPORT || process.env.REDIS_PORT || 6379;

export const connectionBullMQ: QueueOptions["connection"] = {
  host: bullMQHost,
  port: Number(bullMQPort),
};

export const emailQueue = new Queue("emailQueue", {
  connection: connectionBullMQ,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: {
      age: 3600, // Keep completed jobs for 1 hour
      count: 100, // Keep last 100 completed jobs
    },
    removeOnFail: false,
  },
});
