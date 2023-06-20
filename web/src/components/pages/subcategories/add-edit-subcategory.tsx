import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import { Field, Formik } from "formik";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { Switch, TextField } from "formik-mui";
import { CellContext } from "@tanstack/react-table";
import IconBtn from "@/components/buttons/icon-btn";
import { getFromData } from "@/utils/get-form-data";
import { alertErrToast } from "@/utils/axios-err-toast";
import LoadingBtn from "@/components/buttons/loading-btn";
import { ImageInput } from "@/components/form/file-input";
import {
  SubCategories,
  createSubCategoryFn,
  updateSubCategoryFn,
} from "@/http/apis/category-api";
import {
  categorySchema,
  initialValues,
} from "@/constants/schemas/category-schema";
import AddBtn from "@/components/buttons/add-btn";

type Props = Partial<CellContext<SubCategories, any>> & {
  variant: "add" | "edit";
  refetch: () => void;
  parentId: string;
};

export default function AddEditSubCategory({
  row,
  variant,
  parentId,
  refetch,
}: Props) {
  const originalValues = row?.original;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const onClose = () => setOpen(false);

  const onOpen = () => setOpen(true);

  return (
    <>
      {variant === "add" ? (
        <AddBtn onClick={onOpen}>Add New SubCategory</AddBtn>
      ) : (
        <IconBtn
          title="Edit"
          Icon={<FaEdit fontSize={16} />}
          onClick={onOpen}
          isLoading={loading}
        />
      )}
      <Dialog open={open} fullWidth maxWidth="xs" sx={{ padding: 2 }}>
        <Formik
          initialValues={
            variant === "add"
              ? initialValues
              : {
                  name: originalValues?.name || "",
                  description: originalValues?.description || "",
                  public: originalValues?.public || false,
                }
          }
          enableReinitialize
          validationSchema={categorySchema}
          onSubmit={async (values) => {
            const data = getFromData(values, { image, key: "image" });
            try {
              setLoading(true);
              if (variant === "edit" && originalValues?._id)
                await updateSubCategoryFn(parentId, originalValues?._id, data);
              else await createSubCategoryFn(parentId, data);
              onClose();
              await refetch();
              toast.success(
                variant === "edit"
                  ? "subcategory update successfully."
                  : "subcategory add successfully."
              );
            } catch (err: any) {
              alertErrToast(err);
            } finally {
              setLoading(false);
            }
          }}
        >
          {(formik) => (
            <>
              <DialogTitle>
                {variant === "add" ? "Add New SubCategory" : "Edit Category"}
              </DialogTitle>
              <DialogContent>
                <Box className="flex space-y-4 flex-col px-3 my-3 overflow-hidden">
                  <ImageInput
                    url={originalValues?.thumbnail?.url}
                    onChangeImage={setImage}
                  />
                  <Field
                    component={TextField}
                    required
                    size="small"
                    type="text"
                    id="subcategory-name"
                    label="SubCategory Name "
                    name="name"
                    autoComplete="name"
                    placeholder="ex: hair care"
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    component={TextField}
                    required
                    size="small"
                    type="text"
                    id="subcategory-description"
                    label="SubCategory Description "
                    name="description"
                    placeholder="ex: this is subcategory icon"
                    variant="outlined"
                    multiline
                    rows={5}
                    fullWidth
                  />
                  <FormControlLabel
                    control={
                      <Field
                        type="checkbox"
                        label="Public"
                        name="public"
                        component={Switch}
                      />
                    }
                    label="Public"
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <LoadingBtn
                  onClick={onClose}
                  variant="outlined"
                  size="small"
                  disabled={loading}
                >
                  Cancel
                </LoadingBtn>
                <LoadingBtn
                  variant="contained"
                  size="small"
                  onClick={formik.handleSubmit as any}
                  isLoading={loading}
                  sx={{ textTransform: "capitalize" }}
                >
                  {variant}
                </LoadingBtn>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
