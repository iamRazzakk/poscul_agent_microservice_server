import jwt from "jsonwebtoken";
import config from "../../config/config";

export type AgentUser = {
  id: string;
  role: string;
};

export const verifyAccessToken = (token: string): AgentUser => {
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

const headerValue = (value: string | string[] | undefined) => {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
};

export const resolveAccessToken = (req: {
  headers: Record<string, string | string[] | undefined>;
  cookies?: Record<string, string>;
}) => {
  const authHeader = headerValue(req.headers.authorization)?.trim();
  if (authHeader) {
    const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
    if (bearerMatch?.[1]) {
      return bearerMatch[1].trim();
    }
    if (authHeader.split(".").length === 3) {
      return authHeader;
    }
  }

  const cookieToken = req.cookies?.access_token?.trim();
  if (cookieToken) {
    return cookieToken;
  }

  return undefined;
};
