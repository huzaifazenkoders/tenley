import type { InfiniteData } from "@tanstack/react-query";
import type { PaginationRes } from "@/types/common";

export const getNextPageParam = (lastPage: PaginationRes) => {
  const { page, totalPages } = lastPage;
  return page < totalPages ? page + 1 : undefined;
};

export const transformInfiniteData = <T>(
  data: InfiniteData<PaginationRes & { data: T[] }>
): T[] => data.pages.flatMap((page) => page.data);
