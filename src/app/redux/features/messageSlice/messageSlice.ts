import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../../../redux/types/message/messageInterfaces";

interface SliceIniState {
  allMessages: IMessage[];
  message: IMessage;
}

const initialState: SliceIniState = {
  allMessages: [],
  message: {
    id: "",
    idUser: "",
    idPenguin: "",
    subject: "",
    content: "",
    data: "",
    read: "false",
  },
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    getMessage: (messages, action: PayloadAction<IMessage>): SliceIniState => ({
      ...messages,
      message: action.payload,
    }),

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

    deleteMessage: (
      messages,
      action: PayloadAction<string>
    ): SliceIniState => ({
      ...messages,
      allMessages: messages.allMessages.filter(
        (message) => message.id !== action.payload
      ),
      message: initialState.message,
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
  deleteMessage: deleteMessageActionCreator,
  resetMessage: resetMessageActionCreator,
  resetMessages: resetMessagesActionCreator,
} = messagesSlice.actions;

export default messagesSlice.reducer;
