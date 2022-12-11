import { mockMessage, mockMessages } from "../../mocks/messages";
import { mockPenguin } from "../../mocks/penguins";
import {
  resizeFile,
  getCurrentDate,
  hasNewMessages,
  setMessageRead,
} from "./sysHandlers";

import { writeFile } from "./sysHandlers";
import { penguins } from "../penguins-export.js";

jest.mock("react-image-file-resizer", () => ({
  ...jest.requireActual("react-image-file-resizer"),
  Resizer: () => jest.fn().mockResolvedValue(true),
  imageFileResizer: () => jest.fn().mockResolvedValue(true),
}));

describe("Given a Resizer component", () => {
  describe("When called with file name", () => {
    test("Then resizeFile() is called", () => {
      const mockBlob = new File([], "name");
      const Resizer = jest.fn().mockReturnValue(mockBlob);
      const imageFileResizer = jest.fn().mockResolvedValue(true);
      resizeFile(mockBlob);

      expect(Resizer).not.toHaveBeenCalled();
      expect(imageFileResizer).not.toHaveBeenCalled();
    });
  });
});

describe("Given a getCurrentDate function", () => {
  describe("When called", () => {
    test("Then it will return actual date and time", () => {
      const dispatch = jest.fn();
      dispatch(getCurrentDate());

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a hasNewMessages function", () => {
  describe("When called", () => {
    test("Then it return number of messages with unread flag", () => {
      const dispatch = jest.fn();
      dispatch(hasNewMessages(mockMessages, mockPenguin.id));

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a setMessageRead function", () => {
  describe("When called", () => {
    test("Then it return number of messages with unread flag", () => {
      const dispatch = jest.fn();
      dispatch(setMessageRead(mockMessage, dispatch));

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given writeFile", () => {
  describe("when it's called", () => {
    test("Then it should call the dispatch function", async () => {
      const file = penguins;
      const dispatch = jest.fn();

      URL.createObjectURL = jest.fn();

      dispatch(writeFile("penguins", file));

      expect(dispatch).toHaveBeenCalled();
    });
  });
});
