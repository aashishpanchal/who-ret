import {
  InputAdornment,
  TextField,
  SvgIcon,
  TextFieldProps,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

export default function SearchInput(props: TextFieldProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const onChangeSearch = (text: string) => {
    setSearchParams((prev) => {
      prev.set("search", text);
      return prev;
    });
  };

  return (
    <TextField
      value={search}
      onChange={(e) => onChangeSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <FaSearch />
            </SvgIcon>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}
