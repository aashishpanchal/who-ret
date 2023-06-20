import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function useUrlQuery(init: Record<string, any> = {}) {
  const [searchParams, _] = useSearchParams();

  const publicFilter = () => {
    const publicStatus = searchParams.get("public");
    if (publicStatus && publicStatus === "all") {
      searchParams.delete("public");
    }
  };

  const query = useMemo(() => {
    Object.keys(init).forEach((value) => {
      searchParams.set(value, init[value]);
    });
    publicFilter();
    return searchParams.toString();
  }, [init]);

  return { query };
}
