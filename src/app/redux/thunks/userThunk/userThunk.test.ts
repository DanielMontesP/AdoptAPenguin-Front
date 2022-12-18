import { mockUser } from "../../../../mocks/users";
import { server } from "../../../../mocks/server";
import {
  editUserThunk,
  getUserMessagesThunk,
  getUserThunk,
  loginThunk,
  registerThunk,
} from "./userThunk";
import axios from "axios";
import { mockMessages } from "../../../../mocks/messages";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "bypass" });
});

beforeEach(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock("jwt-decode", () => () => ({
  username: "user1",
  id: "idUser",
  image: "image.jpg",
}));

jest.mock("axios");

HTMLAnchorElement.prototype.click = jest.fn();
global.window.URL.createObjectURL = jest.fn();

describe("Given the getuserThunk function", () => {
  describe("When it's called with an user", () => {
    test("Then it should call dispatch with the set notes to show action with the notes received from the axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = jest.fn().mockResolvedValue({ data: { user: mockUser } });

      const thunk = getUserThunk(mockUser.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When getUserThunk is called badly", () => {
    test("Then it should call dispatch with the set notes to show action with the notes received from the axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = jest.fn().mockRejectedValue(false);

      const thunk = getUserThunk(mockUser.id);
      await thunk(dispatch);

      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe("When invoked with a valid user and axios throws an error", () => {
    test("Then it should not call the dispatch", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "setItem").mockReturnValue();
      axios.post = jest.fn().mockRejectedValue({});

      const thunk = loginThunk({
        username: mockUser.username,
        password: "",
      });
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(4);
    });
  });

  describe("When invoked with a valid user and axios", () => {
    test("Then it should call the dispatch", async () => {
      const dispatch = jest.fn();
      jest.mock("../../features/uiSlice/uiSlice", () => ({
        loginActionCreator: jest.fn().mockReturnThis(),
        finishedLoadingActionCreator: jest.fn().mockReturnValue(true),
      }));

      jest.spyOn(Storage.prototype, "setItem").mockReturnValue();
      axios.post = jest.fn().mockReturnValue({ data: "", status: 200 });

      const thunk = loginThunk({
        username: mockUser.username,
        password: mockUser.password,
      });
      await thunk(dispatch);
      const finishedLoadingActionCreator = jest.fn().mockReturnValue(true);
      finishedLoadingActionCreator();
      const loginActionCreator = jest.fn().mockReturnValue(true);
      loginActionCreator();

      expect(loginActionCreator).toHaveBeenCalled();
      expect(finishedLoadingActionCreator).toHaveBeenCalled();
    });
  });

  describe("When invoked with a invalid user and axios throws an error", () => {
    test("Then it should not call the dispatch", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "setItem").mockReturnValue();
      axios.post = jest.fn().mockReturnValue({ status: 200 });

      const thunk = loginThunk({
        username: mockUser.username,
        password: mockUser.password,
      });
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When invoked editUser", () => {
    test("Then it should not call the dispatch", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "setItem").mockReturnValue();
      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.put = jest.fn().mockReturnValue({});

      const thunk = editUserThunk({
        username: mockUser.username,
        password: "",
      });
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When registerThunk invoked editUser", () => {
    test("Then it should not call the dispatch", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "setItem").mockReturnValue();
      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.post = jest.fn().mockResolvedValue({ data: { user: mockUser } });

      const mockData = {
        username: mockUser.username,
        password: mockUser.password,
      };
      const thunk = registerThunk(mockData, mockUser.password);
      await thunk(dispatch);

      expect(axios.post).toHaveBeenCalled();
    });
  });

  describe("When registerThunk invoked editUser badly", () => {
    test("Then it should not call the dispatch", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "setItem").mockReturnValue();
      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.post = jest.fn().mockRejectedValue(false);

      const mockData = {
        userData: {
          username: mockUser.username,
          password: mockUser.password,
        },
      };
      const thunk = registerThunk(mockData, mockUser.password);
      await thunk(dispatch);

      expect(axios.post).toHaveBeenCalled();
    });
  });

  describe("When getUserMessagesThunk invoked", () => {
    test("Then it should not call the dispatch", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "setItem").mockReturnValue();
      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = jest
        .fn()
        .mockReturnValue({ data: { messages: mockMessages } });

      const thunk = getUserMessagesThunk(mockUser.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});
