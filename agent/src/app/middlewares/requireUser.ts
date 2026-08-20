import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../shared/sendResponse";
import { resolveAccessToken, verifyAccessToken } from "../helper/jwtHelper";

const headerValue = (value: string | string[] | undefined) => {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
};

const requireUser =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      let userId = headerValue(req.headers["x-user-id"]);
      let role = headerValue(req.headers["x-user-role"]);

      if (!userId && req.user?.id) {
        userId = String(req.user.id);
        role = String(req.user.role ?? "");
      }

      if (!userId) {
        const token = resolveAccessToken(req);
        if (token) {
          const user = verifyAccessToken(token);
          userId = user.id;
          role = user.role;
        }
      }

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
    } catch (error) {
      next(error);
    }
  };

export default requireUser;
