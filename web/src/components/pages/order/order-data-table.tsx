import { useMemo } from "react";
import OrderAction from "./order-action";
import OrderToolbar from "./order-toolbar";
import useUrlQuery from "@/hooks/useUrlQuery";
import { useQuery } from "@tanstack/react-query";
import { NumericFormat } from "react-number-format";
import { getAllOrderFn } from "@/http/apis/order-api";
import { createColumnHelper } from "@tanstack/react-table";
import { DateFormat, DataTable } from "@/components/table";
import { OrderStatus } from "./row";

type Props = {};

const columnHelper = createColumnHelper<any>();

export default function KycList({}: Props) {
  const { query } = useUrlQuery();
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["order-list", query],
    queryFn: async () => (await getAllOrderFn(query)).data,
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("_id", {
        cell: (info) => info.getValue(),
        header: "#Id",
        meta: { width: 100, align: "center" },
      }),
      columnHelper.accessor("user.phone", {
        header: "Customer",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("createdAt", {
        header: "Date",
        cell: (info) => <DateFormat value={info.getValue()} />,
      }),
      columnHelper.accessor("items", {
        header: "Items",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("price", {
        header: "price",
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
      columnHelper.accessor("orderStatus", {
        header: "Status",
        cell: (info) => <OrderStatus status={info.getValue()} />,
      }),
      columnHelper.display({
        header: "action",
        cell: (info) => <OrderAction {...info} refetch={refetch} />,
      }),
    ],
    [data]
  );

  return (
    <DataTable
      columns={columns}
      loading={isLoading}
      renderTableToolbar={<OrderToolbar />}
      data={Array.isArray(data) ? data : data?.results || []}
      count={!Array.isArray(data) ? data?.count : data.length}
    />
  );
}
