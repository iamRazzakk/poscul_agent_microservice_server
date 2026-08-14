import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../shared/sendResponse";

const headerValue = (value: string | string[] | undefined) => {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
};

const requireUser =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const userId = headerValue(req.headers["x-user-id"]);
    const role = headerValue(req.headers["x-user-role"]);
    if (!userId) {
      sendResponse(res, {
        success: false,
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "You are not authorized",
        data: null,
      });
      return;
    }

    req.user = {
      id: userId,
      role,
    };

    if (roles.length && (!role || !roles.includes(role))) {
      sendResponse(res, {
        success: false,
        statusCode: StatusCodes.FORBIDDEN,
        message: "You don't have permission to access this api",
      });
      return;
    }

    next();
  };

export default requireUser;
