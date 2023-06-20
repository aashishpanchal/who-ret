import { Container, Stack, Typography } from "@mui/material";
import {
  AddEditSubCategory,
  SubCategoryDataTable,
} from "@/components/pages/subcategories";
import useUrlQuery from "@/hooks/useUrlQuery";
import { useQuery } from "@tanstack/react-query";
import { getAllSubCategoryFn } from "@/http/apis/category-api";
import { useParams } from "react-router-dom";

type Props = {};

export default function SubCategories({}: Props) {
  const { query } = useUrlQuery();

  const { id: parentId } = useParams();

  const { isLoading, refetch, data } = useQuery({
    queryKey: ["subcategory-list-" + parentId, query],
    queryFn: async () =>
      (await getAllSubCategoryFn(parentId as string, query)).data,
  });

  return (
    <Container className="mt-10">
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Typography variant="h5">SubCategories</Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <AddEditSubCategory
            variant="add"
            refetch={refetch}
            parentId={parentId as string}
          />
        </Stack>
      </Stack>
      <SubCategoryDataTable
        isLoading={isLoading}
        refetch={refetch}
        data={data}
      />
    </Container>
  );
}
