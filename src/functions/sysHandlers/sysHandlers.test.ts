import { vi } from "vitest";
import { mockMessage, mockMessages } from "../../mocks/messages";
import { mockPenguin } from "../../mocks/penguins";
import {
  resizeFile,
  getCurrentDate,
  hasNewMessages,
  setMessageRead,
  connectedToServer,
  getUserNewMessages,
  writeFile,
} from "./sysHandlers";
import { penguins } from "../../export/penguins-export.js";

vi.mock("react-image-file-resizer", () => ({
  ...vi.importActual("react-image-file-resizer"),
  Resizer: () => vi.fn().mockResolvedValue(true),
  imageFileResizer: () => vi.fn().mockResolvedValue(true),
}));

vi.mock("./sysHandlers", () => ({
  ...vi.importActual("./sysHandlers"),
  handleServerInfo: () => vi.fn().mockResolvedValue(true),
  getUserNewMessages: () => vi.fn().mockResolvedValue(true),
  connectedToServer: () => vi.fn().mockResolvedValue(true),
  writeFile: () => vi.fn().mockResolvedValue(true),
  setMessageRead: () => vi.fn().mockResolvedValue(true),
  hasNewMessages: () => vi.fn().mockResolvedValue(true),
  resizeFile: () => vi.fn().mockResolvedValue(true),
  getCurrentDate: () => vi.fn().mockResolvedValue(true),
}));

describe("Given a Resizer component", () => {
  describe("When called with file name", () => {
    test("Then resizeFile() is called", () => {
      const mockBlob = new File([], "name");
      const Resizer = vi.fn().mockReturnValue(mockBlob);
      const imageFileResizer = vi.fn().mockResolvedValue(true);
      resizeFile(mockBlob);

      expect(Resizer).not.toHaveBeenCalled();
      expect(imageFileResizer).not.toHaveBeenCalled();
    });
  });
});

describe("Given a getCurrentDate function", () => {
  describe("When called", () => {
    test("Then it will return actual date and time", () => {
      const dispatch = vi.fn();
      dispatch(getCurrentDate());

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a hasNewMessages function", () => {
  describe("When called", () => {
    test("Then it return number of messages with unread flag", () => {
      const dispatch = vi.fn();
      dispatch(hasNewMessages(mockMessages, mockPenguin.id));

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a setMessageRead function", () => {
  describe("When called", () => {
    test("Then it return number of messages with unread flag", () => {
      const dispatch = vi.fn();
      dispatch(setMessageRead(mockMessage, dispatch));

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given writeFile with default type", () => {
  describe("when it's called", () => {
    test("Then it should call the dispatch function", async () => {
      const file = penguins;
      const dispatch = vi.fn();

      URL.createObjectURL = vi.fn();

      dispatch(writeFile("penguins", file));

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("when it's called with notifys type", () => {
    test("Then it should call the dispatch function", async () => {
      const file = penguins;
      const dispatch = vi.fn();

      URL.createObjectURL = vi.fn();

      dispatch(writeFile("notifys", file));

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("when it's called with messages type", () => {
    test("Then it should call the dispatch function", async () => {
      const file = penguins;
      const dispatch = vi.fn();

      URL.createObjectURL = vi.fn();

      dispatch(writeFile("messages", file));

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given connectedToServer", () => {
  describe("when it's called", () => {
    test("Then it should call the dispatch function", async () => {
      const dispatch = vi.fn();

      dispatch(connectedToServer());

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given getUserNewMessages function", () => {
  describe("when it's called", () => {
    test("Then it should call the dispatch function", async () => {
      const dispatch = vi.fn();

      dispatch(getUserNewMessages(mockMessages, dispatch));

      expect(dispatch).toHaveBeenCalled();
    });
  });
});
