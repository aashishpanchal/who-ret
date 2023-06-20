import { TOKEN } from "@/constants";

export interface ITokens {
  [TOKEN.ACCESS]: string;
  [TOKEN.REFRESH]: string;
}

export const storeTokens = (tokens: ITokens) => {
  localStorage.setItem(TOKEN.ACCESS, tokens[TOKEN.ACCESS]);
  localStorage.setItem(TOKEN.REFRESH, tokens[TOKEN.REFRESH]);
};

export const updateToken = (type: TOKEN, token: string) => {
  localStorage.setItem(type, token);
};

export const getToken = (type: TOKEN) => {
  return localStorage.getItem(type);
};

export const removeTokens = () => {
  localStorage.removeItem(TOKEN.ACCESS);
  localStorage.removeItem(TOKEN.REFRESH);
};
