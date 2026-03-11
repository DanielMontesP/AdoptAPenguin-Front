/// <reference types="vitest" />
import { vi } from "vitest";
import axios from "axios";
import { mockPenguin } from "../../../../mocks/penguins";
import { editPenguinThunk, loadPenguinsThunk } from "./penguinThunk";

vi.mock("axios");

vi.mock("../../hooks/hooks", () => ({
  useAppSelector: () => ({
    connected: false,
    headerTitle: "Favorites",
  }),
  useAppDispatch: () => vi.fn(),
}));

vi.mock("../../../../functions/sysHandlers/sysHandlers", () => ({
  handleServerInfo: vi.fn(),
  getUserNewMessages: vi.fn(),
  connectedToServer: vi.fn().mockRejectedValue(false),
}));

describe("Given the editPenguin function", (): void => {
  describe("When it's called and not connected", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): void => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.put = vi.fn().mockRejectedValue(true);
      const thunk = editPenguinThunk(mockPenguin, mockPenguin.id, "update");

      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(4);
    });
  });

  describe("When it's called with error", (): void => {
    test("Then it should not call editPenguinThunk", async (): void => {
      const dispatch = vi.fn();

      vi.mock("../../../../components/Modals/Modals", () => ({
        setLoadingOn: () => vi.fn().mockRejectedValue(true),
        setLoadingOffWithMessage: () => vi.fn().mockRejectedValue(true),
      }));
      const thunk = editPenguinThunk(mockPenguin, mockPenguin.id, "update");

      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(4);
    });
  });
});

describe("Given the loadPenguinsThunk function", (): void => {
  describe("When it's called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): void => {
      const dispatch = vi.fn();

      axios.get = vi.fn().mockResolvedValue({
        data: { mockPenguin },
        status: 200,
      });

      const thunk = loadPenguinsThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
