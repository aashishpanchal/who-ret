import Avatar from "@mui/material/Avatar";
import { ImageType } from "@/http/apis/type";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Box } from "@mui/material";

type Props = {
  urls: Array<ImageType>;
};

export default function ImagesAvatar({ urls }: Props) {
  return (
    <Box className="flex items-center justify-center">
      <AvatarGroup max={2}>
        {urls.map((value, index) => (
          <Avatar key={index} alt="Images" src={value.url} />
        ))}
      </AvatarGroup>
    </Box>
  );
}
