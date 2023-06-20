import { useMemo } from "react";
import KycAction from "./kyc-action";
import useUrlQuery from "@/hooks/useUrlQuery";
import { useQuery } from "@tanstack/react-query";
import { UserKyc, getAllKycFn } from "@/http/apis/kyc-api";
import { createColumnHelper } from "@tanstack/react-table";
import { DateFormat, DataTable } from "@/components/table";
import { KycStatusRow, KycVerifiedRow } from "./row";
import KycToolBar from "./kyc-toolbar";

type Props = {};

const columnHelper = createColumnHelper<UserKyc>();

export default function KycList({}: Props) {
  const { query } = useUrlQuery();
  const { isLoading, refetch, data } = useQuery({
    queryKey: ["kyc-list", query],
    queryFn: async () => (await getAllKycFn(query)).data,
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("_id", {
        cell: (info) => info.getValue(),
        header: "#Id",
        meta: { width: 100, align: "center" },
      }),
      columnHelper.accessor("user.phone", {
        header: "Public",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("createdAt", {
        header: "Create At",
        cell: (info) => <DateFormat value={info.getValue()} />,
      }),
      columnHelper.accessor("abnNumber", {
        header: "ABN No.",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("isVerify", {
        cell: KycVerifiedRow,
        header: "Verified",
      }),
      columnHelper.accessor("kycStatus", {
        cell: KycStatusRow,
        header: "Status",
      }),
      columnHelper.display({
        header: "action",
        cell: (info) => <KycAction {...info} refetch={refetch} />,
      }),
    ],
    [data]
  );

  return (
    <DataTable
      columns={columns}
      loading={isLoading}
      renderTableToolbar={<KycToolBar />}
      data={Array.isArray(data) ? data : data?.results || []}
      count={!Array.isArray(data) ? data?.count : data.length}
    />
  );
}
