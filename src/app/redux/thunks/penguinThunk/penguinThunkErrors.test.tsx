import axios from "axios";
import { mockPenguin } from "../../../../mocks/penguins";
import { editPenguinThunk, loadPenguinsThunk } from "./penguinThunk";

jest.mock("axios");

jest.mock("../../hooks/hooks", () => ({
  useAppSelector: () => ({
    connected: false,
    headerTitle: "Favorites",
  }),
  useAppDispatch: () => jest.fn(),
}));

jest.mock("../../../../functions/sysHandlers/sysHandlers", () => ({
  handleServerInfo: jest.fn(),
  getUserNewMessages: jest.fn(),
  connectedToServer: jest.fn().mockRejectedValue(false),
}));

describe("Given the ediPenguin function", () => {
  describe("When it's called and not connected", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();

      axios.get = jest.fn().mockResolvedValue({
        data: { mockPenguin },
        status: 200,
      });
      const thunk = editPenguinThunk(mockPenguin, mockPenguin.id, "update");

      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });

  describe("When it's called and wth error", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();

      jest.mock("../../../../components/Modals/Modals", () => ({
        setLoadingOn: () => jest.fn().mockRejectedValue(true),
      }));
      const thunk = editPenguinThunk(mockPenguin, mockPenguin.id, "update");

      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });
});

describe("Given the loadPenguinsThunk function", () => {
  describe("When it's called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();

      axios.get = jest.fn().mockResolvedValue({
        data: { mockPenguin },
        status: 200,
      });

      const thunk = loadPenguinsThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(4);
    });
  });
});
