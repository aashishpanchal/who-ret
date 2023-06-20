import { api, getQuery } from "../api";

export type UserType = {
  _id: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  loginAt: string;
};

export type UserApiResponse = {
  count: number;
  totalPages: null;
  next: boolean;
  prev: boolean;
  results: UserType[];
};

export const getAllUserFn = (query?: string) =>
  api.get<UserApiResponse | UserType[]>(`/users${getQuery(query)}`);

export const updateUserFn = (id: string, data: any) =>
  api.put<UserType>(`/users/${id}`, data);

export const deleteUserFn = (id: string) => api.delete<UserType>(`/user/${id}`);
