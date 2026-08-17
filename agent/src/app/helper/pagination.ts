export interface IPaginationQuery {
  page?: number;
  limit?: number;
}

export interface IPaginationOptions {
  skip: number;
  take: number;
  currentPage: number;
}

// calculate the offset and limit
export const getPaginationOptions = (
  query: IPaginationQuery,
  defaultLimit: number = 10,
  maxLimit: number = 100,
) => {
  // sanitize and parse
  let currentPage = parseInt(query?.page?.toString() || "1", 10);
  if (isNaN(currentPage) || currentPage <= 0) {
    currentPage = 1;
  }
  //   sanitize and parse limit
  let take = parseInt(query?.limit?.toString() || defaultLimit.toString(), 10);
  if (isNaN(take) || take <= 0) {
    take = defaultLimit;
  }
  if (take > maxLimit) {
    take = maxLimit;
  }
  //   Calculate offset (skip)
  const skip = (currentPage - 1) * take;
  return {
    skip,
    take,
    currentPage,
  };
};

// response

export const getPaginationResponse = <T>(
  data: T[],
  totalItems: number,
  currentPage: number,
  limit: number,
) => {
  const totalPages = Math.ceil(totalItems / limit);
  return {
    data,
    meta: {
      totalItems,
      itemsPerPage: limit,
      currentPage,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    },
  };
};
