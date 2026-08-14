import { Router } from "express";
import { ConversationController } from "./conversation.controller";
import requireUser from "../../middlewares/requireUser";

const router = Router();

router
  .route("/create-conversation")
  .post(requireUser(), ConversationController.createConversation);

export const ConversationRoutes = router;
