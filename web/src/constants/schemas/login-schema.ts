import * as yup from "yup";

export const loginSchema = yup.object({
  phone: yup.string().required(),
  password: yup.string().required(),
});

export const initialValues = {
  phone: "",
  password: "",
};
