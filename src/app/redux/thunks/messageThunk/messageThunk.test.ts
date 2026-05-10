import { vi } from "vitest";
import axios from "axios";
import { mockMessageEmpty, mockMessage } from "../../../../mocks/messages";
import { mockPenguin } from "../../../../mocks/penguins";

import {
  createMessageThunk,
  deleteMessageThunk,
  editMessageThunk,
  getMessagesThunk,
  getMessageThunk,
  resetMessagesThunk,
  resetMessageThunk,
} from "./messageThunk";

describe("Given the getMessagesThunk function", (): void => {
  describe("When it's called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = vi.fn().mockResolvedValue({
        data: { mockMessage },
        status: 200,
      });

      const thunk = getMessagesThunk(mockPenguin.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given the getMessagesThunk with error function", (): void => {
  describe("When it's called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = vi.fn().mockRejectedValue({
        data: { mockMessage },
        status: 400,
      });

      const thunk = getMessagesThunk(mockPenguin.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given the getMessageThunk function", (): void => {
  describe("When it's called with an user", (): void => {
    test("Then it should call dispatch with the set notes to show action with the notes received from the axios request", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = vi.fn().mockResolvedValue({ data: { message: mockMessage } });

      const thunk = getMessageThunk(mockMessage.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe("When it's called with id message undefined", (): void => {
    test("Then it should call dispatch the axios request", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = vi.fn().mockReturnValue(mockMessage);

      const thunk = getMessageThunk("undefined");
      await thunk(dispatch);

      expect(dispatch).not.toHaveBeenCalled();
    });
  });
});

describe("Given the resetMessageThunk function", (): void => {
  describe("When it's called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = vi.fn().mockResolvedValue({
        data: { message: mockMessage },
        status: 200,
      });

      const thunk = resetMessageThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Given the resetMessagesThunk function", (): void => {
  describe("When it's called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = vi.fn().mockResolvedValue({
        data: { message: mockMessage },
        status: 200,
      });

      const thunk = resetMessagesThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Given the createMessageThunk function", (): void => {
  describe("When it's called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.post = vi.fn().mockResolvedValue({
        data: { message: mockMessage },
        status: 200,
      });

      const thunk = createMessageThunk(mockMessage);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});

describe("Given the editMessageThunk function", (): void => {
  describe("When it's called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.put = vi.fn().mockResolvedValue({
        data: { message: mockMessage },
        status: 200,
      });

      const thunk = editMessageThunk(mockMessage, "Message");
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});

describe("Given the editMessageThunk with no token function", (): void => {
  describe("When it's called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("error");
      axios.put = vi.fn().mockResolvedValue({
        data: { message: mockMessage },
        status: 200,
      });

      const thunk = editMessageThunk(mockMessage, "Message");
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});

describe("Given the deleteMessageThunk", (): void => {
  describe("When it's called", (): void => {
    test("Then it should call dispatch with the deleteMessage  action with penguins received from axios request", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.delete = vi.fn().mockResolvedValue({
        data: { mockMessageEmpty },
        status: 200,
      });

      const thunk = deleteMessageThunk(mockMessage.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
