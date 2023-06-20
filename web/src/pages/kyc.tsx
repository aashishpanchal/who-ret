import { Container } from "@mui/material";
import { KycDataTable } from "@components/pages/kyc";

type Props = {};

export default function Kyc({}: Props) {
  return (
    <Container className="mt-10">
      <KycDataTable />
    </Container>
  );
}
