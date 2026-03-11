import { mockMessage, mockMessages } from "../../../../mocks/messages";
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
  message: mockMessage,
};

describe("Given the getMessagesActionCreator", (): void => {
  describe("When invoked", (): void => {
    test("Then load list with messages", (): void => {
      const action = getMessagesActionCreator(mockMessages);
      const loadedState = penguinReducer(
        { allMessages: mockMessages, message: mockMessage },
        action,
      );

      expect(loadedState.allMessages).toEqual(mockMessages);
    });
  });
});

describe("Given the getMessageActionCreator", (): void => {
  describe("When invoked", (): void => {
    test("Then the loading ui state should change to true", (): void => {
      const action = getMessageActionCreator(mockMessage);
      const loadedState = penguinReducer(
        { allMessages: mockMessages, message: mockMessage },
        action,
      );

      expect(loadedState).toEqual(initialState);
    });
  });
});

describe("Given the editMessageActionCreator", (): void => {
  describe("When invoked", (): void => {
    test("Then the loading ui state should change to true", (): void => {
      const action = editMessageActionCreator(mockMessage);
      const loadedState = penguinReducer(
        { allMessages: mockMessages, message: mockMessage },
        action,
      );

      expect(loadedState).toEqual({
        allMessages: mockMessages,
        message: mockMessage,
      });
    });
  });
});

describe("Given the resetMessageActionCreator", (): void => {
  describe("When invoked", (): void => {
    test("Then rest message data", (): void => {
      const action = resetMessageActionCreator(mockMessage);
      const loadedState = penguinReducer(
        { allMessages: mockMessages, message: mockMessage },
        action,
      );

      expect(loadedState.message.id).toBe("");
    });
  });
});

describe("Given resetPenguinsActionCreator", (): void => {
  describe("When  invoked", (): void => {
    test("Then load list with no messages", async (): void => {
      const action = resetMessagesActionCreator(mockMessage);
      const loadedState = penguinReducer(
        { allMessages: mockMessages, message: mockMessage },
        action,
      );

      expect(loadedState.allMessages.length).toEqual(0);
    });
  });
});

describe("Given deletePenguinActionCreator", (): void => {
  describe("When  invoked", (): void => {
    test("Then load list without deleted penguin", async (): void => {
      const action = deleteMessageActionCreator(mockMessage.id);
      const loadedState = penguinReducer(
        { allMessages: mockMessages, message: mockMessage },
        action,
      );

      expect(loadedState.allMessages.length).toEqual(2);
    });
  });
});

describe("Given the createPenguinActionCreator", (): void => {
  describe("When invoked", (): void => {
    test("Then the load list with new penguin", (): void => {
      const action = createMessageActionCreator(mockMessage);
      const loadedState = penguinReducer(
        { allMessages: mockMessages, message: mockMessage },
        action,
      );

      expect(loadedState).toEqual(initialState);
    });
  });
});
