import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  ip_address: process.env.IP,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  // user service
  userService: {
    url: process.env.USER_SERVICE_URL!,
  },
  // agent service
  agentService: {
    url: process.env.AGENT_SERVICE_URL!,
  },
  // chat service
  chatService: {
    url: process.env.CHAT_SERVICE_URL!,
  },
  // gateway secret
  gatewaySecret: process.env.GATEWAY_SECRET!,
};
