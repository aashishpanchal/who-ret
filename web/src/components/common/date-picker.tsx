import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";

type Props = {
  label: string;
  urlKey: string;
};

export default function DatePicker({ label, urlKey }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = useMemo(() => {
    return searchParams.get(urlKey) || null;
  }, [searchParams.get(urlKey)]);

  const setValue = (value: string | null) => {
    if (value) {
      setSearchParams((prev) => {
        prev.set(urlKey, value);
        return prev;
      });
    }
  };
  return (
    <MuiDatePicker
      label={label}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
}
