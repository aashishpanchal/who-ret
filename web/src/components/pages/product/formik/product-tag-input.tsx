import { useState } from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { fieldToTextField, TextFieldProps } from "formik-mui";

export default function ProductSearchTags(props: TextFieldProps) {
  const {
    form: { setFieldValue },
    field: { name, value: chips },
  } = props;
  const [text, setText] = useState("");

  const onEnterKey = (key: string) => {
    if (key === "enter") {
      setFieldValue(name, [...chips, text]);
      setText("");
    }
    if (key === "backspace") {
      if (text === "") {
        setFieldValue(
          name,
          chips?.filter((_: any, i: number) => i !== chips.length - 1)
        );
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
              setFieldValue(
                name,
                chips?.filter((_: any, i: number) => i !== index)
              );
            }}
          />
        ))
      }
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          {...fieldToTextField(props)}
          size="medium"
          placeholder="Type and press enter"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => onEnterKey(e.key.toLowerCase())}
        />
      )}
      componentsProps={{
        clearIndicator: { onClick: () => setFieldValue(name, []) },
      }}
    />
  );
}
