import { z } from "zod";
import { isValidObjectId } from "mongoose";
const messageValidationSchema = z.object({
  body: z.object({
    content: z.string().min(1).max(5000),
    conversation: z
      .string()
      .min(1)
      .refine((val) => isValidObjectId(val), {
        message: "Invalid conversation id",
      }),
    user: z
      .string()
      .min(1)
      .refine((val) => isValidObjectId(val), {
        message: "Invalid user id",
      }),
  }),
});

const createMessage = z.object({
  body: messageValidationSchema.shape.body,
});

export const MessageValidation = {
  createMessage,
};
