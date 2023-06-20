import { useState } from "react";
import { toast } from "react-toastify";
import LoadingBtn from "../buttons/loading-btn";
import { FaFileCsv } from "react-icons/fa";

type Props = {
  downloadFn: Function;
  title: string;
};

export default function CsvTemDownload({ downloadFn, title }: Props) {
  const [loading, setLoading] = useState(false);

  const onExportTem = async () => {
    setLoading(true);
    try {
      const res = await downloadFn();
      import("js-file-download").then(({ default: fileDownload }) =>
        fileDownload(res.data, "product-template.csv")
      );
    } catch (error) {
      toast.error("Csv template download failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <LoadingBtn
      variant="contained"
      size="small"
      color="inherit"
      onClick={onExportTem}
      isLoading={loading}
      startIcon={<FaFileCsv fontSize="small" />}
    >
      {title}
    </LoadingBtn>
  );
}
