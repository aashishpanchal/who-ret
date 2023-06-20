import { useQuery } from "@tanstack/react-query";
import { AsyncAutocomplete } from "@/components/form";
import { getAllSubCategoryFn } from "@/http/apis/category-api";
import { TextFieldProps } from "@mui/material";

type Props = {
  categoryId: string | null;
  onSelect?: (values: string) => void;
  value: TextFieldProps["value"];
  error: TextFieldProps["error"];
  onBlur: TextFieldProps["onBlur"];
  helperText: TextFieldProps["helperText"];
};

export default function SubCategoriesSelect({
  categoryId,
  onSelect,
  value,
  error,
  helperText,
  onBlur,
}: Props) {
  const { isLoading, data } = useQuery({
    queryKey: ["all-subcategories", categoryId],
    queryFn: async () =>
      (await getAllSubCategoryFn(categoryId ? categoryId : "-1")).data,
  });
  return (
    <AsyncAutocomplete
      id="sub-categories-option"
      loading={isLoading}
      label="SubCategories"
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
