import { IMessage } from "../app/redux/types/message/messageInterfaces";

export const mockMessage: IMessage = {
  idUser: "idUser",
  idPenguin: "idPenguin",
  subject: "subject",
  content: "content",
  data: "data",
  read: false,
};

export const mockMessages: IMessage[] = [
  {
    idUser: "idUser",
    idPenguin: "idPenguin",
    subject: "subject",
    content: "content",
    data: "data",
    read: false,
  },
];
