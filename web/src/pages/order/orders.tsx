import { Container } from "@mui/material";
import { OrderDataTable } from "@/components/pages/order";

type Props = {};

export default function Orders({}: Props) {
  return (
    <Container className="mt-10">
      <OrderDataTable />
    </Container>
  );
}
