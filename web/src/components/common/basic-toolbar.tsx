import { PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";
import { SearchInput } from "../form/text-input";

interface Props extends PropsWithChildren {
  title: string;
  placeholder: string;
  className?: string;
}

export default function BasicToolbar({
  children,
  title,
  placeholder,
  className,
}: Props) {
  return (
    <Box
      sx={{
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "flex-start",
      }}
      className="space-y-5 my-5 ml-3 p-2"
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 ${className}`}
      >
        <SearchInput
          size="small"
          label="Search"
          placeholder={placeholder}
          type="text"
        />
        {children}
      </div>
    </Box>
  );
}
