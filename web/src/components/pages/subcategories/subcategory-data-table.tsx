import { useMemo } from "react";
import SubCategoryAction from "./subcategory-action";
import { createColumnHelper } from "@tanstack/react-table";
import { BasicToolbar, SelectPublic } from "@/components/common";
import {
  DataTable,
  DateFormat,
  PublicStatus,
  ThumbnailRow,
} from "@/components/table";
import {
  SubCategories,
  SubCategoriesApiResponse,
} from "@/http/apis/category-api";
import { useAppSelector } from "@/redux/hooks";
import { ROLE } from "@/constants";

type Props = {
  count?: number;
  refetch: () => void;
  isLoading?: boolean;
  data?: SubCategoriesApiResponse | SubCategories[];
};

const columnHelper = createColumnHelper<SubCategories>();

export default function SubCategoryDataTable({
  data,
  isLoading,
  refetch,
}: Props) {
  const { user } = useAppSelector((state) => state.auth);

  const columns = useMemo(() => {
    const col = [
      columnHelper.accessor("_id", {
        cell: (info) => info.getValue(),
        header: "#Id",
      }),
      columnHelper.accessor("thumbnail", {
        cell: ThumbnailRow,
        header: "Thumbnail",
      }),
      columnHelper.accessor("name", {
        header: "name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("public", {
        header: "Public",
        cell: PublicStatus,
      }),
      columnHelper.accessor("createdAt", {
        header: "Create At",
        cell: (info) => <DateFormat value={info.getValue()} />,
      }),
    ];
    if (user?.role === ROLE.ADMIN) {
      col.push(
        columnHelper.display({
          header: "action",
          cell: (info) => <SubCategoryAction {...info} refetch={refetch} />,
        })
      );
    }
    return col;
  }, [data]);

  return (
    <DataTable
      data={Array.isArray(data) ? data : data?.results || []}
      loading={isLoading}
      columns={columns}
      count={!Array.isArray(data) ? data?.count : data.length}
      renderTableToolbar={
        <BasicToolbar
          title="SubCategories List"
          placeholder="Search SubCategory"
        >
          <SelectPublic />
        </BasicToolbar>
      }
    />
  );
}
