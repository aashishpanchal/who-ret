import { Stack } from "@mui/material";
import { DeleteAlert } from "@/components/alerts";
import { CellContext } from "@tanstack/react-table";
import { Banner, deleteBannerFn } from "@/http/apis/banner-api";
import AddEditBanner from "./add-edit-banner";

type Props = CellContext<Banner, any> & {
  refetch: () => void;
};

export default function BannerAction({ refetch, ...props }: Props) {
  return (
    <Stack direction="row" spacing={2}>
      <AddEditBanner variant={"edit"} {...props} refetch={refetch} />
      <DeleteAlert
        callback={refetch}
        toastMsg="Banner successfully deleted"
        requestFunc={() => deleteBannerFn(props.row.original._id)}
      />
    </Stack>
  );
}
