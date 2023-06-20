import { FileUploader as ReactFileUploader } from "react-drag-drop-files";

const FileUploader: React.FC<{
  types?: string[];
  multiple?: boolean;
  handleChange?: (file: any) => void;
  maxSize?: number;
  children?: React.ReactNode;
}> = ({ handleChange, maxSize, multiple, types, children, ...other }) => {
  const typeError = (value: string) =>
    import("react-toastify").then(({ toast }) =>
      toast.error(
        types ? `You can only upload ${types.join("/")} file!` : value
      )
    );

  const sizeError = (value: string) =>
    import("react-toastify").then(({ toast }) =>
      toast.error(maxSize ? `Image must smaller than ${maxSize}MB!` : value)
    );

  return (
    <ReactFileUploader
      multiple={multiple}
      types={types}
      onTypeError={typeError}
      onSizeError={sizeError}
      maxSize={maxSize}
      handleChange={handleChange}
      {...other}
    >
      {children}
    </ReactFileUploader>
  );
};

export default FileUploader;
