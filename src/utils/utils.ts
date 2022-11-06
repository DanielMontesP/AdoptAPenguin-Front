import { IPenguin } from "../app/redux/types/penguin/penguinInterfaces";
import Resizer from "react-image-file-resizer";
import { IMessage } from "../app/redux/types/message/messageInterfaces";

export function getCurrentDate(separator = "/") {
  let newDate = new Date();

  return `${newDate.toLocaleString()}`;
}

export function hasNewMessages(allMessages: IMessage[], penguin: IPenguin) {
  let countNewMessages = 0;

  allMessages.forEach((message) => {
    if (message.read === false && penguin.id === message.idPenguin) {
      countNewMessages += 1;
    }
  });
  return countNewMessages;
}

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

export const blankMessageData: IMessage = {
  id: "",
  idPenguin: "",
  idUser: "",
  subject: "",
  content: "",
  data: "",
  read: false,
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

export const handleFocus = (field: string): void => {
  const input = document.querySelector(field) as HTMLElement;
  if (input != null) {
    input.focus();
  }
};
