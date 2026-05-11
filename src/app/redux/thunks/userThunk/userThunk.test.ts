/* eslint-disable @typescript-eslint/unbound-method */
import { vi } from "vitest";
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

beforeAll((): void => {
  server.listen({ onUnhandledRequest: "bypass" });
});

beforeEach((): void => {
  server.listen();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

vi.mock("jwt-decode", () => ({
  username: "user1",
  id: "idUser",
  image: "image.jpg",
}));

vi.mock("axios");

HTMLAnchorElement.prototype.click = function (this: void) {};
window.URL.createObjectURL = function (this: void) {
  return "";
};

vi.mock("../../hooks/hooks", () => ({
  useAppSelector: () => ({
    connected: true,
    headerTitle: "Favorites",
  }),
  useAppDispatch: () => vi.fn(),
}));

describe("Given the getuserThunk function", (): void => {
  describe("When it's called with an user", (): void => {
    test("Then it should call dispatch with the set notes to show action with the notes received from the axios request", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.get = vi.fn().mockResolvedValue({ data: { user: mockUser } });

      const thunk = getUserThunk(mockUser.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When getUserMessagesThunk is called with an user", (): void => {
    test("Then it should call dispatch with the set notes to show action with the notes received from the axios request", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "setItem").mockReturnValue();
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.get = vi
        .fn()
        .mockResolvedValue({ data: { messages: mockMessages } });

      const thunk = getUserMessagesThunk(mockUser.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When getUserThunk is called badly", (): void => {
    test("Then it should call dispatch with the set notes to show action with the notes received from the axios request", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.get = vi
        .fn()
        .mockResolvedValue({ data: { messages: mockMessages } });

      const thunk = getUserThunk(mockUser.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When invoked with a valid user and axios throws an error", (): void => {
    test("Then it should not call the dispatch", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.post = vi.fn().mockRejectedValue({});

      const thunk = loginThunk({
        username: mockUser.username,
        password: "",
      });
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(4);
    });
  });

  describe("When invoked with a valid user and axios", (): void => {
    test("Then it should call the dispatch", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.mock("../../features/uiSlice/uiSlice", () => ({
        loginActionCreator: vi.fn().mockReturnThis(),
        finishedLoadingActionCreator: vi.fn().mockReturnValue(true),
        modalTypeActionCreator: vi.fn().mockReturnValue(true),
        modalMessageActionCreator: vi.fn().mockReturnValue(true),
        isModalOpenActionCreator: vi.fn().mockReturnValue(true),
      }));

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.post = vi.fn().mockReturnValue({ data: "", status: 200 });

      const thunk = loginThunk({
        username: mockUser.username,
        password: mockUser.password,
      });
      await thunk(dispatch);
      const finishedLoadingActionCreator = vi.fn().mockReturnValue(true);
      finishedLoadingActionCreator();
      const loginActionCreator = vi.fn().mockReturnValue(true);
      loginActionCreator();

      expect(loginActionCreator).toHaveBeenCalled();
      expect(finishedLoadingActionCreator).toHaveBeenCalled();
    });
  });

  describe("When invoked with a invalid user and axios throws an error", (): void => {
    test("Then it should not call the dispatch", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.post = vi.fn().mockReturnValue({ status: 200 });

      const thunk = loginThunk({
        username: mockUser.username,
        password: mockUser.password,
      });
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When invoked editUser", () => {
    test("Then it should not call the dispatch", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "setItem").mockReturnValue();
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.put = vi.fn().mockReturnValue({});

      const thunk = editUserThunk(mockUser.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When registerThunk invoked editUser", () => {
    test("Then it should not call the dispatch", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "setItem").mockReturnValue();
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.post = vi.fn().mockResolvedValue({ data: { user: mockUser } });

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
    test("Then it should not call the dispatch", async (): Promise<void> => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "setItem").mockReturnValue();
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.post = vi.fn().mockRejectedValue(false);

      const mockData = {
        username: mockUser.username,
        password: mockUser.password,
      };
      const thunk = registerThunk(mockData, mockUser.password);
      await thunk(dispatch);

      expect(axios.post).toHaveBeenCalled();
    });
  });
});
