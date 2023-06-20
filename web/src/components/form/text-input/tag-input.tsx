import { useState } from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";

type Props = {
  chips: string[];
  setChips: (values: string[]) => void;
  fullWidth?: boolean;
  label?: string;
  TextInputProps?: {
    error?: boolean;
    helperText?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  };
};

export default function ProductSearchTags({
  chips = [],
  setChips,
  fullWidth,
  label,
  TextInputProps,
}: Props) {
  const [text, setText] = useState("");

  const onEnterKey = (key: string) => {
    if (key === "enter") {
      setChips([...chips, text]);
      setText("");
    }
    if (key === "backspace") {
      if (text === "") {
        setChips(chips.filter((_, i) => i !== chips.length - 1));
      }
    }
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      value={chips}
      options={[]}
      size="medium"
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            label={option}
            {...getTagProps({ index })}
            onDelete={() => {
              setChips(chips.filter((_, i) => i !== index));
            }}
          />
        ))
      }
      fullWidth={fullWidth}
      renderInput={(params) => (
        <TextField
          {...params}
          {...TextInputProps}
          label={label}
          size="medium"
          placeholder="Type and press enter"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => onEnterKey(e.key.toLowerCase())}
        />
      )}
      componentsProps={{
        clearIndicator: { onClick: () => setChips([]) },
      }}
    />
  );
}
