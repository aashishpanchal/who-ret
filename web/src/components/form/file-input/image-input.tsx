import { FILE_SIZE } from "@/constants";
import { FaPlus } from "react-icons/fa";
import FileUploader from "./file-uploader";
import { useState, useEffect } from "react";
import { Avatar, Box, Button } from "@mui/material";
import { getBase64 } from "@/utils/file-base64";

type Props = {
  onChangeImage: (file: File) => void;
  url?: string;
};

const ImageInput: React.FC<Props> = ({ onChangeImage, url = "" }) => {
  const [imageUrl, setImageUrl] = useState<string>(url);

  const handleChange = (file: File) => {
    if (file) {
      getBase64(file, (url) => {
        setImageUrl(url);
      });
      onChangeImage(file);
    }
  };

  useEffect(() => {
    setImageUrl(url);
  }, [url]);

  return (
    <Box className="flex flex-col items-center space-y-2">
      <Avatar
        sx={{
          borderRadius: 0.8,
          width: 150,
          height: 150,
        }}
        src={imageUrl || "https://via.placeholder.com/150"}
      />
      <FileUploader
        multiple={false}
        maxSize={FILE_SIZE.IMG}
        handleChange={handleChange}
        types={["JPEG", "PNG", "JPG"]}
      >
        <Button
          variant="contained"
          color="inherit"
          className="border"
          startIcon={<FaPlus fontSize="small" />}
        >
          Select Image
        </Button>
      </FileUploader>
    </Box>
  );
};

export default ImageInput;
