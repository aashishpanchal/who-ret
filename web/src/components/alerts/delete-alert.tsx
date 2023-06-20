import { useState } from "react";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import IconBtn from "../buttons/icon-btn";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { DialogContent, DialogContentText } from "@mui/material";

type Props = {
  requestFunc: Function;
  callback?: () => void;
  toastMsg: string;
  variant?: string;
  children?: (onRemove: () => void, loading: boolean) => JSX.Element;
};

export default function DeleteAlert({
  requestFunc,
  toastMsg,
  callback,
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClose = () => setOpen(false);

  const onOpen = () => setOpen(true);

  const onDelete = async () => {
    onClose();
    try {
      setLoading(true);
      await requestFunc();
      callback?.();
      toast.success(toastMsg);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {children ? (
        children(onOpen, loading)
      ) : (
        <IconBtn
          title="Delete"
          Icon={<FaTrash fontSize="small" />}
          onClick={onOpen}
          isLoading={loading}
        />
      )}
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={onClose}
      >
        <DialogTitle id="draggable-dialog-title">Delete Record!</DialogTitle>
        <DialogContent>
          <DialogContentText fontWeight={"600"}>
            Are you sure delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDelete} variant="contained" size="small">
            Ok
          </Button>
          <Button autoFocus onClick={onClose} variant="outlined" size="small">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
