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
    id: "",
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

    getMessage: (messages, action: PayloadAction<IMessage>): SliceIniState => ({
      ...messages,
      message: action.payload,
    }),

    createMessage: (
      messages,
      action: PayloadAction<IMessage>
    ): SliceIniState => ({
      ...messages,
      message: action.payload,
    }),

    editMessage: (
      messages,
      action: PayloadAction<IMessage>
    ): SliceIniState => ({
      ...messages,
      allMessages: messages.allMessages.map((message) =>
        message.id === action.payload.id
          ? { ...action.payload }
          : { ...message }
      ),
      message: action.payload,
    }),

    resetMessage: (
      messages,
      action: PayloadAction<IMessage>
    ): SliceIniState => ({
      ...messages,
      message: initialState.message,
    }),

    resetMessages: (
      messages,
      action: PayloadAction<IMessage>
    ): SliceIniState => ({
      ...messages,
      allMessages: initialState.allMessages,
    }),
  },
});

export const {
  getMessage: getMessageActionCreator,
  getMessages: getMessagesActionCreator,
  editMessage: editMessageActionCreator,
  createMessage: createMessageActionCreator,
  resetMessage: resetMessageActionCreator,
  resetMessages: resetMessagesActionCreator,
} = messageSlice.actions;

export default messageSlice.reducer;
