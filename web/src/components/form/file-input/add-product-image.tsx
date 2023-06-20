import boxSvg from "@/assets/box.svg";
import { FILE_SIZE } from "@/constants";
import { MdClose } from "react-icons/md";
import FileUploader from "./file-uploader";
import { getBase64 } from "@/utils/file-base64";
import { Fragment, useEffect, useState } from "react";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";

type Props = {
  urls?: UrlsType[];
  onAddImages: React.Dispatch<React.SetStateAction<File[] | null>>;
  maxInput?: number;
  iconsRender?: (values: UrlsType, action: () => void) => React.ReactNode;
};

type UrlsType = {
  _id: string | null;
  url: string;
};

export default function FilesDragDrop({
  urls = [],
  maxInput = 1,
  onAddImages,
  iconsRender,
}: Props) {
  const [imageUrls, setImageUrls] = useState<UrlsType[]>(urls);

  const handleChange = (files: FileList) => {
    const filesArray = Array.from(files);
    if (imageUrls.length !== 0) {
      const freeSpace = maxInput - imageUrls.length;
      if (freeSpace >= filesArray.length) {
        filesArray.forEach((file) => {
          getBase64(file, (url) => {
            setImageUrls((prev) => [...prev, { _id: null, url }]);
          });
          onAddImages(filesArray);
        });
      } else {
        import("react-toastify").then(({ toast }) =>
          toast.error(`you only upload ${freeSpace} space of images`)
        );
      }
    } else {
      if (filesArray.length <= maxInput) {
        filesArray.forEach((file) => {
          getBase64(file, (url) => {
            setImageUrls((prev) => [...prev, { _id: null, url }]);
          });
          onAddImages(filesArray);
        });
      } else {
        import("react-toastify").then(({ toast }) =>
          toast.error(`you only upload ${maxInput} images`)
        );
      }
    }
  };

  const onRemove = async (index: number) => {
    onAddImages((prev) => {
      if (prev) {
        const i = imageUrls.length - prev?.length;
        return prev.filter((_, j) => i + j !== index);
      }
      return prev;
    });
    setImageUrls(imageUrls.filter((_, i) => i != index));
  };

  useEffect(() => {
    if (urls.length != 0) setImageUrls(urls);
  }, [urls]);

  return (
    <>
      <FileUploader
        multiple={true}
        types={["JPEG", "PNG", "JPG"]}
        handleChange={handleChange}
        maxSize={FILE_SIZE.IMG}
      >
        <Box>
          <label className="flex justify-center px-4 transition bg-[#f6f7f8] border rounded-xl flex-col items-center space-y-1 pb-5 cursor-pointer hover:opacity-75">
            <img src={boxSvg} className="w-40 h-40" />
            <Typography variant="h6">Drop or Select file</Typography>
            <Typography
              variant="subtitle2"
              className="text-gray-500 text-Inter"
            >
              Drop files here or click{" "}
              <span className="text-red-500 underline">browser</span> thorough
              your machine
            </Typography>
          </label>
        </Box>
      </FileUploader>
      <Stack direction="row" spacing={3} marginTop={2}>
        {imageUrls.map((item, index) => (
          <Fragment key={index}>
            <Box className="relative">
              <Avatar
                src={item.url}
                sx={{ width: 70, height: 70, borderRadius: 0.8 }}
              />
              <span className="absolute -top-3 -right-3">
                {iconsRender ? (
                  iconsRender(item, () => onRemove(index))
                ) : (
                  <IconButton
                    size="small"
                    color="inherit"
                    sx={{
                      color: "white",
                      bgcolor: "#15100c6b",
                      ":hover": {
                        color: "white",
                        bgcolor: "#15100ca3",
                      },
                    }}
                    onClick={() => onRemove(index)}
                  >
                    <MdClose />
                  </IconButton>
                )}
              </span>
            </Box>
          </Fragment>
        ))}
      </Stack>
    </>
  );
}
