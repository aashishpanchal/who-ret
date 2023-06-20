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
import { useMemo, useState } from "react";
import { Field, Formik } from "formik";
import {
  ProductDetailInput,
  ProductPackInput,
  ProductPriceInput,
} from "@/components/pages/product";
import { Switch } from "formik-mui";
import { toast } from "react-toastify";
import LoadingBtn from "@/components/buttons/loading-btn";
import {
  createProductImg,
  getProductFn,
  updateProductFn,
} from "@/http/apis/product-api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ROLE } from "@/constants";
import { alertErrToast } from "@/utils/axios-err-toast";

type Props = {};

export default function EditProduct({}: Props) {
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const [images, setImages] = useState<File[] | null>(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const onBack = () => navigate(-1);

  const { isSuccess, data, refetch } = useQuery({
    queryKey: ["one-product-" + id, id],
    queryFn: async () =>
      (
        await getProductFn(
          id as string,
          `${
            user?.role === ROLE.ADMIN ? ",user" : ""
          },category,subcategory,name,price,expire,description,stock,public,discount,keywords,images,pack`
        )
      ).data,
  });

  const getFormData = () => {
    const formData = new FormData();
    images?.forEach((image) => {
      formData.append("images", image);
    });
    return formData;
  };

  const imageUrls = useMemo(() => {
    if (isSuccess) {
      const { images } = data;
      if (Array.isArray(images)) return images;
      return [];
    }
    return [];
  }, [data]);

  const saveImages = async (productId: string) => {
    if (images && images?.length !== 0) {
      await createProductImg(productId, getFormData());
    }
  };

  return (
    <Container maxWidth="md" className="mt-10">
      <Typography variant="h5">Edit Products</Typography>
      <Formik
        enableReinitialize
        validationSchema={productSchema(user?.role)}
        initialValues={isSuccess ? data : initialValues(user?.role)}
        onSubmit={async (values) => {
          if (values.keywords.length !== 0) {
            try {
              setLoading(true);
              const res = await updateProductFn(id as string, values);
              if (res.data?._id) {
                await saveImages(res.data?._id);
              }
              toast.success("Product Save Successfully");
              onBack();
            } catch (err) {
              alertErrToast(err);
            } finally {
              setLoading(false);
            }
          } else {
            toast.warn("searching keywords is required!");
          }
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <Box className="my-4 flex flex-col space-y-4">
            <ProductDetailInput
              urls={isSuccess ? imageUrls : undefined}
              setImages={setImages}
              refetch={refetch}
              productId={id}
            />
            <ProductPriceInput />
            <ProductPackInput
              values={values as any}
              setFieldValue={setFieldValue}
            />
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
                  Edit Product
                </LoadingBtn>
              </Stack>
            </Stack>
          </Box>
        )}
      </Formik>
    </Container>
  );
}
