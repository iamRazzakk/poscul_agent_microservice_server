import { getChannel } from "../config/rabbitmq";
import { logger } from "../shared/logger";

export const startFailedWorker = async () => {
  const channel = await getChannel();

  const failedQueue = "email_failed_queue";

  await channel.assertQueue(failedQueue, { durable: true });


  channel.consume(failedQueue, (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());
    const jobId = msg.properties.messageId || msg.properties.correlationId || data?.jobId || "unknown-job";

    logger.error(
      `💀 FAILED EMAIL captured from ${failedQueue} jobId=${jobId}: ${JSON.stringify(data)}`,
    );

    channel.ack(msg);
  });
};