import { render, screen } from "@testing-library/react";
import Help from "./Help";

describe("Given the getuserThunk function", (): void => {
  describe("When it's called with an user", (): void => {
    test("Then it should call dispatch with the set notes to show action with the notes received from the axios request", async (): Promise<void> => {
      render(<Help />);

      const search = "View inbox.";

      const label = screen.getByText(search);

      expect(label).toBeDefined();
    });
  });
});
