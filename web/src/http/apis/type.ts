export type ApiListResponse<T> = {
  count: number;
  totalPages: null;
  next: boolean;
  prev: boolean;
  results: T[];
};

export type ImageType = {
  public_id: string;
  url: string;
  _id: string;
};
