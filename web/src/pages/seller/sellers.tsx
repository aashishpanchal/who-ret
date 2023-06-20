import { ROLE } from "@/constants";
import { Container } from "@mui/material";
import { UserDataTable } from "@components/pages/users";

type Props = {};

export default function Sellers({}: Props) {
  return (
    <Container className="mt-10">
      <UserDataTable
        role={ROLE.WHOLESELLER}
        placeholder="Search Wholeseller"
        title="Wholeseller List"
      />
    </Container>
  );
}
