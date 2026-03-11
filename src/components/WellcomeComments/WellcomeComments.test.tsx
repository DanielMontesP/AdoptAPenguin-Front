import { render, screen } from "@testing-library/react";
import WellcomeComments from "./WellcomeComments";

describe("Given the getuserThunk function", (): void => {
  describe("When it's called with an user", (): void => {
    test("Then it should call dispatch with the set notes to show action with the notes received from the axios request", async (): void => {
      render(<WellcomeComments />);

      const search = "AdoptAPenguin.com";

      const label = screen.getByText(search);

      expect(label).toBeDefined();
    });
  });
});
