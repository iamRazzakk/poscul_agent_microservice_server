import type { ClientRequest, IncomingMessage } from "http";
import type { Request } from "express";

const injectGatewayHeaders = (gatewaySecret: string) => {
  return (proxyReq: ClientRequest, req: IncomingMessage) => {
    const expressReq = req as Request;

    proxyReq.removeHeader("x-user-id");
    proxyReq.removeHeader("x-user-role");
    proxyReq.removeHeader("x-gateway-secret");

    if (expressReq.user?.id) {
      proxyReq.setHeader("x-user-id", String(expressReq.user.id));
      proxyReq.setHeader("x-user-role", String(expressReq.user.role ?? ""));
    }

    proxyReq.setHeader("x-gateway-secret", gatewaySecret);
  };
};

export default injectGatewayHeaders;
