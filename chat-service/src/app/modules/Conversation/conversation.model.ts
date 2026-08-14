import { model, Schema } from "mongoose";
import { IConversation } from "./conversation.interface";

const conversationSchema = new Schema<IConversation>(
  {
    title: {
      type: String,
      default: "New Conversation Title",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

conversationSchema.index({ user: 1, updatedAt: -1 });

export const Conversation = model<IConversation>(
  "Conversation",
  conversationSchema,
);
