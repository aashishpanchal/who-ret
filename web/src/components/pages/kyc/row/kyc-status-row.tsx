import { UserKyc } from "@/http/apis/kyc-api";
import { Chip } from "@mui/material";
import { CellContext } from "@tanstack/react-table";

export default function KycStatusRow({
  getValue,
}: CellContext<UserKyc, string>) {
  const value = getValue();
  return (
    <>
      {value === "in process" ? (
        <Chip label="In Process" color="info" />
      ) : value === "accepted" ? (
        <Chip label="Accepted" color="success" />
      ) : (
        <Chip label="Rejected" color="error" />
      )}
    </>
  );
}
