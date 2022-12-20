import { render, screen } from "@testing-library/react";
import Help from "./Help";

describe("Given the getuserThunk function", () => {
  describe("When it's called with an user", () => {
    test("Then it should call dispatch with the set notes to show action with the notes received from the axios request", async () => {
      render(<Help />);

      const search = "View inbox.";

      const label = screen.getByText(search);

      expect(label).toBeInTheDocument();
    });
  });
});
