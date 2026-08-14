import jwt from "jsonwebtoken";
import config from "../config";

export type GatewayUser = {
  id: string;
  role: string;
};

export const verifyAccessToken = (token: string): GatewayUser => {
  const decoded = jwt.verify(token, config.jwt.secret, {
    algorithms: ["HS256"],
    audience: config.jwt.audience,
    maxAge: config.jwt.accessExpiresIn,
  }) as jwt.JwtPayload;
  if (!decoded?.id || !decoded?.role) {
    throw new Error("Invalid token payload");
  }
  return {
    id: String(decoded.id),
    role: String(decoded.role),
  };
};
