import axios from "axios";
import config from "../../../config/config";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../error/ApiError";
import graph from "../../graph/graph";
import sendResponse from "../../shared/sendResponse";

const chatServiceHeaders = (req: Request) => ({
  "x-gateway-secret": config?.chatServiceSecret as string,
  "x-user-id": String(req.user?.id ?? ""),
  "x-user-role": String(req.user?.role ?? ""),
});

const agentController = async (req: Request, res: Response) => {
  try {
    const { prompt, conversationId } = req.body;
    const headers = chatServiceHeaders(req);

    const response = await axios.post(
      `${config.chatServiceApi}/chat`,
      {
        conversationId,
        role: "user",
        content: prompt,
      },
      { headers },
    );
    const result = await graph.invoke({
      prompt,
      conversationId,
    });
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Agent response",
      data: result.aiResponse,
    });
  } catch (error) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to create agent",
    );
  }
};
export default agentController;
