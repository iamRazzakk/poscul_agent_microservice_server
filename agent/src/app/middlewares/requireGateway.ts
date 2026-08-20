import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import config from "../../config/config";
import sendResponse from "../shared/sendResponse";
import { resolveAccessToken, verifyAccessToken } from "../helper/jwtHelper";

const headerValue = (value: string | string[] | undefined) => {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
};

const requireGateway = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.path === "/health" || req.originalUrl.startsWith("/health")) {
      return next();
    }

    const secret = headerValue(req.headers["x-gateway-secret"]);
    const hasValidSecret = secret === config.agentServiceSecret;

    // Attach user from Bearer/cookie whenever possible (gateway or direct)
    const token = resolveAccessToken(req);
    if (token) {
      req.user = verifyAccessToken(token);
    }

    if (hasValidSecret || req.user?.id) {
      return next();
    }

    sendResponse(res, {
      success: false,
      statusCode: StatusCodes.FORBIDDEN,
      message:
        "Unauthorized — send Authorization: Bearer <token> (or x-gateway-secret)",
    });
  } catch (error) {
    next(error);
  }
};

export default requireGateway;
