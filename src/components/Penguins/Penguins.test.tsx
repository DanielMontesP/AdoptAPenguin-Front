import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import Penguins from "./Penguins";
import { mockPenguins } from "../../mocks/penguins";
import Navbar from "../Navbar/Navbar";

describe("Given a Penguins component", () => {
  describe("When the word 'Home' is written to the username input field", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "Test";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Navbar headerTitle="Test" isMenuOpen={false} isDesktop={false} />
            <Penguins allPenguins={mockPenguins} />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByText(labelToFind);

      expect(label).toBeInTheDocument();
    });
  });
});
