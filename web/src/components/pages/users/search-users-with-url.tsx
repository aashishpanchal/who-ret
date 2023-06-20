import { UsersSelect } from "@/components/common";
import { useSearchParams } from "react-router-dom";
import { ComponentProps, useMemo } from "react";
import { Box } from "@mui/material";

type Props = Omit<ComponentProps<typeof UsersSelect>, "value"> & {
  className?: string;
};

export default function SearchUsersWithUrl({ role, className }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = useMemo(() => {
    return searchParams.get("user") || "";
  }, [searchParams]);

  const onSelect = (value: string) =>
    setSearchParams((prev) => {
      prev.set("user", value);
      return prev;
    });

  return (
    <Box className={`w-full ${className}`}>
      <UsersSelect value={value} onSelect={onSelect} role={role} />
    </Box>
  );
}
