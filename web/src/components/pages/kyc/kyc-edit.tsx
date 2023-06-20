import IconBtn from "@/components/buttons/icon-btn";
import LoadingBtn from "@/components/buttons/loading-btn";
import { UsersSelect } from "@/components/common";
import { kycSchema } from "@/constants/schemas/kyc-schema";
import { UserKyc, updateKycFn } from "@/http/apis/kyc-api";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import { CellContext } from "@tanstack/react-table";
import { Field, Formik } from "formik";
import { TextField, Select } from "formik-mui";
import { useMemo, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

type Props = CellContext<UserKyc, any> & {
  refetch: () => void;
};

export default function KycAddEdit({ row, refetch }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const statusOption = useMemo(
    () => [
      { label: "In Process", value: "in process" },
      { label: "Accepted", value: "accepted" },
      { label: "Rejected", value: "rejected" },
    ],
    []
  );

  const onClose = () => setOpen(false);

  const onOpen = () => setOpen(true);

  return (
    <>
      <IconBtn title="Edit" Icon={<FaEdit fontSize={16} />} onClick={onOpen} />
      <Formik
        initialValues={{
          user: row.original.user._id || "",
          abnNumber: row.original.abnNumber || "",
          kycStatus: row.original.kycStatus || "",
        }}
        enableReinitialize
        validationSchema={kycSchema}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            await updateKycFn(row.original._id, values);
            await refetch();
            onClose();
            toast.success("Kyc Update Successfully.");
          } catch (error) {
            toast.error("Kyc Update Failed.");
          } finally {
            setLoading(false);
          }
        }}
      >
        {(formik) => (
          <>
            <Dialog open={open} maxWidth={"lg"} sx={{ padding: 2 }}>
              <DialogTitle>Edit Kyc</DialogTitle>
              <DialogContent>
                <Box className="flex space-y-4 flex-col my-3 mx-2">
                  <Field
                    component={TextField}
                    required
                    size="small"
                    type="text"
                    id="abn-number"
                    label="Abn Number "
                    name="abnNumber"
                    autoComplete="abnNumber"
                    placeholder="Enter ABN Number"
                    variant="outlined"
                    fullWidth
                  />
                  <UsersSelect
                    value={formik.values?.user}
                    onSelect={(value) => formik.setFieldValue("user", value)}
                    error={
                      formik.errors["user"] && formik.touched["user"]
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched["user"] ? formik.errors["user"] : ""
                    }
                    onBlur={formik.handleBlur}
                  />
                  <Field
                    fullWidth
                    label="Kyc Status "
                    labelId="kyc-status"
                    name="kycStatus"
                    component={Select}
                    size="small"
                  >
                    {statusOption.map((item, index) => (
                      <MenuItem key={index} value={item.value} selected>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Field>
                </Box>
              </DialogContent>
              <DialogActions>
                <LoadingBtn
                  onClick={onClose}
                  variant="outlined"
                  size="small"
                  disabled={loading}
                >
                  Cancel
                </LoadingBtn>
                <LoadingBtn
                  variant="contained"
                  size="small"
                  onClick={formik.handleSubmit as any}
                  isLoading={loading}
                >
                  Update
                </LoadingBtn>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Formik>
    </>
  );
}
