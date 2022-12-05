import { IMessage } from "../app/redux/types/message/messageInterfaces";

export const mockMessage: any = {
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
    idPenguin: "idUser",
    subject: "subject",
    content: "content",
    data: "data",
    read: false,
    id: "id1",
  },
  {
    idUser: "idUser",
    idPenguin: "idPenguin",
    subject: "subject2",
    content: "content2",
    data: "data2",
    read: false,
    id: "id2",
  },
];

export const mockMessagesEmpty: IMessage[] = [
  {
    idUser: "",
    idPenguin: "",
    subject: "",
    content: "",
    data: "",
    read: false,
    id: "",
  },
];
