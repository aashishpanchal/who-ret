import { api } from "../api";
import axios from "axios";

export const loginFn = (phone: string, password: string) =>
  axios.post("/api/auth/login", { phone, password });

export const logoutFn = (token: string) =>
  api.delete("/auth/logout", { data: { token } });

export const logoutAllFn = (token: string) =>
  api.delete("/auth/logout/all", { data: { token } });
