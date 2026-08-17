import Redis from "ioredis";
import colors from "colors";
import config from "./config";

const redisHost = config.redis.host || "redis";
const redisPort = process.env.REDIS_PORT || 6379;

const redisClient = new Redis({
  host: redisHost,
  port: Number(redisPort),
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

// Listen to Redis events
redisClient.on("connect", () => {
  console.log(colors.green("✔ Redis connecting..."));
});

redisClient.on("ready", () => {
  console.log(colors.green("✔ Redis connected successfully and ready"));
});

redisClient.on("error", (error) => {
  console.log(colors.red("❌ Redis connection error:"), error);
});

redisClient.on("close", () => {
  console.log(colors.yellow("⚠ Redis connection closed"));
});

redisClient.on("reconnecting", () => {
  console.log(colors.yellow("🔄 Redis reconnecting..."));
});

class RedisWrapper {
  async connect() {
    try {
      await redisClient.ping();
      return true;
    } catch (error: any) {
      console.log(colors.red("❌ Redis connection failed:"), error.message);
      return false;
    }
  }

  async disconnect() {
    await redisClient.quit();
    console.log("Redis disconnected gracefully");
  }
}

export const RedisClient = new RedisWrapper();
export default redisClient;
