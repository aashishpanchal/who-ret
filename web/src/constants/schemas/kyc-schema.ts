import * as yup from "yup";

export const kycSchema = yup.object({
  user: yup.string().required(),
  abnNumber: yup.string().required(),
  kycStatus: yup.string().required(),
});

export const initialValues = {
  abnNumber: "",
  user: "",
  kycStatus: "",
};
