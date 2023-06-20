import { useNavigate } from "react-router-dom";
import AddBtn from "@/components/buttons/add-btn";
import { Container, Stack, Typography } from "@mui/material";
import { ProductDataTable } from "@/components/pages/product";
import { CsvTemDownload, CsvUploadDownload } from "@/components/common";
import { productCvsTemDownload, uploadProductCsv } from "@/http/apis/csv-api";

type Props = {};

export default function Products({}: Props) {
  const navigate = useNavigate();
  const onAdd = () => navigate("add");
  return (
    <Container className="mt-10 overflow-hidden">
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={1}
        justifyContent="space-between"
      >
        <Typography variant="h5">Seller Products</Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <AddBtn onClick={onAdd}>Add Product</AddBtn>
          <CsvTemDownload
            title="Csv Template Download"
            downloadFn={productCvsTemDownload}
          />
          <CsvUploadDownload
            title="Product Csv Upload"
            uploadFn={uploadProductCsv}
          />
        </Stack>
      </Stack>
      <ProductDataTable />
    </Container>
  );
}
