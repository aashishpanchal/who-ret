import { Stack } from "@mui/material";
import { AddEditCategory } from "./";
import { DeleteAlert } from "@/components/alerts";
import { CellContext } from "@tanstack/react-table";
import { Categories, deleteCategoryFn } from "@/http/apis/category-api";
import IconBtn from "@/components/buttons/icon-btn";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useAppSelector } from "@/redux/hooks";
import { ROLE } from "@/constants";

type Props = CellContext<Categories, any> & {
  refetch: () => void;
};

export default function CategoryAction({ refetch, ...props }: Props) {
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const onSubCategory = () => navigate(props.row.original._id);

  return (
    <Stack direction="row" spacing={2}>
      {user?.role === ROLE.ADMIN && (
        <>
          <AddEditCategory variant={"edit"} {...props} refetch={refetch} />
          <DeleteAlert
            callback={refetch}
            toastMsg="Product successfully deleted"
            requestFunc={() => deleteCategoryFn(props.row.original._id)}
          />
        </>
      )}
      <IconBtn
        title="SubCategory"
        Icon={<FaArrowRight fontSize={16} />}
        onClick={onSubCategory}
      />
    </Stack>
  );
}
