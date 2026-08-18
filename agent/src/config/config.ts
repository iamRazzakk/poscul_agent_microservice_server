import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  ip_address: process.env.IP_ADDRESS,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  geminiApiKey: process.env.GEMINI_API_KEY!,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  // chat service secret
  agentServiceSecret: process.env.AGENT_SERVICE_SECRET!,
  chatServiceSecret: process.env.CHAT_SERVICE_SECRET!,
  chatServiceApi: process.env.CHAT_SERVICE_API!,
};
