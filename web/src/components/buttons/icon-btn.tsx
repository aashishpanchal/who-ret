import {
  CircularProgress,
  IconButton,
  IconButtonProps,
  Tooltip,
} from "@mui/material";

type Props = {
  title?: string;
  Icon: React.ReactNode;
  isLoading?: boolean;
} & IconButtonProps;

export default function IconBtn({ Icon, title, isLoading, ...props }: Props) {
  return (
    <Tooltip title={title}>
      <IconButton size="small" color="default" disabled={isLoading} {...props}>
        {isLoading ? <CircularProgress size={18} color="secondary" /> : Icon}
      </IconButton>
    </Tooltip>
  );
}
