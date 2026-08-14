import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyAccessToken } from "../../helper/jwtHelper";
import sendResponse from "../../shared/sendResponse";

const AUTH_COOKIE_ACCESS = "access_token";

const resolveAccessToken = (req: Request) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      return token || undefined;
    }
    return req.cookies?.[AUTH_COOKIE_ACCESS] as string | undefined;
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

const requestAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = resolveAccessToken(req);
    if (!token) {
      sendResponse(res, {
        success: false,
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "You are not authorized",
        data: null,
      });
      return;
    }
    req.user = verifyAccessToken(token as string);
    next();
  } catch (error) {
    next(error);
  }
};

export default requestAccessToken;