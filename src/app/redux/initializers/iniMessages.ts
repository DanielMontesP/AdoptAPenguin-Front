import { getCurrentDate } from "../../../utils/utils";
import { IMessage } from "../types/message/messageInterfaces";

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
