export type ApiErrorResponse = {
  code: string;
  message: string;
  details?: unknown;
};

export type PaginatedResponse<T> = {
  items: T[];
  nextCursor?: string;
  totalCount?: number;
};
