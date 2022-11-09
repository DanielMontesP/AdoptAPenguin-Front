import { IMessage } from "../app/redux/types/message/messageInterfaces";

export const mockMessage: IMessage = {
  idUser: "idUser",
  idPenguin: "idPenguin",
  subject: "subject",
  content: "content",
  data: "data",
  read: false,
  id: "id",
};

export const mockMessageEmpty: IMessage = {
  idUser: "",
  idPenguin: "",
  subject: "",
  content: "",
  data: "",
  read: false,
  id: "",
};

export const mockMessages: IMessage[] = [
  {
    idUser: "idUser",
    idPenguin: "idPenguin",
    subject: "subject",
    content: "content",
    data: "data",
    read: false,
    id: "id",
  },
];
