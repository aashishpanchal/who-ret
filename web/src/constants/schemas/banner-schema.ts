import * as yup from "yup";

export const bannerSchema = yup.object({
  public: yup.string().optional(),
  description: yup.string().optional(),
});

export const initialValues = {
  public: true,
  description: "",
};
