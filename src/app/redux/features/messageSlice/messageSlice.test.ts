import { mockMessage, mockMessages } from "../../../../mocks/messages";
import {
  mockEmptyDataPenguin,
  mockPenguinsEmpty,
} from "../../../../mocks/penguins";
import { IMessage } from "../../types/message/messageInterfaces";

import penguinReducer, {
  createMessageActionCreator,
  deleteMessageActionCreator,
  editMessageActionCreator,
  getMessageActionCreator,
  getMessagesActionCreator,
  resetMessageActionCreator,
  resetMessagesActionCreator,
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
    id: "id",
  },
};

describe("Given the getMessagesActionCreator", () => {
  describe("When invoked", () => {
    test("Then load list with messages", () => {
      const action = getMessagesActionCreator(mockMessages);
      const loadedState = penguinReducer(
        { allMessages: mockMessages, message: mockMessage },
        action
      );

      expect(loadedState.allMessages).toEqual(mockMessages);
    });
  });
});

describe("Given the getMessageActionCreator", () => {
  describe("When invoked", () => {
    test("Then the loading ui state should change to true", () => {
      const action = getMessageActionCreator(mockMessage);
      const loadedState = penguinReducer(
        { allMessages: mockMessages, message: mockMessage },
        action
      );

      expect(loadedState).toEqual(initialState);
    });
  });
});

describe("Given the editMessageActionCreator", () => {
  describe("When invoked", () => {
    test("Then the loading ui state should change to true", () => {
      const action = editMessageActionCreator(mockMessage);
      const loadedState = penguinReducer(
        { allMessages: mockMessages, message: mockMessage },
        action
      );

      expect(loadedState).toEqual({
        allMessages: mockMessages,
        message: mockMessage,
      });
    });
  });
});

describe("Given the resetMessageActionCreator", () => {
  describe("When invoked", () => {
    test("Then rest message data", () => {
      const action = resetMessageActionCreator(mockMessage);
      const loadedState = penguinReducer(
        { allMessages: mockMessages, message: mockMessage },
        action
      );

      expect(loadedState.message.id).toBe("");
    });
  });
});

describe("Given resetPenguinsActionCreator", () => {
  describe("When  invoked", () => {
    test("Then load list with no messages", async () => {
      const action = resetMessagesActionCreator(mockMessage);
      const loadedState = penguinReducer(
        { allMessages: mockMessages, message: mockMessage },
        action
      );

      expect(loadedState.allMessages.length).toEqual(0);
    });
  });
});

describe("Given deletePenguinActionCreator", () => {
  describe("When  invoked", () => {
    test("Then load list without deleted penguin", async () => {
      const action = deleteMessageActionCreator(mockMessage.id);
      const loadedState = penguinReducer(
        { allMessages: mockMessages, message: mockMessage },
        action
      );

      expect(loadedState.allMessages.length).toEqual(0);
    });
  });
});

describe("Given the createPenguinActionCreator", () => {
  describe("When invoked", () => {
    test("Then the load list with new penguin", () => {
      const action = createMessageActionCreator(mockMessage);
      const loadedState = penguinReducer(
        { allMessages: mockMessages, message: mockMessage },
        action
      );

      expect(loadedState).toEqual(initialState);
    });
  });
});
