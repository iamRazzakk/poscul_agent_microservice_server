export const codingAgent = async (params: any) => {
  return {
    ...params,
    aiResponse: params.aiResponse ?? "Coding agent is not implemented yet.",
  };
};
