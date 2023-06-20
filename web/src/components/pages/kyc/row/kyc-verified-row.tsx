import { Chip } from "@mui/material";
import { UserKyc } from "@/http/apis/kyc-api";
import { CellContext } from "@tanstack/react-table";
import { red } from "@mui/material/colors";

export default function KycVerifiedRow({
  getValue,
}: CellContext<UserKyc, boolean>) {
  const value = getValue();
  return (
    <>
      {value ? (
        <Chip
          label="Verified"
          color="success"
          variant="outlined"
          sx={{
            borderWidth: 2,
            fontWeight: 700,
          }}
        />
      ) : (
        <Chip
          label="UnVerified"
          color="error"
          variant="outlined"
          sx={{
            borderWidth: 2,
            fontWeight: 700,
            color: red[500],
            borderColor: red[500],
          }}
        />
      )}
    </>
  );
}
