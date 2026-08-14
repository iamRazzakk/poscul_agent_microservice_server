import config from ".";
import { logger } from "../shared/logger";
import amqp, { Channel } from "amqplib";

let connection: any;
let channel: Channel;

export const rabbitmqConfig = async (): Promise<Channel | undefined> => {
  try {
    connection = await amqp.connect(config.rabbitmq.url);
    channel = await connection.createChannel();
    logger.info("🐰 RabbitMQ connected");
    return channel;
  } catch (error) {
    logger.error("🐰❌ Failed to connect to RabbitMQ");
    throw error;
  }
};

export const getChannel = async () => {
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }
  return channel;
};
