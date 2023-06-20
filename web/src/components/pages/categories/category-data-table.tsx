import { useMemo } from "react";
import CategoryAction from "./category-action";
import { createColumnHelper } from "@tanstack/react-table";
import { BasicToolbar, SelectPublic } from "@/components/common";
import {
  DataTable,
  DateFormat,
  PublicStatus,
  ThumbnailRow,
} from "@/components/table";
import { Categories, CategoriesApiResponse } from "@/http/apis/category-api";

type Props = {
  count?: number;
  refetch: () => void;
  isLoading?: boolean;
  data?: CategoriesApiResponse | Categories[];
};

const columnHelper = createColumnHelper<Categories>();

export default function CategoryDataTable({ data, isLoading, refetch }: Props) {
  const columns = useMemo(
    () => [
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
      columnHelper.display({
        header: "action",
        cell: (info) => <CategoryAction {...info} refetch={refetch} />,
      }),
    ],
    [data]
  );

  return (
    <DataTable
      data={Array.isArray(data) ? data : data?.results || []}
      loading={isLoading}
      columns={columns}
      count={!Array.isArray(data) ? data?.count : data.length}
      renderTableToolbar={
        <BasicToolbar title="Categories List" placeholder="Search Category">
          <SelectPublic />
        </BasicToolbar>
      }
    />
  );
}
