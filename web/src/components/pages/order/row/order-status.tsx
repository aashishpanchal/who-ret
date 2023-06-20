import { Chip } from "@mui/material";
import { ORDER_STATUS } from "@/constants/enum";

type Props = {
  status: string;
};

export default function OrderStatus({ status }: Props) {
  const orderStatus = () => {
    switch (status) {
      case ORDER_STATUS.ACCEPTED:
        return <Chip label="Accepted" />;
      case ORDER_STATUS.CANCELLED:
        return <Chip label="Cancelled" />;
      case ORDER_STATUS.DELIVERED:
        return <Chip label="Delivered" />;
      case ORDER_STATUS.IN_PROCESS:
        return <Chip label="In Process" />;
      case ORDER_STATUS.PENDING:
        return <Chip label="Pending" />;
      case ORDER_STATUS.OUT_FOR_DELIVERY:
        return <Chip label="Out for Delivery" />;
      case ORDER_STATUS.RETURNED:
        return <Chip label="Returned" />;
      case ORDER_STATUS.SHIPPED:
        return <Chip label="Shipped" />;
      default:
        return <Chip label="Pending" />;
    }
  };

  return <>{orderStatus}</>;
}
