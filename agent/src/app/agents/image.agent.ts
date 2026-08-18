export const imageAgent = async (params: any) => {
  return {
    ...params,
    aiResponse: params.aiResponse ?? "Image agent is not implemented yet.",
  };
};
