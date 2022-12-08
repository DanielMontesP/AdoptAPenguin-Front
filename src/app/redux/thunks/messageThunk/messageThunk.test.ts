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

describe("Given the loadPenguinsThunk function", () => {
  describe("When it's called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = jest.fn().mockResolvedValue({
        data: { mockMessage },
        status: 200,
      });

      const thunk = getMessagesThunk(mockPenguin.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given the getMessageThunk function", () => {
  describe("When it's called with an user", () => {
    test("Then it should call dispatch with the set notes to show action with the notes received from the axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = jest
        .fn()
        .mockResolvedValue({ data: { message: mockMessage } });

      const thunk = getMessageThunk(mockMessage.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});

describe("Given the resetMessageThunk function", () => {
  describe("When it's called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = jest.fn().mockResolvedValue({
        data: { message: mockMessage },
        status: 200,
      });

      const thunk = resetMessageThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Given the resetMessagesThunk function", () => {
  describe("When it's called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = jest.fn().mockResolvedValue({
        data: { message: mockMessage },
        status: 200,
      });

      const thunk = resetMessagesThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Given the createMessageThunk function", () => {
  describe("When it's called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.post = jest.fn().mockResolvedValue({
        data: { message: mockMessage },
        status: 200,
      });

      const thunk = createMessageThunk(mockMessage);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});

describe("Given the editMessageThunk function", () => {
  describe("When it's called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.put = jest.fn().mockResolvedValue({
        data: { message: mockMessage },
        status: 200,
      });

      const thunk = editMessageThunk(mockMessage.id, "Message");
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Given the editMessageThunk with no token function", () => {
  describe("When it's called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("error");
      axios.put = jest.fn().mockResolvedValue({
        data: { message: mockMessage },
        status: 200,
      });

      const thunk = editMessageThunk(mockMessage.id, "Message");
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Given the deleteMessageThunk", () => {
  describe("When it's called", () => {
    test("Then it should call dispatch with the deleteMessage  action with penguins received from axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.delete = jest.fn().mockResolvedValue({
        data: { mockMessageEmpty },
        status: 200,
      });

      const thunk = deleteMessageThunk(mockMessage.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
