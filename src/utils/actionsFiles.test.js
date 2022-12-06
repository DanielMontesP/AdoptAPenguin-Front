import { writeFile } from "./actionsFiles";
import data from "../penguins-export.js";

describe("Given createFavThunk", () => {
  describe("when it's called", () => {
    test("Then it should call the dispatch function", async () => {
      const file = data;
      const dispatch = jest.fn();

      URL.createObjectURL = jest.fn();

      dispatch(writeFile(file));

      expect(dispatch).toHaveBeenCalled();
    });
  });
});
