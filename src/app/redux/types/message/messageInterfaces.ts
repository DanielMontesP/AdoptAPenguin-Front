export interface IMessage {
  id: string;
  idParent: string;
  idUser: string;
  idPenguin: string;
  subject: string;
  content: string;
  data: string;
  read: boolean;
}

export interface blankMessageDataInterface {
  idPenguin: string;
  idUser: string;
  subject: string;
  content: string;
  data: string;
  read: boolean;
}
