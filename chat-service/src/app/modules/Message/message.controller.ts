import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { MessageService } from "./message.service";
import { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

const saveMessage = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const data: any = {
    conversation: req.body.conversationId,
    content: req.body.content,
    role: req.body.role,
  };
  const messageInfo = await MessageService.saveMessageIntoDB(data, user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Message saved successfully",
    data: messageInfo,
  });
});

const getMessagesByConversationId = catchAsync(
  async (req: Request, res: Response) => {
    const messages = await MessageService.getMessagesByConversationId(
      req.params.conversationId,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Messages fetched successfully",
      data: messages,
    });
  },
);

export const MessageController = {
  saveMessage,
  getMessagesByConversationId,
};
