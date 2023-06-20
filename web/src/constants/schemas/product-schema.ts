import { ROLE } from "@/constants";
import * as Yup from "yup";

export const productSchema = (role: string) => {
  const obj = {
    name: Yup.string().min(2).max(255).required(),
    category: Yup.string().required(),
    subcategory: Yup.string(),
    mrp: Yup.number().positive().required(),
    stock: Yup.number().positive().required(),
    discount: Yup.number().positive().max(100),
    public: Yup.boolean().optional(),
    pack: Yup.array()
      .optional()
      .of(
        Yup.object({
          deductionPrice: Yup.number()
            .positive("Invalid deduction price")
            .required("Invalid deduction price"),
          numOfProduct: Yup.number()
            .positive("Invalid number of product")
            .required("Invalid number of product"),
          public: Yup.boolean(),
        })
      ),
  };
  return role === ROLE.ADMIN
    ? Yup.object({ ...obj, user: Yup.string().required() })
    : Yup.object(obj);
};

export const initialValues = (role: string) => {
  const obj = {
    name: "",
    mrp: "0",
    expire: "",
    description: "",
    public: true,
    keywords: [],
    category: "",
    stock: "0",
    discount: "0",
    gst: "gst",
    brand: "",
    pack: [{ numOfProduct: "", deductionPrice: "", public: true }],
  };
  return role === ROLE.ADMIN ? { ...obj, user: "" } : obj;
};
