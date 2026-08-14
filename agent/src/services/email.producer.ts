import { getChannel } from "../config/rabbitmq";
import { logger } from "../shared/logger";

const sendEmailEvent = async (data: any) => {
  const channel = await getChannel();
  const queue = "email_queue";
  const payload = Buffer.from(JSON.stringify(data));
  const jobId = data?.jobId || "unknown-job";

  await channel.assertQueue(queue, { durable: true });
  logger.debug(`📧 Preparing email job ${jobId} for ${queue}`);

  const isQueued = channel.sendToQueue(queue, payload, {
    persistent: true,
    messageId: jobId,
    correlationId: jobId,
    headers: {
      jobId,
      eventType: data?.type || "create_account",
    },
  });

  console.log(`1️⃣\n [QUEUE] ${jobId} → ${data?.to || "unknown"}`);
};
export const emailProducer = {
  sendEmailEvent,
};
