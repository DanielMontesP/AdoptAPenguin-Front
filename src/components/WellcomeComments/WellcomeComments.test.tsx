import { render, screen } from "@testing-library/react";
import WellcomeComments from "./WellcomeComments";

describe("Given the getuserThunk function", () => {
  describe("When it's called with an user", () => {
    test("Then it should call dispatch with the set notes to show action with the notes received from the axios request", async () => {
      render(<WellcomeComments />);

      const search = "AdoptAPenguin.com";

      const label = screen.getByText(search);

      expect(label).toBeInTheDocument();
    });
  });
});
