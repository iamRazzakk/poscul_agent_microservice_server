import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../../config/config";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log("🚨 globalErrorHandler", error);

  let statusCode = 500;
  let message = "Something went wrong";
  let errorMessages: any[] = [];

  if (error.name === "TokenExpiredError") {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = "Session Expired";
    errorMessages = error?.message
      ? [
          {
            path: "",
            message:
              "Your session has expired. Please log in again to continue.",
          },
        ]
      : [];
  } else if (error.name === "JsonWebTokenError") {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = "Invalid Token";
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: "Your token is invalid. Please log in again to continue.",
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = error.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.node_env !== "production" ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
