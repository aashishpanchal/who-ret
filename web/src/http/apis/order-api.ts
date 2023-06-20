import { api, getQuery } from "../api";
import { ApiListResponse } from "./type";

export type OrderApiResponse = ApiListResponse<Order>;

export type Order = {
  _id: string;
};

export const getAllOrderFn = (query?: string) =>
  api.get<OrderApiResponse | Order[]>(`/orders${getQuery(query)}`);

export const updateOrderFn = (id: string, data: any) =>
  api.put<Order>(`/orders/${id}`, data);

export const deleteOrderFn = (id: string) => api.delete<Order>(`/orders/${id}`);
