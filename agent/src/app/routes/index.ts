import express from "express";
import { FileRoutes } from "../modules/file/file.routes";

const router = express.Router();

const apiRoutes = [
  {
    path: "/file",
    route: FileRoutes,
  },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
