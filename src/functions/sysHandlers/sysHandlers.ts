import Resizer from "react-image-file-resizer";
import { serverInfoActionCreator } from "../../app/redux/features/systemSlice/systemSlice";
import { getUserNewMessagesActionCreator } from "../../app/redux/features/userSlice/userSlice";
import { AppDispatch } from "../../app/redux/store/store";
import { editMessageThunk } from "../../app/redux/thunks/messageThunk/messageThunk";
import { IMessage } from "../../app/redux/types/message/messageInterfaces";

export function getCurrentDate() {
  let newDate = new Date();

  return `${newDate.toLocaleString()}`;
}
export function handleServerInfo(
  connected: boolean,
  server: string,
  status: string,
  dispatch: void,
) {
  dispatch(
    serverInfoActionCreator({
      connected,
      path: `${server}`,
      status: `${status}`,
    }),
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

export const getUserNewMessages = (
  messages: IMessage[],
  dispatch: void,
): void => {
  const newMessages: IMessage[] = [];
  messages.forEach((message) => {
    if (!message.read) {
      newMessages.push({
        id: message.id,
        idParent: message.idParent,
        idUser: message.idUser,
        idPenguin: message.idPenguin,
        subject: message.subject,
        data: message.data,
        content: message.content,
        read: message.read,
      });
    }
  });
  dispatch(getUserNewMessagesActionCreator(newMessages));
};

export const setMessageRead = (message: IMessage, dispatch: void): void => {
  const newData = { ...message };
  newData.read = !message.read ? true : false;

  dispatch(editMessageThunk(newData, "Finished successfully ."));
};

export const toPascalCase = (strValue: string): string => {
  return strValue.replace(/\w+/g, function (w) {
    return w[0].toUpperCase() + w.slice(1).toLowerCase();
  });
};

export const cleanArray = (array: void) => {
  array = Array.from(new Set(array));
  array = array.filter(function (field: void) {
    return field != null && field !== "" && field !== "undefined";
  });

  return array;
};

export const resizeFile = (file: File): void =>
  new Promise((resolve): void => {
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
      "base64",
    );
  });

export const writeFile = (type: string, data: void) => {
  const element = document.createElement("a");
  let searchParam = {};

  switch (type) {
    case "notifys":
      searchParam = { notifys: data };
      break;
    case "messages":
      searchParam = { messages: data };
      break;
    default:
      searchParam = { penguins: data };
  }
  const textFile = new Blob([JSON.stringify(searchParam)], {
    type: "text/plain",
  });
  element.href = URL.createObjectURL(textFile);
  element.download = `${type}-export.json`;
  document.body.appendChild(element);
  element.click();
};

export const connectedToServer = () => async (dispatch: AppDispatch) => {
  return await fetch(`${import.meta.env.VITE_APP_API_URL}penguins`)
    .then((resp) => {
      if (resp.status === 200) {
        handleServerInfo(
          true,
          `${import.meta.env.VITE_APP_API_URL}`,
          "Connected to server",
          dispatch,
        );
        return true;
      } else {
        handleServerInfo(false, `local`, "Unavailable", dispatch);
        Promise.reject(new Error("Server unavailable"));
        return false;
      }
    })
    .then((): void => {
      handleServerInfo(false, `local`, "Unavailable", dispatch);
      return false;
    })
    .catch(() => {
      handleServerInfo(false, `local`, "Unavailable", dispatch);
      return false;
    });
};
