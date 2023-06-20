import KycAddEdit from "./kyc-edit";
import { Stack } from "@mui/material";
import { DeleteAlert } from "@/components/alerts";
import { CellContext } from "@tanstack/react-table";
import { UserKyc, deleteKycFn } from "@/http/apis/kyc-api";

export default function KycAction({
  refetch,
  ...props
}: CellContext<UserKyc, any> & {
  refetch: () => void;
}) {
  return (
    <Stack direction="row" spacing={2}>
      <KycAddEdit refetch={refetch} {...props} />
      <DeleteAlert
        callback={refetch}
        toastMsg="Kyc was successfully deleted"
        requestFunc={() => deleteKycFn(props.row.original._id)}
      />
    </Stack>
  );
}
