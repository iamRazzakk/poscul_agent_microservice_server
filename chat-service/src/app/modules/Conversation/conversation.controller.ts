import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { ConversationService } from "./conversation.service";
import { JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../shared/sendResponse";

const createConversation = catchAsync(async (req: Request, res: Response) => {
  const data = await ConversationService.createConversationIntoDB(
    req.body,
    req.user,
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Conversation created successfully",
    data: data,
  });
});

const getAllConversations = catchAsync(async (req: Request, res: Response) => {
  const data = await ConversationService.getAllConversationsFromDB(req.user);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Conversations fetched successfully",
    data: data,
  });
});

const updateConversation = catchAsync(async (req: Request, res: Response) => {
  const data = await ConversationService.updateConversationIntoDB(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Conversation updated successfully",
    data: data,
  });
});

const deleteConversation = catchAsync(async (req: Request, res: Response) => {
  const data = await ConversationService.deleteConversationFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Conversation deleted successfully",
    data: data,
  });
});
export const ConversationController = {
  createConversation,
  getAllConversations,
  updateConversation,
  deleteConversation,
};
