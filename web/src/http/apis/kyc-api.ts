import { api, getQuery } from "../api";
import { ApiListResponse } from "./type";
import { UserType } from "./user-api";

export type UserKycApiResponse = ApiListResponse<UserKyc>;

export type UserKyc = {
  _id: string;
  user: UserType;
  abnNumber: string;
  kycStatus: string;
  isVerify: boolean;
  createdAt: string;
  updatedAt: string;
  verifiedAt: string;
};

export const getAllKycFn = (query?: string) =>
  api.get<UserKycApiResponse | UserKyc[]>(`/kyc${getQuery(query)}`);

export const createKycFn = (data: any) => api.post<UserKyc>("/kyc", data);

export const updateKycFn = (id: string, data: any) =>
  api.put<UserKyc>(`/Kyc/${id}`, data);

export const deleteKycFn = (id: string) => api.delete<UserKyc>(`/kyc/${id}`);
