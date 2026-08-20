import { getModelFunc } from "../LLmModel/llm.model";

export const chatAgents = async (params: any) => {
  const llm = getModelFunc("chat");
  const systemPrompt = `You are POSCUL, an intelligent AI assistant.
  `;
  const res = await llm.invoke([
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "human",
      content: params.prompt,
    },
  ]);
  return {
    ...params,
    aiResponse: res.content,
  };
};
