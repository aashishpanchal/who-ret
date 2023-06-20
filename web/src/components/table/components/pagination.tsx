import { TablePagination } from "@mui/material";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZES = [10, 20, 30, 50, 100];

type Props = {
  count: number;
};

export default function Pagination({ count }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(() => {
    const p = searchParams.get("page");
    if (p) {
      if (isNaN(+p)) return 0;
      return +p;
    }
    return 0;
  }, [searchParams.get("page")]);

  const size = useMemo(() => {
    const p = parseInt(searchParams.get("size") || "");
    if (!isNaN(p)) {
      if (PAGE_SIZES.includes(p)) return p;
      return PAGE_SIZES[0];
    }
    return PAGE_SIZES[0];
  }, [searchParams.get("size")]);

  const onChangePage = (page: number) => {
    console.log(page);
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      return prev;
    });
  };

  const onChangePageSize = (value: string) => {
    setSearchParams((prev) => {
      prev.set("size", value);
      prev.set("page", "0");
      return prev;
    });
  };

  return (
    <TablePagination
      inputMode="url"
      rowsPerPageOptions={PAGE_SIZES}
      component="div"
      count={count}
      rowsPerPage={size}
      page={page}
      onPageChange={(_, page) => onChangePage(page)}
      onRowsPerPageChange={(e) => onChangePageSize(e.target.value)}
    />
  );
}
