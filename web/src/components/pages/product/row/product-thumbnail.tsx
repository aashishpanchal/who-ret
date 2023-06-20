import { CellContext } from "@tanstack/react-table";
import { UserProductType } from "@/http/apis/product-api";
import { Avatar, Stack, Typography } from "@mui/material";

export default function ProductThumbnail({
  row,
}: CellContext<UserProductType, unknown>) {
  const url = row.original?.images?.[0]?.url;
  const name = row.original?.name;
  return (
    <Stack className="bg-white" direction="row" alignItems="center" spacing={1}>
      <Avatar
        src={url}
        sx={{
          width: 50,
          height: 50,
          borderRadius: 0.5,
        }}
      />
      <Typography className="capitalize underline" variant="subtitle2">
        {name}
      </Typography>
    </Stack>
  );
}
