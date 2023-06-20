import {
  initialValues,
  productSchema,
} from "@/constants/schemas/product-schema";
import { useAppSelector } from "@/redux/hooks";
import {
  Container,
  Typography,
  Box,
  Stack,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import { Field, Formik } from "formik";
import {
  ProductDetailInput,
  ProductPackInput,
  ProductPriceInput,
} from "@/components/pages/product";
import { Switch } from "formik-mui";
import { toast } from "react-toastify";
import LoadingBtn from "@/components/buttons/loading-btn";
import { createProductFn, createProductImg } from "@/http/apis/product-api";
import { useNavigate } from "react-router-dom";
import { alertErrToast } from "@/utils/axios-err-toast";

type Props = {};

export default function AddProduct({}: Props) {
  const [images, setImages] = useState<File[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const onBack = () => navigate(-1);

  const getFormData = () => {
    const formData = new FormData();
    images?.forEach((image) => {
      formData.append("images", image);
    });
    return formData;
  };

  const saveImages = async (productId: string) => {
    if (images && images?.length !== 0) {
      await createProductImg(productId, getFormData());
    }
  };

  return (
    <Container maxWidth="md" className="mt-10">
      <Typography variant="h5">Create New Products</Typography>
      <Formik
        initialValues={initialValues(user?.role)}
        validationSchema={productSchema(user?.role)}
        onSubmit={async (values) => {
          if (values.keywords.length !== 0) {
            try {
              setLoading(false);
              const res = await createProductFn(values);
              if (res.data?._id) {
                await saveImages(res.data?._id);
              }
              toast.success("Product Save Successfully");
              onBack();
            } catch (err) {
              alertErrToast(err);
            } finally {
              setLoading(true);
            }
          } else {
            toast.warn("searching keywords is required!");
          }
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <Box className="my-4 flex flex-col space-y-4">
            <ProductDetailInput setImages={setImages} />
            <ProductPriceInput />
            <ProductPackInput values={values} setFieldValue={setFieldValue} />
            <Stack direction="row" justifyContent="space-between">
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
              <Stack direction="row" spacing={2}>
                <LoadingBtn
                  variant="outlined"
                  color="inherit"
                  size="small"
                  onClick={onBack}
                >
                  Back
                </LoadingBtn>
                <LoadingBtn
                  variant="contained"
                  size="small"
                  onClick={handleSubmit as any}
                  isLoading={loading}
                >
                  Create Product
                </LoadingBtn>
              </Stack>
            </Stack>
          </Box>
        )}
      </Formik>
    </Container>
  );
}
