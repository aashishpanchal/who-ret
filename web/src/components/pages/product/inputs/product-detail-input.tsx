import { Field } from "formik";
import { TextField } from "formik-mui";
import { AddProductImage } from "@/components/form/file-input";
import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  CategorySelectInput,
  SubCategorySelectInput,
  UserSelectInput,
} from "../formik";
import { ImageType } from "@/http/apis/type";
import { DeleteAlert } from "@/components/alerts";
import { deleteProductImg } from "@/http/apis/product-api";
import { MdClose } from "react-icons/md";
import IconBtn from "@/components/buttons/icon-btn";

type Props = {
  setImages: any;
  urls?: ImageType[];
  productId?: string;
  refetch?: () => void;
};

export default function ProductDetailsInputs({
  setImages,
  urls,
  productId,
  refetch,
}: Props) {
  return (
    <Box className="w-full bg-white p-5 rounded-xl shadow-sm">
      <Typography variant="h6" mb={1}>
        Product Details
      </Typography>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Field name="category" component={CategorySelectInput} />
          </Grid>
          <Grid item xs={4}>
            <Field name="subcategory" component={SubCategorySelectInput} />
          </Grid>
          <Grid item xs={4}>
            <Field name="user" component={UserSelectInput} />
          </Grid>
        </Grid>
        <Field
          component={TextField}
          label="Product Name"
          size="medium"
          name="name"
          required
        />
        <Field
          component={TextField}
          name="description"
          label="Product Description"
          size="medium"
          multiline
          rows={5}
        />
        <div className="flex flex-col space-y-1">
          <Typography variant="button">Product Images</Typography>
          <AddProductImage
            urls={urls}
            onAddImages={setImages}
            maxInput={6}
            iconsRender={(values, action) => {
              return values._id ? (
                <DeleteAlert
                  callback={refetch}
                  requestFunc={() =>
                    deleteProductImg(productId as string, values._id as string)
                  }
                  toastMsg="Successfully Remove Image"
                  variant="solid"
                >
                  {(onRemove, loading) => (
                    <>
                      <IconBtn
                        size="small"
                        color="inherit"
                        sx={{
                          color: "white",
                          bgcolor: "#15100c6b",
                          ":hover": {
                            color: "white",
                            bgcolor: "#15100ca3",
                          },
                        }}
                        onClick={onRemove}
                        isLoading={loading}
                        Icon={<MdClose />}
                      />
                    </>
                  )}
                </DeleteAlert>
              ) : (
                <IconBtn
                  size="small"
                  color="inherit"
                  sx={{
                    color: "white",
                    bgcolor: "#15100c6b",
                    ":hover": {
                      color: "white",
                      bgcolor: "#15100ca3",
                    },
                  }}
                  onClick={action}
                  Icon={<MdClose />}
                />
              );
            }}
          />
        </div>
      </Stack>
    </Box>
  );
}
