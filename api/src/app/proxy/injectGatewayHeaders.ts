import type { ClientRequest, IncomingMessage } from "http";
import type { Request } from "express";

const injectGatewayHeaders = (gatewaySecret: string) => {
  return (proxyReq: ClientRequest, req: IncomingMessage) => {
    const expressReq = req as Request;

    proxyReq.removeHeader("x-user-id");
    proxyReq.removeHeader("x-user-role");
    proxyReq.removeHeader("x-gateway-secret");

    const userId =
      expressReq.user?.id ??
      (expressReq.headers["x-user-id"] as string | undefined);
    const userRole =
      expressReq.user?.role ??
      (expressReq.headers["x-user-role"] as string | undefined);

    if (userId) {
      proxyReq.setHeader("x-user-id", String(userId));
      proxyReq.setHeader("x-user-role", String(userRole ?? ""));
    }

    proxyReq.setHeader("x-gateway-secret", gatewaySecret);
  };
};

export default injectGatewayHeaders;
