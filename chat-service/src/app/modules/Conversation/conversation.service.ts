import { StatusCodes } from "http-status-codes";
import { IConversation } from "./conversation.interface";
import { Conversation } from "./conversation.model";
import ApiError from "../../error/ApiError";
import { JwtPayload } from "jsonwebtoken";

const createConversationIntoDB = async (
  payload: IConversation,
  user: JwtPayload,
) => {
  payload.user = user.id;
  const result = await Conversation.create(payload);
  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Failed to create conversation",
    );
  }
  return result;
};

const getAllConversationsFromDB = async () => {
  const result = await Conversation.find().sort({ updatedAt: -1 });
  if (!result) {
    return [];
  }
  return result;
};

export const ConversationService = {
  createConversationIntoDB,
  getAllConversationsFromDB,
};
