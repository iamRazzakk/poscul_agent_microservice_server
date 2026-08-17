import { model, Schema } from "mongoose";
import { IFileInfo } from "./file.interface";

const conversationsSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: false,
    },
  },
  {
    _id: false,
    timestamps: false,
  },
);

const fileInfoSchema = new Schema<IFileInfo>(
  {
    conversations: {
      type: [conversationsSchema],
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

fileInfoSchema.index({ user: 1 });
export const FileInfo = model<IFileInfo>("FileInfo", fileInfoSchema);
