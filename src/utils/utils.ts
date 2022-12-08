import Resizer from "react-image-file-resizer";
import { serverInfoActionCreator } from "../app/redux/features/systemSlice/systemSlice";
import { getUserNewMessagesActionCreator } from "../app/redux/features/userSlice/userSlice";
import { editMessageThunk } from "../app/redux/thunks/messageThunk/messageThunk";
import {
  IMessage,
  INewMessage,
} from "../app/redux/types/message/messageInterfaces";

export function getCurrentDate(separator = "/") {
  let newDate = new Date();

  return `${newDate.toLocaleString()}`;
}
export function handleServerInfo(
  connected: boolean,
  server: string,
  status: any,
  dispatch: any
) {
  dispatch(
    serverInfoActionCreator({
      connected,
      path: `${server}`,
      status: `${status}`,
    })
  );
}

export function hasNewMessages(allMessages: IMessage[], idPenguin: string) {
  if (allMessages !== undefined) {
    let countNewMessages = 0;

    allMessages.forEach((message) => {
      if (
        !message.read &&
        idPenguin === message.idPenguin &&
        idPenguin !== ""
      ) {
        countNewMessages += 1;
      }
    });
    return countNewMessages;
  }
}

export const getUserNewMessages = (messages: IMessage[], dispatch: any) => {
  const newMessages: INewMessage[] = [];
  messages.forEach((message) => {
    if (!message.read) {
      newMessages.push({
        id: message.id,
        idPenguin: message.idPenguin,
        subject: message.subject,
        data: message.data,
      });
    }
  });
  dispatch(getUserNewMessagesActionCreator(newMessages));
};

export const setMessageRead = (message: IMessage, dispatch: any) => {
  const newData = { ...message };
  newData.read = !message.read ? true : false;

  dispatch(editMessageThunk(newData, "Delete Like."));
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
      "JPEG,GIF",
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

export const writeFile = (type: string, data: any) => {
  const element = document.createElement("a");
  let textFile = new Blob();

  if (type === "penguins") {
    textFile = new Blob([JSON.stringify({ penguins: data })], {
      type: "text/plain",
    });
  } else {
    textFile = new Blob([JSON.stringify({ messages: data })], {
      type: "text/plain",
    });
  }
  element.href = URL.createObjectURL(textFile);
  element.download = `${type}-export.json`;
  document.body.appendChild(element);
  element.click();
};
