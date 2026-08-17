import { Types } from "mongoose";

export interface IFileInfo {
  conversations?: {
    conversationId: Types.ObjectId;
  }[];
  user: Types.ObjectId;
  fileName: string;
}
