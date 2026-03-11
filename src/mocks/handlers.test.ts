import { http } from "msw";
import { mockTokenKey } from "./handlers";
import { vi } from "vitest";

describe("Given usersHandlers function", (): void => {
  describe("When it's called with an user", (): void => {
    test("Then it should call usersHandlers with rest response", async (): void => {
      const usersHandlers = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      http.post = vi
        .fn()
        .mockReturnValue({ status: 200, data: { token: mockTokenKey } });

      usersHandlers();

      expect(usersHandlers).toHaveBeenCalled();
    });
  });
});
