import { MSG } from "@/constants";
import { Stack } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DeleteAlert } from "@/components/alerts";
import { CellContext } from "@tanstack/react-table";
import IconBtn from "@/components/buttons/icon-btn";
import { Order, deleteOrderFn } from "@/http/apis/order-api";

export default function OrderAction({
  refetch,
  ...props
}: CellContext<Order, any> & {
  refetch: () => void;
}) {
  const { original } = props.row;
  const navigate = useNavigate();
  const onView = () => navigate(`${original._id}`);

  return (
    <Stack direction="row" spacing={2}>
      <IconBtn title="order detail" Icon={<FaEye />} onClick={onView} />
      <DeleteAlert
        callback={refetch}
        toastMsg={MSG.ORDER_DELETE}
        requestFunc={() => deleteOrderFn(original._id)}
      />
    </Stack>
  );
}
