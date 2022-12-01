import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../../types/message/messageInterfaces";
import { UserInfo, UserState } from "../../types/userInterfaces/userInterfaces";

interface SliceIniState {
  id: string;
  username: string;
  logged: boolean;
  isAdmin: boolean;
  image: string;
  allMessages: IMessage[];
}

const initialState: SliceIniState = {
  id: "",
  username: "",
  logged: localStorage.getItem("token") ? true : false,
  isAdmin: false,
  image: "",
  allMessages: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    login: (user: UserInfo, action: PayloadAction<UserInfo>) => ({
      ...user,
      username: action.payload.username,
      isAdmin: action.payload.isAdmin,
      id: action.payload.id,
      logged: true,
    }),

    logout: () => ({
      id: "",
      name: "",
      username: "",
      isAdmin: false,
      logged: false,
      image: "",
      allMessages: [],
    }),

    loadUserData: (user: UserState, action: PayloadAction<UserInfo>) => ({
      id: action.payload.id,
      name: action.payload.username,
      username: action.payload.username,
      isAdmin: action.payload.isAdmin,
      logged: true,
      image: action.payload.image,
      allMessages: action.payload.allMessages,
    }),

    editUser: (user: UserState, action: PayloadAction<UserInfo>) => ({
      ...action.payload,
    }),
    createUser: (user: UserState, action: PayloadAction<UserInfo>) => ({
      ...action.payload,
    }),
    getUserMessages: (messages, action: PayloadAction<IMessage[]>) => ({
      ...messages,
      allMessages: [...action.payload],
    }),
  },
});

export const {
  login: logInActionCreator,
  logout: logOutActionCreator,
  editUser: editUserActionCreator,
  loadUserData: loadUserDataActionCreator,
  createUser: createUserDataActionCreator,
  getUserMessages: getUserMessagesActionCreator,
} = userSlice.actions;

export default userSlice.reducer;
