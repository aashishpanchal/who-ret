import { Field } from "formik";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Switch, TextField } from "formik-mui";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useCallback } from "react";

type Props = {
  values: Partial<{ pack: Array<any> }>;
  setFieldValue: any;
};

export default function ProductPackInput({ values, setFieldValue }: Props) {
  const onAddPack = () =>
    setFieldValue("pack", [
      ...(values?.pack || []),
      { numOfProduct: "", deductionPrice: "", public: true },
    ]);

  const onDeletePack = useCallback(
    (index: number) =>
      setFieldValue(
        "pack",
        values?.pack?.filter((_, i) => i !== index)
      ),
    [values?.pack]
  );

  return (
    <Box className="w-full bg-white p-5 rounded-xl shadow-sm">
      <Typography variant="h6" mb={1}>
        Product Pack
      </Typography>
      <Stack spacing={2}>
        {values?.pack?.map((_, index) => {
          return (
            <Stack
              spacing={2}
              key={index}
              className="p-2 rounded-xl bg-white border"
            >
              <Field
                component={TextField}
                label="Number Of Product *"
                size="medium"
                name={`pack[${index}].numOfProduct`}
                type="number"
              />
              <Field
                component={TextField}
                name={`pack[${index}].deductionPrice`}
                label="Deduction Price *"
                size="medium"
                type="number"
              />
              <Stack direction="row" justifyContent="space-between">
                <FormControlLabel
                  control={
                    <Field
                      type="checkbox"
                      label="Public"
                      name={`pack[${index}].public`}
                      component={Switch}
                    />
                  }
                  label="Public"
                />
                <IconButton size="small" onClick={() => onDeletePack(index)}>
                  <FaTrash />
                </IconButton>
              </Stack>
            </Stack>
          );
        })}
        <Button
          onClick={onAddPack}
          startIcon={<FaPlus />}
          size="small"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Add Pack
        </Button>
      </Stack>
    </Box>
  );
}
