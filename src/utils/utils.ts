import { IPenguin } from "../app/redux/types/penguin/penguinInterfaces";
import Resizer from "react-image-file-resizer";

export const blankFormData: IPenguin = {
  id: "",
  name: "",
  category: "",
  likers: [] || "",
  likes: 0,
  favs: [] || "",
  description: "",
  image: "",
  imageBackup: "",
  imageResized: "",
};

export const toPascalCase = (strValue: string) => {
  return strValue.replace(/\w+/g, function (w) {
    return w[0].toUpperCase() + w.slice(1).toLowerCase();
  });
};

export const cleanArray = (array: any): any => {
  array = Array.from(new Set(array));
  array = array.filter(function (field: any) {
    return field != null && field !== "" && field !== "undefined";
  });

  return array;
};

export const resizeFile = (file: File) =>
  new Promise((resolve): any => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
