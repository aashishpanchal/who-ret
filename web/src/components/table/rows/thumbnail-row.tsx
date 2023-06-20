import { ImageType } from "@/http/apis/type";
import { Avatar, Stack } from "@mui/material";
import { CellContext } from "@tanstack/react-table";

export default function ThumbnailRow({
  getValue,
}: CellContext<any, ImageType>) {
  const url = getValue()?.url;

  return (
    <Stack className="bg-white" direction="row" alignItems="center">
      <Avatar
        src={url}
        sx={{
          width: 50,
          height: 50,
          borderRadius: 0.5,
        }}
      />
    </Stack>
  );
}
