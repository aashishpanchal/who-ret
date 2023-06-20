import { useMemo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { SxProps, TextField, TextFieldProps, Theme } from "@mui/material";
import { HighLightText } from "@/components/common";

export default function AsyncAutocomplete(props: {
  loading?: boolean;
  options: Array<Record<string, any>>;
  objFilter: {
    title: string;
    value: string;
  };
  label: string;
  value?: any;
  id: string;
  onChangeOption?: (value: any, values?: Record<string, any>) => void;
  TextInputProps?: TextFieldProps;
  sx?: SxProps<Theme>;
}) {
  const {
    value: valueOption,
    onChangeOption,
    TextInputProps,
    objFilter,
    options,
    loading,
    label,
    id,
    sx,
  } = props;

  const v = useMemo(() => {
    const a = options.filter(
      (values) => values?.[objFilter.value] === valueOption
    )[0];
    if (a) {
      return a;
    }
    return null;
  }, [valueOption, options]);

  return (
    <Autocomplete
      id={id}
      value={v}
      onChange={(_, n) =>
        onChangeOption?.(n !== null ? n[objFilter.value] : "")
      }
      getOptionLabel={(option) => option[objFilter.title]}
      options={options}
      loading={loading}
      size="small"
      fullWidth
      sx={sx}
      renderInput={(params) => (
        <TextField
          {...params}
          {...TextInputProps}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option, { inputValue }) => (
        <li {...props} key={option[objFilter.value]}>
          <HighLightText
            text={option[objFilter.title]}
            highListText={inputValue}
          />
        </li>
      )}
    />
  );
}
