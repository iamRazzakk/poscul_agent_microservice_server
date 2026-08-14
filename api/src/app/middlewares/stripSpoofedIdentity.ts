import { NextFunction, Request, Response } from "express";

export const stripSpoofedIdentity = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const spoofable = ["x-user-id", "x-user-role", "x-gateway-secret"] as const;

    for (const header of spoofable) {
      delete req.headers[header];
    }
    next();
  } catch (error) {
    next(error);
  }
};
