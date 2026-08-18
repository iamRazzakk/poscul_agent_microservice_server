import { END, START, StateGraph } from "@langchain/langgraph";
import { agentState } from "../state/state";
import { router } from "./router";
import { chatAgents } from "../agents/chat.agents";
import { codingAgent } from "../agents/coding.agent";
import { imageAgent } from "../agents/image.agent";
import { pdfAgent } from "../agents/pdf.agent";
import { pptAgent } from "../agents/ppt.agent";
import { searchAgent } from "../agents/search.agent";

const graph = new StateGraph(agentState)
  .addNode("router", router)
  .addNode("chat", chatAgents)
  .addNode("coding", codingAgent)
  .addNode("image", imageAgent)
  .addNode("pdf", pdfAgent)
  .addNode("ppt", pptAgent)
  .addNode("search", searchAgent)
  .addEdge(START, "router")
  .addConditionalEdges(
    "router",
    (state) => {
      switch (state.agent) {
        case "chat":
          return "chat";
        case "coding":
          return "coding";
        case "image":
          return "image";
        case "pdf":
          return "pdf";
        case "ppt":
          return "ppt";
        case "search":
          return "search";
        default:
          return "chat";
      }
    },
    {
      chat: "chat",
      coding: "coding",
      image: "image",
      pdf: "pdf",
      ppt: "ppt",
      search: "search",
    },
  )
  .addEdge("search", "chat")
  .addEdge("chat", END)
  .addEdge("coding", END)
  .addEdge("image", END)
  .addEdge("pdf", END)
  .addEdge("ppt", END)
  .compile();

export default graph;
