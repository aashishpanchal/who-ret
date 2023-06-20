import { FaPlus } from "react-icons/fa";
import Button, { ButtonProps } from "@mui/material/Button";

interface Props extends ButtonProps {
  isLoading?: boolean;
}

export default function AddBtn({ isLoading, ...props }: Props) {
  return (
    <Button
      variant="contained"
      size="small"
      color="inherit"
      {...props}
      startIcon={<FaPlus size={20} sx={{ color: "gray" }} />}
    >
      {props.children}
    </Button>
  );
}
