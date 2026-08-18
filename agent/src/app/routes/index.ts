import express from "express";
import agentController from "../modules/agent/agent.controller";
import requireUser from "../middlewares/requireUser";

const router = express.Router();
router.route("/chat").post(requireUser(), agentController);
export default router;
