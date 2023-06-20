import { Stack } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DeleteAlert } from "@/components/alerts";
import IconBtn from "@/components/buttons/icon-btn";
import { CellContext } from "@tanstack/react-table";
import { UserProductType, deleteProductFn } from "@/http/apis/product-api";

export default function ProductAction({
  refetch,
  ...props
}: CellContext<UserProductType, any> & {
  refetch: () => void;
}) {
  const navigate = useNavigate();

  const onEdit = () => navigate(`${props.row.original._id}`);

  return (
    <Stack direction="row" spacing={2}>
      <IconBtn title="Edit" Icon={<FaEdit fontSize={16} />} onClick={onEdit} />
      <DeleteAlert
        callback={refetch}
        toastMsg="Product successfully deleted"
        requestFunc={() => deleteProductFn(props.row.original._id)}
      />
    </Stack>
  );
}
