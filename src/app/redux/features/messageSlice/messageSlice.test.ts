import { mockMessage, mockMessages } from "../../../../mocks/messages";
import { mockPenguin, mockPenguins } from "../../../../mocks/penguins";
import { IMessage } from "../../types/message/messageInterfaces";

import penguinReducer, {
  createMessageActionCreator,
  getMessagesActionCreator,
} from "./messageSlice";

interface SliceIniState {
  allMessages: IMessage[];
  message: IMessage;
}

const initialState: SliceIniState = {
  allMessages: mockMessages,
  message: {
    idUser: "idUser",
    idPenguin: "idPenguin",
    subject: "subject",
    content: "content",
    data: "data",
    read: false,
  },
};

describe("Given the getMessagesActionCreator", () => {
  describe("When invoked", () => {
    test("Then the loading ui state should change to true", () => {
      const action = getMessagesActionCreator(mockMessages);
      const loadedState = penguinReducer(
        { allMessages: mockMessages, message: mockMessage },
        action
      );

      expect(loadedState).toEqual(initialState);
    });
  });
});

describe("Given the createPenguinActionCreator", () => {
  describe("When invoked", () => {
    test("Then the load list with new record", () => {
      const action = createMessageActionCreator(mockMessage);
      const loadedState = penguinReducer(
        { allMessages: mockMessages, message: mockMessage },
        action
      );

      expect(loadedState).toEqual(initialState);
    });
  });
});
