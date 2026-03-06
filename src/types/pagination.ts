  export type PaginatedResponse<T> = {
    data: T[];
    meta: Pagination;
  };

  export type Pagination = {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };