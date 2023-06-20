import { Container, Stack, Typography } from "@mui/material";
import {
  AddEditCategory,
  CategoryDataTable,
} from "@/components/pages/categories";
import useUrlQuery from "@/hooks/useUrlQuery";
import { useQuery } from "@tanstack/react-query";
import { getAllCategoryFn } from "@/http/apis/category-api";

type Props = {};

export default function Categories({}: Props) {
  const { query } = useUrlQuery();

  const { isLoading, refetch, data } = useQuery({
    queryKey: ["category-list", query],
    queryFn: async () => (await getAllCategoryFn(query)).data,
  });

  return (
    <Container className="mt-10">
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Typography variant="h5">Categories</Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <AddEditCategory variant="add" refetch={refetch} />
        </Stack>
      </Stack>
      <CategoryDataTable isLoading={isLoading} refetch={refetch} data={data} />
    </Container>
  );
}
