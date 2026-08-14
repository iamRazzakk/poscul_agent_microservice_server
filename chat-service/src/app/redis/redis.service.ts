import redisClient from "../../config/redis.config";

interface IParams {
  key: string;
  value: number | string;
  expiration: number;
}

const setRedis = async (params: IParams) => {
  await redisClient.set(params.key, params.value, "EX", params.expiration);
};

const getRedis = async (key: string) => {
  return await redisClient.get(key);
};

const deleteRedis = async (key: string) => {
  return await redisClient.del(key);
};

const clearRedis = async () => {
  return await redisClient.flushall();
};

export const RedisService = {
  setRedis,
  getRedis,
  deleteRedis,
  clearRedis,
};
