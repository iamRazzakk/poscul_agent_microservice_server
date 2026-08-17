import express from "express";
import { ConversationRoutes } from "../modules/Conversation/conversation.routes";
import { FileRoutes } from "../modules/file/file.routes";

const router = express.Router();

const apiRoutes = [
  {
    path: "/conversation",
    route: ConversationRoutes,
  },
  {
    path: "/file",
    route: FileRoutes,
  },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
