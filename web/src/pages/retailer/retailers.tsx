import { ROLE } from "@/constants";
import { Container } from "@mui/material";
import { UserDataTable } from "@components/pages/users";

type Props = {};

export default function Retailers({}: Props) {
  return (
    <Container className="mt-10">
      <UserDataTable
        role={ROLE.RETAILER}
        placeholder="Search Retailer"
        title="Retailer List"
      />
    </Container>
  );
}
