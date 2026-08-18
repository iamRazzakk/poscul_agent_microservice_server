import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";
import config from "../../config/config";

export const groqLLmModel = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
});

export const googleLLmModel = new ChatGoogleGenerativeAI({
  apiKey: config.geminiApiKey,
  model: "gemini-2.5-flash",
  temperature: 0,
  maxRetries: 2,
});

export const getModelFunc = (model: string) => {
  switch (model) {
    case "chat":
      return googleLLmModel;
    case "coding":
      return groqLLmModel;
    case "image":
      return groqLLmModel;
    case "pdf":
      return groqLLmModel;
    case "ppt":
      return groqLLmModel;
    case "search":
      return groqLLmModel;
    default:
      return googleLLmModel;
  }
};
