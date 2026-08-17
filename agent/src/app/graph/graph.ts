import { StateGraph } from "@langchain/langgraph";
import { agentState } from "../state/state";
import { router } from "./router";
import { chatAgents } from "../agents/chat.agents";
import { codingAgent } from "../agents/coding.agent";
import { imageAgent } from "../agents/image.agent";
import { pdfAgent } from "../agents/pdf.agent";
import { pptAgent } from "../agents/ppt.agent";
import { searchAgent } from "../agents/search.agent";

const workflow = new StateGraph(agentState);

workflow.addNode("router", router);
workflow.addNode("chat", chatAgents);
workflow.addNode("coding", codingAgent);
workflow.addNode("image", imageAgent);
workflow.addNode("pdf", pdfAgent);
workflow.addNode("ppt", pptAgent);
workflow.addNode("search", searchAgent);

workflow.addEdge("__start__", "router");
workflow.addConditionalEdges(
  "router",
  (state) => {
    //  conditional edges
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
    default: "chat",
  },
);
//  end edges
workflow.addEdge("search", "chat");
workflow.addEdge("chat", "__end__");
workflow.addEdge("coding", "__end__");
workflow.addEdge("image", "__end__");
workflow.addEdge("pdf", "__end__");
workflow.addEdge("ppt", "__end__");
workflow.addEdge("search", "__end__");

const graph = workflow.compile();
export default graph;
