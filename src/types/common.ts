import React from "react";

export type ReactDispatch<T> = React.Dispatch<React.SetStateAction<T>>;

export interface PaginationReq {
  page?: number;
  limit?: number;
}

export interface PaginationRes {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}
