import { useQuery } from "@tanstack/react-query";
import { AsyncAutocomplete } from "@/components/form";
import { getAllCategoryFn } from "@/http/apis/category-api";
import { TextFieldProps } from "@mui/material";

type Props = {
  onSelect?: (value: string) => void;
  value: TextFieldProps["value"];
  error: TextFieldProps["error"];
  onBlur: TextFieldProps["onBlur"];
  helperText: TextFieldProps["helperText"];
};

export default function CategoriesSelect({
  error,
  helperText,
  onBlur,
  onSelect,
  value,
}: Props) {
  const { isLoading, data } = useQuery({
    queryKey: ["all-category"],
    queryFn: async () => (await getAllCategoryFn()).data,
  });

  return (
    <AsyncAutocomplete
      id="categories-option"
      loading={isLoading}
      label="Categories"
      sx={{ bgcolor: "white" }}
      options={Array.isArray(data) ? data : data?.results || []}
      objFilter={{
        title: "name",
        value: "_id",
      }}
      value={value}
      onChangeOption={onSelect}
      TextInputProps={{
        error,
        helperText,
        onBlur,
      }}
    />
  );
}
