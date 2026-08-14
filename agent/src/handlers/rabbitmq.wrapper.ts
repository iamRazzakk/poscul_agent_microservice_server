import { rabbitmqConfig } from "../config/rabbitmq";
import { logger } from "../shared/logger";
import { startFailedWorker } from "../util/startFailedWorker";
import { startEmailWorker } from "../worker/rabbitmq.worker";

export const bootstrap = async () => {
  await rabbitmqConfig();

  await startEmailWorker();
  await startFailedWorker();
};
