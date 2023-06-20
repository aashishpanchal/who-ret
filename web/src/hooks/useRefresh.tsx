import { TOKEN } from "@/constants";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@redux/hooks";
import { getToken, storeTokens } from "@/utils/token";
import { setAuth } from "@redux/features/authSlice";
import { refreshFn } from "@/http/apis/token-api";

export function useRefresh() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getToken(TOKEN.REFRESH);

    if (token)
      (async () => {
        try {
          const {
            data: { tokens, ...user },
          } = await refreshFn();
          storeTokens(tokens);
          dispatch(setAuth(user));
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      })();
    else setLoading(false);
  }, []);

  return { loading };
}
