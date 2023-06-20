import {
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function SelectPublic(props: FormControlProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusOption = useMemo(
    () => [
      { label: "All", value: "all" },
      { label: "Public", value: "true" },
      { label: "Draft", value: "false" },
    ],
    []
  );

  const value = useMemo(() => {
    const status = searchParams.get("public");
    if (status) {
      const exist = statusOption.find((p) => p.value === status);
      if (exist) return exist.value;
      return "all";
    }
    return "all";
  }, [searchParams.get("public")]);

  const onChangeStatus = (value: string) => {
    setSearchParams((prev) => {
      prev.set("public", value);
      return prev;
    });
  };

  return (
    <FormControl size="small" {...props}>
      <InputLabel id="public-status">Public Status</InputLabel>
      <Select
        label="select status"
        labelId="public-status"
        value={value}
        onChange={(e) => onChangeStatus(e.target.value)}
      >
        {statusOption.map((item, index) => (
          <MenuItem
            key={index}
            value={item.value}
            selected={item.value === "all"}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
