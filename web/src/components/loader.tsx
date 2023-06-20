import { Box, CircularProgress } from "@mui/material";

type Props = {};

export default function Loader({}: Props) {
  return (
    <Box className="w-screen h-screen flex items-center justify-center">
      <CircularProgress />
    </Box>
  );
}
