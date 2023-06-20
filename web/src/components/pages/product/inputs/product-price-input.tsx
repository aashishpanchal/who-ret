import { Field } from "formik";
import { Select, TextField } from "formik-mui";
import { ProductSearchTags } from "../formik";
import { Box, Grid, MenuItem, Stack, Typography } from "@mui/material";

type Props = {};

export default function ProductPriceInput({}: Props) {
  return (
    <Box className="w-full bg-white p-6 rounded-xl shadow-sm">
      <Typography variant="h6" mb={2}>
        Product Properties
      </Typography>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Field
              component={TextField}
              label="Mrp "
              size="small"
              type="number"
              name="mrp"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              component={TextField}
              name="stock"
              label="Stock "
              size="small"
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              component={TextField}
              name="discount"
              label="Discount "
              size="small"
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              label="Gst "
              labelId="gst-id"
              name="gst"
              component={(props: any) => (
                <Select {...props} formControl={{ fullWidth: true }} />
              )}
              size="small"
              fullWidth
            >
              <MenuItem selected value="gst">
                GST
              </MenuItem>
              <MenuItem value="non gst">Non GST</MenuItem>
            </Field>
          </Grid>
          <Grid item xs={12}>
            <Field
              name="keywords"
              label="Product Searching Tags"
              component={ProductSearchTags}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
