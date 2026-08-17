import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import config from "../../config";
import injectGatewayHeaders from "../proxy/injectGatewayHeaders";
import requestAccessToken from "../middlewares/requireAccessToken";
import { stripSpoofedIdentity } from "../middlewares/stripSpoofedIdentity";

const router = express.Router();

const apiRoutes = [
  {
    path: "/user",
    route: createProxyMiddleware({
      target: config.userService.url,
      changeOrigin: true,
      pathRewrite: { "^/": "/service/user/" },
      // headers: {
      //   "x-gateway-secret": config.gatewaySecret,
      // },
      on: {
        proxyReq: injectGatewayHeaders(config.gatewaySecret as string) as any,
      },
    }),
  },
  {
    path: "/auth",
    route: createProxyMiddleware({
      target: config.userService.url,
      changeOrigin: true,
      pathRewrite: { "^/": "/service/auth/" },
      on: {
        proxyReq: injectGatewayHeaders(config.gatewaySecret as string) as any,
      },
    }),
  },
  {
    path: "/chat",
    route: [
      stripSpoofedIdentity,
      requestAccessToken,
      createProxyMiddleware({
        target: config.chatService.url,
        changeOrigin: true,
        pathRewrite: { "^/": "/service/" },
        on: {
          proxyReq: injectGatewayHeaders(
            config.chatServiceSecret as string,
          ) as any,
        },
      }),
    ],
  },
  {
    path: "/agent",
    route: [
      stripSpoofedIdentity,
      requestAccessToken,
      createProxyMiddleware({
        target: config.agentService.url,
        changeOrigin: true,
        pathRewrite: { "^/": "/service/" },
        on: {
          proxyReq: injectGatewayHeaders(
            config.agentServiceSecret as string,
          ) as any,
        },
      }),
    ],
  },
];

apiRoutes.forEach((route) => router.use(route.path, route.route as any));
export default router;
