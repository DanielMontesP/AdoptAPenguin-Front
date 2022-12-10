import { getCurrentDate } from "../../../functions/sysHandlers/sysHandlers";
import { IMessage, INewMessage } from "../types/message/messageInterfaces";

export const blankMessageData: IMessage = {
  id: "",
  idPenguin: "",
  idUser: "",
  subject: "",
  content: "",
  data: "",
  read: false,
};

export const newMessageData = (idUser: string, idPenguin: string): IMessage => {
  const formData = {
    id: "",
    idPenguin,
    idUser,
    subject: "",
    content: "",
    data: getCurrentDate(),
    read: false,
  };
  return formData;
};

export const newReply = (
  idUser: string,
  idPenguin: string,
  subject: string
): INewMessage => {
  const formData = {
    id: "",
    idPenguin,
    idUser,
    content: "",
    subject: "RE: " + { subject },
    data: getCurrentDate(),
    read: false,
  };
  return formData;
};
