import { z } from "zod";
import { isValidObjectId } from "mongoose";
const conversationValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(100),
    user: z
      .string()
      .min(1)
      .refine((val) => isValidObjectId(val), {
        message: "Invalid user id",
      }),
  }),
});

const createConversation = z.object({
  body: conversationValidationSchema.shape.body,
});

export const ConversationValidation = {
  createConversation,
};
