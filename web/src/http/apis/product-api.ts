import { api, getQuery } from "../api";
import { ApiListResponse, ImageType } from "./type";
import { Categories, SubCategories } from "./category-api";

export type ProductResponse = ApiListResponse<UserProductType>;
export type UserProductType = {
  _id: string;
  user: string;
  category: Categories;
  subcategory: SubCategories;
  name: string;
  mrp: number;
  gst: string;
  discount: number;
  expire: string;
  stock: number;
  public: boolean;
  keywords: string[];
  thumbnail: ImageType;
  images: ImageType[];
  createdAt: string;
  updatedAt: string;
};

export const getAllProductFn = (query: string) =>
  api.get<ProductResponse | UserProductType[]>(`/products${getQuery(query)}`);

export const getProductFn = (productId: string, query: string) =>
  api.get<UserProductType>(`/products/${productId}${getQuery(query)}`);

export const createProductFn = (data: any) => api.post("/products", data);

export const updateProductFn = (id: string, data: any) =>
  api.put<UserProductType>(`/products/${id}`, data);

export const deleteProductFn = (id: string) =>
  api.delete<UserProductType>(`/products/${id}`);

export const createProductImg = (productId: string, data: any) =>
  api.put<UserProductType>(`/products/${productId}/images`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProductImg = (productId: string, imageId: string) =>
  api.delete<UserProductType>(`/products/${productId}/image/${imageId}`);
