import { getCurrentDate } from "../../../functions/sysHandlers/sysHandlers";
import { IMessage } from "../types/message/messageInterfaces";

export const blankMessageData: IMessage = {
  id: "",
  idParent: "",
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
    idParent: "",
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
  idParent: string,
  idUser: string,
  idPenguin: string,
  subject: string
): IMessage => {
  const formData = {
    id: "",
    idParent: idParent,
    idPenguin,
    idUser,
    content: "",
    subject: "RE: " && subject,
    data: getCurrentDate(),
    read: false,
  };
  return formData;
};
