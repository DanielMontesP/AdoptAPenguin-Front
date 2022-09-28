import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../../../redux/types/message/messageInterfaces";

interface SliceIniState {
  allMessages: IMessage[];
  message: IMessage;
}

const initialState: SliceIniState = {
  allMessages: [],
  message: {
    idUser: "",
    idPenguin: "",
    subject: "",
    content: "",
    data: "",
    read: false,
  },
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    getMessages: (
      messages,
      action: PayloadAction<IMessage[]>
    ): SliceIniState => ({
      ...messages,
      allMessages: [...action.payload],
    }),

    createMessage: (
      messages,
      action: PayloadAction<IMessage>
    ): SliceIniState => ({
      ...messages,
      message: action.payload,
    }),
  },
});

export const {
  getMessages: getMessagesActionCreator,
  createMessage: createMessageActionCreator,
} = messageSlice.actions;

export default messageSlice.reducer;
