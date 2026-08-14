import { getChannel } from "../config/rabbitmq";
import { sendEmail } from "../services/email.service";
import { logger } from "../shared/logger";

const maxRetryAttempts = 5;
const queue = "email_queue";
const failedQueue = "email_failed_queue";

export const startEmailWorker = async () => {
  const channel = await getChannel();
  await channel.assertQueue(queue, { durable: true });
  await channel.assertQueue(failedQueue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (!msg) {
      return;
    }
    const data = JSON.parse(msg.content.toString());
    const jobId =
      msg.properties.messageId ||
      msg.properties.correlationId ||
      data?.jobId ||
      "unknown-job";
    try {
      msg?.properties?.headers?.["x-retry-count"] || 0;

      logger.info(`📨 Processing email for ${data?.to} jobId=${jobId}`);
      await sendEmail(data.to, data.subject, data.html);
      channel.ack(msg);

      console.log(`2️⃣\n [COMPLETE] ✅ ${jobId} - ${data?.to}`);
    } catch (error) {
      logger.error(
        `📨 Error processing email for ${data?.to} jobId=${jobId}`,
        error,
      );
      const retryCount = msg?.properties?.headers?.["x-retry-count"] || 0;

      if (retryCount < maxRetryAttempts) {
        console.log(
          `4️⃣\n [RETRY] ${jobId} - Attempt ${retryCount + 1}/${maxRetryAttempts}`,
        );
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
          headers: { "x-retry-count": retryCount + 1 },
          messageId: jobId,
          correlationId: jobId,
          persistent: true,
        });
        channel.ack(msg);
      } else {
        console.log(
          `3️⃣\n [ERROR] ❌ ${jobId} - Failed after ${maxRetryAttempts} attempts`,
        );
        channel.sendToQueue(failedQueue, Buffer.from(JSON.stringify(data)), {
          messageId: jobId,
          correlationId: jobId,
          persistent: true,
        });
        channel.ack(msg);
      }
    }
  });
};
