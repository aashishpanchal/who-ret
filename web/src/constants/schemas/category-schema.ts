import * as yup from "yup";

export const categorySchema = yup.object({
  name: yup.string().required(),
  public: yup.string().optional(),
  description: yup.string().optional(),
});

export const initialValues = {
  name: "",
  public: true,
  description: "",
};
