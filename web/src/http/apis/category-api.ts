import { api, getQuery } from "../api";
import { ApiListResponse, ImageType } from "./type";

export type CategoriesApiResponse = ApiListResponse<Categories>;
export type SubCategoriesApiResponse = ApiListResponse<SubCategories>;

export type Categories = {
  _id: string;
  name: string;
  parent: null;
  public: boolean;
  createdAt: string;
  updatedAt: string;
  description: string;
  thumbnail: ImageType;
};

export type SubCategories = {
  _id: string;
  name: string;
  parent: string;
  public: boolean;
  createdAt: string;
  updatedAt: string;
  description: string;
  thumbnail: ImageType;
};

export const getAllCategoryFn = (query?: string) =>
  api.get<CategoriesApiResponse | Categories[]>(
    `/categories${getQuery(query)}`
  );

export const createCategoryFn = (data: any) =>
  api.post<Categories>("/categories", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateCategoryFn = (id: string, data: any) =>
  api.put<Categories>(`/categories/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteCategoryFn = (id: string) =>
  api.delete<Categories>(`/categories/${id}`);

export const getAllSubCategoryFn = (categoryId: string, query?: string) =>
  api.get<SubCategoriesApiResponse | SubCategories[]>(
    `/categories/${categoryId}/subcategories${getQuery(query)}`
  );

export const createSubCategoryFn = (categoryId: string, data: any) =>
  api.post<SubCategories>(`/categories/${categoryId}/subcategories`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateSubCategoryFn = (
  categoryId: string,
  id: string,
  data: any
) =>
  api.put<SubCategories>(
    `/categories/${categoryId}/subcategories/${id}`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

export const deleteSubCategoryFn = (categoryId: string, id: string) =>
  api.delete<SubCategories>(`/categories/${categoryId}/subcategories/${id}`);
