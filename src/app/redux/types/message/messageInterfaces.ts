export interface IMessage {
  id: string;
  idUser: string;
  idPenguin: string;
  subject: string;
  content: string;
  data: string;
  read: boolean;
}

export interface INewMessage {
  id: string;
  idUser: string;
  idPenguin: string;
  data: string;
  subject: string;
  content: string;
}

export interface blankMessageDataInterface {
  idPenguin: string;
  idUser: string;
  subject: string;
  content: string;
  data: string;
  read: boolean;
}
