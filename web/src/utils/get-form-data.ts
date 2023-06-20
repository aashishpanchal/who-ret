type OptionsType = {
  key?: string;
  image: File | null;
};

export const getFromData = (data: any, options?: OptionsType) => {
  const formData = new FormData();
  if (options?.image && options?.key)
    formData.append(options.key, options.image);
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return formData;
};
