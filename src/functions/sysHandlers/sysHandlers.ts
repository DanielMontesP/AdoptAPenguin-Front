import Resizer from "react-image-file-resizer";
import { serverInfoActionCreator } from "../../app/redux/features/systemSlice/systemSlice";
import { getUserNewMessagesActionCreator } from "../../app/redux/features/userSlice/userSlice";
import { editMessageThunk } from "../../app/redux/thunks/messageThunk/messageThunk";
import { IMessage } from "../../app/redux/types/message/messageInterfaces";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";

export function getCurrentDate(): string {
  let newDate = new Date();

  return `${newDate.toLocaleString()}`;
}
export function handleServerInfo(
  connected: boolean,
  server: string,
  status: string,
): boolean {
  try {
    serverInfoActionCreator({
      connected,
      path: `${server}`,
      status: `${status}`,
    });

    return true;
  } catch {
    return false;
  }
}

export function hasNewMessages(
  allMessages: IMessage[],
  idPenguin: string,
): number {
  try {
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
    return 0;
  } catch {
    return 0;
  }
}

export const getUserNewMessages = (messages: IMessage[]): boolean => {
  try {
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
    getUserNewMessagesActionCreator(newMessages);
    return true;
  } catch {
    return false;
  }
};

export const setMessageRead = (message: IMessage): boolean => {
  try {
    const newData = { ...message };
    newData.read = !message.read ? true : false;

    editMessageThunk(newData, "Finished successfully .");

    return true;
  } catch {
    return false;
  }
};

export const toPascalCase = (strValue: string): string => {
  return strValue.replace(/\w+/g, function (w) {
    return w[0].toUpperCase() + w.slice(1).toLowerCase();
  });
};

export const cleanArray = (array: string[]): string[] => {
  array = Array.from(new Set(array));
  array = array.filter((field: string) => {
    return field != null && field !== "" && field !== "undefined";
  });

  return array;
};

export const resizeFile = async (file: File): Promise<string> =>
  new Promise((resolve): void => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG,GIF",
      100,
      0,
      (uri) => {
        resolve(uri as string);
      },
      "base64",
    );
  });

export const writeFile = (
  type: string,
  data: IPenguin[] | IMessage[],
): boolean => {
  try {
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
    return true;
  } catch {
    return false;
  }
};

export const connectedToServer = () => async (): Promise<boolean> => {
  return await fetch(`${import.meta.env.VITE_APP_API_URL}penguins`)
    .then((resp) => {
      if (resp.status === 200) {
        handleServerInfo(
          true,
          `${import.meta.env.VITE_APP_API_URL}`,
          "Connected to server",
        );
        return true;
      } else {
        handleServerInfo(false, `local`, "Unavailable");
        Promise.reject(new Error("Server unavailable"));
        return false;
      }
    })
    .then((): boolean => {
      handleServerInfo(false, `local`, "Unavailable");
      return false;
    })
    .catch(() => {
      handleServerInfo(false, `local`, "Unavailable");
      return false;
    });
};
