import { JwtPayload } from "jsonwebtoken";
import { IMessage } from "./message.interface";
import { Message } from "./message.model";
import { Types } from "mongoose";

const saveMessageIntoDB = async (message: IMessage, user: JwtPayload) => {
  message.user = new Types.ObjectId(user.id);
  const messageInfo = await Message.create(message);
  return messageInfo;
};
const getMessagesByConversationId = async (conversationId: string) => {
  const messages = await Message.find({
    conversation: new Types.ObjectId(conversationId),
  })
    .lean()
    .sort({ createdAt: 1 });
  return messages;
};

export const MessageService = {
  saveMessageIntoDB,
  getMessagesByConversationId,
};
