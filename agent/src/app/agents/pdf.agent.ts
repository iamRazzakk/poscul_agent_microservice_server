export const pdfAgent = async (params: any) => {
  return {
    ...params,
    aiResponse: params.aiResponse ?? "PDF agent is not implemented yet.",
  };
};
