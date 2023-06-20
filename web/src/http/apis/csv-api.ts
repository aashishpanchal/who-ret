import { api } from "../api";

export const productCvsTemDownload = async () =>
  api.get("/csv/product-csv-template", {
    responseType: "blob",
  });

export const uploadProductCsv = (data: any) =>
  api.post(`/csv/product-csv-upload`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
