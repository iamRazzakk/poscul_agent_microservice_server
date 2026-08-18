import { getModelFunc } from "../LLmModel/llm.model";

const AGENTS = ["chat", "coding", "image", "pdf", "ppt", "search"] as const;

export const router = async (params: any) => {
  const llm = getModelFunc("router");

  const prompt = `You are an agent router.

Available agents:
- chat
- coding
- image
- pdf
- ppt
- search

When to use each agent:

chat:
- General conversation
- Explanations
- Learning
- Questions

search:
- Current events
- Latest information
- News
- Recent developments
- Internet lookup

coding:
- Generate code
- Debug code
- Build projects
- Architecture
- API design

pdf:
- Questions about generated PDF or document context

image:
- Questions about generated image or image context

ppt:
- Questions about generated PPTs or PPT context

Return ONLY one word:
- chat
- search
- coding
- pdf
- ppt
- image

User Query:
${params.prompt}
`;

  const res = await llm.invoke(prompt);
  const raw = String(res.content).trim().toLowerCase();
  const agent = AGENTS.find((name) => raw.includes(name)) ?? "chat";

  return {
    ...params,
    agent,
  };
};
