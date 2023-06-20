import { TOKEN } from "@/constants";
import { getToken } from "@/utils/token";
import axios from "axios";

export const refreshFn = () =>
  axios.post(`/api/auth/refresh`, {
    token: getToken(TOKEN.REFRESH),
  });

export const tokenValidateFn = () =>
  axios.post(`/api/auth/validate`, {
    token: getToken(TOKEN.REFRESH),
  });
