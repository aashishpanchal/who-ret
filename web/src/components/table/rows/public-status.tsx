import { Chip } from "@mui/material";
import { CellContext } from "@tanstack/react-table";

export default function DateFormat({ getValue }: CellContext<any, boolean>) {
  const value = getValue();
  return (
    <>
      {value ? (
        <Chip label="Public" color="secondary" />
      ) : (
        <Chip label="Draft" color="error" />
      )}
    </>
  );
}
