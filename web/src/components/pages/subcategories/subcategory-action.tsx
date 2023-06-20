import { Stack } from "@mui/material";
import { AddEditSubCategory } from ".";
import { DeleteAlert } from "@/components/alerts";
import { CellContext } from "@tanstack/react-table";
import { SubCategories, deleteCategoryFn } from "@/http/apis/category-api";

type Props = CellContext<SubCategories, any> & {
  refetch: () => void;
};

export default function SubCategoryAction({ refetch, ...props }: Props) {
  return (
    <Stack direction="row" spacing={2}>
      <AddEditSubCategory
        variant={"edit"}
        {...props}
        refetch={refetch}
        parentId={props.row.original.parent}
      />
      <DeleteAlert
        callback={refetch}
        toastMsg="SubCategory successfully deleted"
        requestFunc={() => deleteCategoryFn(props.row.original._id)}
      />
    </Stack>
  );
}
