import { UserRegister } from "../app/redux/types/userInterfaces/userInterfaces";

export const mockUserLogin: UserRegister = {
  username: "user1xxx",
  password: "user1xxx",
};

export const mockUser = {
  id: "idUser",
  username: "user1xxx",
  password: "user1",
};

export const mockloggedUser = {
  name: "test1",
  username: "test1",
  isAdmin: false,
  logged: true,
  id: "idUser",
  image: "",
  allMessages: [],
  newMessages: [],
};

export const mocklogOutUser = {
  name: "test1",
  username: "test1",
  isAdmin: false,
  logged: false,
  id: "idUser",
  image: "",
  allMessages: [],
  newMessages: [],
};
