import axios from "axios";
import { mockMessage } from "../../../../mocks/messages";

import { getMessagesThunk } from "./messageThunk";

describe("Given the loadPenguinsThunk function", () => {
  describe("When it's called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = jest.fn().mockResolvedValue({
        data: { mockMessage },
        status: 200,
      });

      const thunk = getMessagesThunk(mockMessage);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});
