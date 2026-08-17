import { StatusCodes } from "http-status-codes";
import { IConversation } from "./conversation.interface";
import { Conversation } from "./conversation.model";
import ApiError from "../../error/ApiError";
import { JwtPayload } from "jsonwebtoken";
import { RedisService } from "../../redis/redis.service";

const createConversationIntoDB = async (
  payload: IConversation,
  user: JwtPayload,
) => {
  payload.user = user.id;
  await RedisService.deleteRedis(`conversations:${user.id}`);
  const result = await Conversation.create(payload);
  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Failed to create conversation",
    );
  }
  return result;
};

const getAllConversationsFromDB = async (user: JwtPayload) => {
  const cachedData = await RedisService.getRedis(`conversations:${user.id}`);
  if (cachedData) {
    console.log("catch data");
    return JSON.parse(cachedData as string) as IConversation[];
  }
  console.log("not catch data");
  const result = await Conversation.find({ user: user.id })
    .sort({
      createdAt: -1,
    })
    .lean();
  if (!result) {
    return [];
  }
  await RedisService.setRedis({
    key: `conversations:${user.id}`,
    value: JSON.stringify(result),
    expiration: 60 * 60 * 24, // 24 hours
  });
  return result;
};

export const ConversationService = {
  createConversationIntoDB,
  getAllConversationsFromDB,
};
