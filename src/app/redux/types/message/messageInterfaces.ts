export interface IMessage {
  id: string;
  idUser: string;
  idPenguin: string;
  subject: string;
  content: string;
  data: string;
  read: string;
}

export interface blankMessageDataInterface {
  idPenguin: string;
  idUser: string;
  subject: string;
  content: string;
  data: string;
  read: string;
}
