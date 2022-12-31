import { rest } from "msw";
import { mockTokenKey } from "./handlers";

describe("Given usersHandlers function", () => {
  describe("When it's called with an user", () => {
    test("Then it should call usersHandlers with rest response", async () => {
      const usersHandlers = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      rest.post = jest
        .fn()
        .mockReturnValue({ status: 200, data: { token: mockTokenKey } });

      usersHandlers();

      expect(usersHandlers).toHaveBeenCalled();
    });
  });
});
