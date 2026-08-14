import express from "express";
import { ConversationRoutes } from "../modules/Conversation/conversation.routes";

const router = express.Router();

const apiRoutes = [
  {
    path: "/conversation",
    route: ConversationRoutes,
  },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
