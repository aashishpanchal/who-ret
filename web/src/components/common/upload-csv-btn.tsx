import { useState } from "react";
import { toast } from "react-toastify";
import { FILE_SIZE } from "@/constants";
import { FaUpload } from "react-icons/fa";
import LoadingBtn from "../buttons/loading-btn";
import { FileUploader } from "../form/file-input";
import { alertErrToast } from "@/utils/axios-err-toast";

type Props = {
  uploadFn: Function;
  title: string;
};

export default function CsvUploadDownload({ uploadFn, title }: Props) {
  const [loading, setLoading] = useState(false);

  const onUpload = async (file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("csv", file);
      await uploadFn(formData);
      toast.success("csv upload successfully.");
    } catch (err) {
      alertErrToast(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingBtn
      variant="contained"
      size="small"
      color="inherit"
      isLoading={loading}
      startIcon={<FaUpload fontSize="small" />}
    >
      <FileUploader
        types={["CSV", "csv"]}
        maxSize={FILE_SIZE.CSV}
        multiple={false}
        handleChange={onUpload}
      >
        {title}
      </FileUploader>
    </LoadingBtn>
  );
}
