import { api, getQuery } from "../api";
import { ApiListResponse, ImageType } from "./type";

export type BannerApiResponse = ApiListResponse<Banner>;

export type Banner = {
  _id: string;
  description: string;
  public: boolean;
  createdAt: string;
  updatedAt: string;
  image: ImageType;
};

export const getAllBannerFn = (query?: string) =>
  api.get<BannerApiResponse | Banner[]>(`/banners${getQuery(query)}`);

export const createBannerFn = (data: any) =>
  api.post<Banner>("/banners", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateBannerFn = (id: string, data: any) =>
  api.put<Banner>(`/banners/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteBannerFn = (id: string) =>
  api.delete<Banner>(`/banners/${id}`);
