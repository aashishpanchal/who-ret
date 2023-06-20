import { useQuery } from "@tanstack/react-query";
import { AsyncAutocomplete } from "@/components/form";
import { getAllUserFn } from "@/http/apis/user-api";
import { TextFieldProps } from "@mui/material";

type Props = {
  role?: string;
  onSelect?: (values: string) => void;
  value: TextFieldProps["value"];
  error?: TextFieldProps["error"];
  onBlur?: TextFieldProps["onBlur"];
  helperText?: TextFieldProps["helperText"];
};

export default function UsersSelect({
  onSelect,
  value,
  error,
  helperText,
  onBlur,
  role,
}: Props) {
  const { isLoading, data } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () =>
      (await getAllUserFn(role ? `role=${role}` : undefined)).data,
  });
  return (
    <AsyncAutocomplete
      id="users-option"
      loading={isLoading}
      label="Users"
      sx={{ bgcolor: "white" }}
      options={Array.isArray(data) ? data : []}
      objFilter={{
        title: "phone",
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
