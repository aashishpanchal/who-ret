import { CategoriesSelect } from "@/components/common";
import { fieldToTextField, TextFieldProps } from "formik-mui";

export default function CategorySelectInput(props: TextFieldProps) {
  const {
    form: { setFieldValue },
    field: { name },
  } = props;

  const { value, onBlur, error, helperText } = fieldToTextField(props);

  return (
    <CategoriesSelect
      onSelect={(value) => {
        setFieldValue(name, value);
        setFieldValue("subcategory", "");
      }}
      value={value}
      error={error}
      helperText={helperText}
      onBlur={onBlur}
    />
  );
}
