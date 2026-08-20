import { NextFunction, Request, Response } from "express";

/**
 * Stamps trusted identity + service secret onto the request
 * before proxying, so downstream services always receive them.
 */
const attachIdentityHeaders =
  (serviceSecret: string) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (req.user?.id) {
      req.headers["x-user-id"] = String(req.user.id);
      req.headers["x-user-role"] = String(req.user.role ?? "");
    }
    req.headers["x-gateway-secret"] = serviceSecret;
    next();
  };

export default attachIdentityHeaders;
