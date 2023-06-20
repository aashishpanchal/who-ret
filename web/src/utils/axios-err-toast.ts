import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const alertErrToast = (err: any) => {
  const error: AxiosError<any> = err;
  if (!error.response) {
    return toast.error("Internal Server Error.");
  }
  const {
    data: { message },
  } = error.response;
  toast.error(Array.isArray(message) ? message.join(",") : message);
};
