import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { BasicToolbar, SelectPublic } from "@/components/common";
import {
  DataTable,
  DateFormat,
  PublicStatus,
  ThumbnailRow,
} from "@/components/table";
import { Banner, BannerApiResponse } from "@/http/apis/banner-api";
import BannerAction from "./banner-action";
import { useAppSelector } from "@/redux/hooks";
import { ROLE } from "@/constants";

type Props = {
  count?: number;
  refetch: () => void;
  isLoading?: boolean;
  data?: BannerApiResponse | Banner[];
};

const columnHelper = createColumnHelper<Banner>();

export default function BannerDataTable({ data, isLoading, refetch }: Props) {
  const { user } = useAppSelector((state) => state.auth);

  const columns = useMemo(() => {
    const col = [
      columnHelper.accessor("_id", {
        cell: (info) => info.getValue(),
        header: "#Id",
      }),
      columnHelper.accessor("image", {
        cell: ThumbnailRow,
        header: "Thumbnail",
      }),
      columnHelper.accessor("description", {
        header: "description",
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
    if (user?.role === ROLE.ADMIN)
      col.push(
        columnHelper.display({
          header: "action",
          cell: (info) => <BannerAction {...info} refetch={refetch} />,
        })
      );
    return col;
  }, [data]);

  return (
    <DataTable
      data={Array.isArray(data) ? data : data?.results || []}
      loading={isLoading}
      columns={columns}
      count={!Array.isArray(data) ? data?.count : data.length}
      renderTableToolbar={
        <BasicToolbar title="Banner List" placeholder="Search Banner">
          <SelectPublic />
        </BasicToolbar>
      }
    />
  );
}
