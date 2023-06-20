import { useMemo } from "react";
import { ROLE } from "@/constants";
import useUrlQuery from "@/hooks/useUrlQuery";
import { useQuery } from "@tanstack/react-query";
import { BasicToolbar } from "@components/common";
import { createColumnHelper } from "@tanstack/react-table";
import { DateFormat, DataTable } from "@components/table";
import { getAllUserFn, UserType } from "@/http/apis/user-api";

const columnHelper = createColumnHelper<UserType>();

type Props = {
  title: string;
  placeholder: string;
  role: ROLE;
};

export default function UserDataTable({ title, placeholder, role }: Props) {
  const { query } = useUrlQuery(role ? { role } : undefined);
  const { isLoading, data } = useQuery({
    queryKey: ["user-list-" + role, query],
    queryFn: async () => (await getAllUserFn(query)).data,
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("_id", {
        cell: (info) => info.getValue(),
        header: "#Id",
        meta: { width: 100, align: "center" },
      }),
      columnHelper.accessor("phone", {
        header: "Public",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("createdAt", {
        header: "Create At",
        cell: (info) => <DateFormat value={info.getValue()} />,
      }),
      columnHelper.accessor("loginAt", {
        header: "Login At",
        cell: (info) => <DateFormat value={info.getValue()} />,
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("isActive", {
        header: "Active",
        cell: (info) => info.getValue(),
      }),
    ],
    [data]
  );

  return (
    <DataTable
      columns={columns}
      loading={isLoading}
      renderTableToolbar={
        <BasicToolbar placeholder={placeholder} title={title} />
      }
      data={Array.isArray(data) ? data : data?.results || []}
      count={!Array.isArray(data) ? data?.count : data.length}
    />
  );
}
