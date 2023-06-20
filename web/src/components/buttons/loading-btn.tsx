import { CircularProgress } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";

interface Props extends ButtonProps {
  isLoading?: boolean;
}

export default function LoadingBtn({ isLoading, ...props }: Props) {
  return (
    <Button
      {...props}
      startIcon={
        isLoading ? (
          <CircularProgress size={24} sx={{ color: "gray" }} />
        ) : (
          props.startIcon
        )
      }
      disabled={isLoading}
    >
      {props.children}
    </Button>
  );
}
