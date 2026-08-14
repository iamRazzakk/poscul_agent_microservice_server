import { Types } from "mongoose";

export interface IConversation {
  user: Types.ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
