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
    }),
  },
  {
    path: "/auth",
    route: createProxyMiddleware({
      target: config.userService.url,
      changeOrigin: true,
      pathRewrite: { "^/": "/service/auth/" },
    }),
  },
  {
    path: "/agent",
    route: createProxyMiddleware({
      target: config.agentService.url,
      changeOrigin: true,
      pathRewrite: { "^/": "/service/agent/" },
    }),
  },
];

apiRoutes.forEach((route) => router.use(route.path, route.route as any));
export default router;
