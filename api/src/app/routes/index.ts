import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import config from "../../config";

const router = express.Router();

const apiRoutes = [
  {
    path: "/user",
    route: createProxyMiddleware({
      target: config.userService.url,
      changeOrigin: true,
      pathRewrite: { "^/": "/service/user/" },
      headers: {
        "x-gateway-secret": config.gatewaySecret,
      },
    }),
  },
  {
    path: "/auth",
    route: createProxyMiddleware({
      target: config.userService.url,
      changeOrigin: true,
      pathRewrite: { "^/": "/service/auth/" },
      headers: {
        "x-gateway-secret": config.gatewaySecret,
      },
    }),
  },
  {
    path: "/chat",
    route: createProxyMiddleware({
      target: config.chatService.url,
      changeOrigin: true,
      pathRewrite: { "^/": "/service/chat/" },
      headers: {
        "x-gateway-secret": config.gatewaySecret,
      },
    }),
  },
];

apiRoutes.forEach((route) => router.use(route.path, route.route as any));
export default router;
