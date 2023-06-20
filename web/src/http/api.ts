import axios from "axios";
import { TOKEN } from "@/constants";
import { getToken, storeTokens } from "@/utils/token";
import { refreshFn } from "./apis/token-api";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getToken(TOKEN.ACCESS);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const {
          data: { tokens = {} },
        } = await refreshFn();
        api.defaults.headers["Authorization"] = `Bearer ${
          tokens?.[TOKEN.ACCESS]
        }`;
        storeTokens(tokens);
        return api.request(originalRequest);
      } catch (err: any) {
        console.log(err.message);
      }
    }
    throw error;
  }
);

export const getQuery = (query?: string) => (query ? `?${query}` : "");
