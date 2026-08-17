import { z } from "zod";

const fileInfoValidation = z
  .object({
    conversations: z
      .array(
        z.object({
          conversationId: z.string({}),
        }),
      )
      .optional(),
    user: z.string({ required_error: "User is required" }).optional(),
    fileName: z.string({ required_error: "File name is required" }),
  })
  .optional();

const createFileInfoValidation = z.object({
  body: fileInfoValidation,
});

export const FileInfoValidation = {
  createFileInfoValidation,
};
