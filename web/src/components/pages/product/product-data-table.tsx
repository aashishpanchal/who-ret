import { useMemo } from "react";
import { ROLE } from "@/constants";
import ProductAction from "./product-action";
import useUrlQuery from "@/hooks/useUrlQuery";
import { useAppSelector } from "@/redux/hooks";
import { DataTable, DateFormat, PublicStatus } from "@/components/table";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { UserProductType, getAllProductFn } from "@/http/apis/product-api";
import { TotalImage } from "@/components/common";
import { ProductThumbnail } from "./row";
import ProductToolBar from "./product-toolbar";
import { NumericFormat } from "react-number-format";

type Props = {};

const columnHelper = createColumnHelper<UserProductType>();

export default function ProductDataTable({}: Props) {
  const { user } = useAppSelector((state) => state.auth);
  const { query } = useUrlQuery(
    user?.role !== ROLE.ADMIN ? { user: user?._id } : {}
  );

  const { isLoading, refetch, data } = useQuery({
    queryKey: ["all-products", query],
    queryFn: async () => (await getAllProductFn(query)).data,
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("_id", {
        cell: (info) => info.getValue(),
        header: "#Id",
      }),
      columnHelper.display({
        cell: ProductThumbnail,
        header: "Thumbnail",
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
        header: "Images",
        cell: (info) => <TotalImage urls={info.row.original?.images} />,
        meta: { align: "center" },
      }),
      columnHelper.accessor("mrp", {
        header: "MRP",
        cell: (info) => (
          <NumericFormat
            value={info.getValue()}
            prefix="$"
            displayType="text"
            thousandSeparator
            className="font-Inter font-bold"
          />
        ),
      }),
      columnHelper.accessor("stock", {
        header: "Stock",
        cell: (info) => <span className="font-bold">{info.getValue()}</span>,
      }),
      columnHelper.accessor("discount", {
        header: "Discount",
        cell: (info) => <span className="font-bold">{info.getValue()}%</span>,
      }),
      columnHelper.display({
        header: "action",
        cell: (info) => <ProductAction {...info} refetch={refetch} />,
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
      renderTableToolbar={<ProductToolBar />}
    />
  );
}
