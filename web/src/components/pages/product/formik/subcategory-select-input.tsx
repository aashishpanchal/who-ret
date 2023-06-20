import { SubCategoriesSelect } from "@/components/common";
import { fieldToTextField, TextFieldProps } from "formik-mui";

export default function SubCategorySelectInput(props: TextFieldProps) {
  const {
    form: { setFieldValue, values },
    field: { name },
  } = props;

  const { value, onBlur, error, helperText } = fieldToTextField(props);

  return (
    <SubCategoriesSelect
      onSelect={(value) => {
        setFieldValue(name, value);
      }}
      value={value}
      categoryId={values?.category}
      error={error}
      helperText={helperText}
      onBlur={onBlur}
    />
  );
}
