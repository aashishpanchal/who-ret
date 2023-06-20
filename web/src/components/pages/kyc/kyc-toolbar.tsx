import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { SearchInput } from "@/components/form/text-input";
import { useSearchParams } from "react-router-dom";

type Props = {};

export default function KycToolBar({}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusOption = useMemo(
    () => [
      { label: "All", value: "all" },
      { label: "In Process", value: "in process" },
      { label: "Accepted", value: "accepted" },
      { label: "Rejected", value: "rejected" },
    ],
    []
  );

  const kycStatus = useMemo(() => {
    const status = searchParams.get("kycStatus");
    if (status) {
      const exist = statusOption.find((p) => p.value === status);
      if (exist) return exist.value;
      return "all";
    }
    return "all";
  }, [searchParams.get("kycStatus")]);

  const onChangeStatus = (value: string) => {
    setSearchParams((prev) => {
      prev.set("kycStatus", value);
      return prev;
    });
  };

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
        User Kyc List
      </Typography>
      <Stack direction="row" spacing={2}>
        <SearchInput
          size="small"
          label="Search"
          placeholder="search kyc"
          type="number"
        />
        <FormControl size="small">
          <InputLabel id="kyc-status">Status</InputLabel>
          <Select
            label="Kyc Status"
            labelId="kyc-status"
            sx={{ width: 150 }}
            value={kycStatus}
            onChange={(e) => onChangeStatus(e.target.value)}
          >
            {statusOption.map((item, index) => (
              <MenuItem key={index} value={item.value} selected>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
}
