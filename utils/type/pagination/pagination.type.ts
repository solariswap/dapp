export type PaginationMeta = {
  /** Number of items returned in the page */
  itemsPerPage: number;
  /** Total number of items in all pages */
  totalItems: number;
  /** The current page number */
  currentPage: number;
  /** The previous page, if no page --> set to null */
  previousPage: number | null;
  /** The next page, if no page --> set to null */
  nextPage: number;
  /** The total number of pages */
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type PaginationOptions = {
  page?: number;

  limit?: number;
};
