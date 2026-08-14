import { Worker } from "bullmq";
import { sendEmail } from "../services/email.service";
import { connectionBullMQ } from "../config/bullMQ.config";

const worker = new Worker(
  "emailQueue",
  async (job) => {
    try {
      const { to, subject, html } = job.data;
      console.log(`📧 Processing email job ${job.id} to ${to}`);
      await sendEmail(to, subject, html);
      console.log(`✅ Email sent successfully to ${to}`);
    } catch (error) {
      console.error(`❌ Failed to send email for job ${job.id}:`, error);
      throw error;
    }
  },
  {
    connection: connectionBullMQ,
    concurrency: 5,
  },
);


worker.on("ready", () => {
  console.log("✅ Email worker is ready to process jobs");
});

worker.on("error", (err) => {
  console.error("❌ Email worker error:", err);
});

worker.on("completed", (job) => {
  console.log(
    `🎉 Job ${job.id} has been completed ${new Date().toLocaleString()}`,
  );
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} has failed with error: ${err.message}`);
});

export default worker;
