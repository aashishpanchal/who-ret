import { Typography, TypographyProps } from "@mui/material";
import dayjs from "dayjs";

type Props = {
  value: string;
  format?: string;
} & TypographyProps;

export default function DateFormat({
  value,
  format = "DD/MM/YYYY",
  ...props
}: Props) {
  return (
    <Typography variant="subtitle2" {...props}>
      {dayjs(value).format(format)}
    </Typography>
  );
}
