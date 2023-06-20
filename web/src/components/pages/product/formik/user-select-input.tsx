import { UsersSelect } from "@/components/common";
import { ROLE } from "@/constants";
import { fieldToTextField, TextFieldProps } from "formik-mui";

export default function UserSelectInput(props: TextFieldProps) {
  const {
    form: { setFieldValue },
    field: { name },
  } = props;

  const { value, onBlur, error, helperText } = fieldToTextField(props);

  return (
    <UsersSelect
      onSelect={(value) => {
        setFieldValue(name, value);
      }}
      role={ROLE.WHOLESELLER}
      value={value}
      error={error}
      helperText={helperText}
      onBlur={onBlur}
    />
  );
}
