export const pptAgent = async (params: any) => {
  return {
    ...params,
    aiResponse: params.aiResponse ?? "PPT agent is not implemented yet.",
  };
};
