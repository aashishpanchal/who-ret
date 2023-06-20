import { useCallback } from "react";
import {
  PatternFormat,
  PatternFormatProps,
  NumberFormatValues,
} from "react-number-format";
import TextField from "@mui/material/TextField";
import { fieldToTextField, TextFieldProps } from "formik-mui";

type Props = Partial<Omit<PatternFormatProps, "customInput">> & TextFieldProps;

export default function PhoneInput(props: Props) {
  const {
    form: { setFieldValue },
    field: { name },
  } = props;

  const { onChange, ...otherProps } = fieldToTextField(props);

  const onValueChange = useCallback(
    (values: NumberFormatValues) => {
      setFieldValue(name, values.value);
    },
    [setFieldValue, name]
  );

  return (
    <PatternFormat
      format={"+61 (###) ### ###"}
      customInput={TextField}
      onValueChange={onValueChange}
      {...(otherProps as any)}
    />
  );
}
