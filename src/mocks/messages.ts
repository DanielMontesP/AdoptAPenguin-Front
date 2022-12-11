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
  id: "",
  idParent: "",
  idUser: "",
  idPenguin: "",
  subject: "",
  content: "",
  data: "",
  read: false,
};

export const mockMessages: IMessage[] = [
  {
    id: "id1",
    idParent: "",
    idUser: "idUser",
    idPenguin: "idUser",
    subject: "subject",
    content: "content",
    data: "data",
    read: false,
  },
  {
    id: "id2",
    idParent: "",
    idUser: "idUser",
    idPenguin: "idPenguin",
    subject: "subject2",
    content: "content2",
    data: "data2",
    read: false,
  },
];

export const mockMessagesEmpty: IMessage[] = [
  {
    id: "",
    idParent: "",
    idUser: "",
    idPenguin: "",
    subject: "",
    content: "",
    data: "",
    read: false,
  },
];
