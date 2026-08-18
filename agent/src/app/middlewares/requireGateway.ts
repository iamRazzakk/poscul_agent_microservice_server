import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import config from "../../config/config";
import sendResponse from "../shared/sendResponse";

const requireGateway = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.path === "/health" || req.originalUrl.startsWith("/health")) {
      return next();
    }
    const secret = req.headers["x-gateway-secret"];
    if (secret !== config.agentServiceSecret) {
      sendResponse(res, {
        success: false,
        statusCode: StatusCodes.FORBIDDEN,
        message: "Unauthorized",
      });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default requireGateway;
