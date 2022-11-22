import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { NavWellcome } from "./NavWellcome";
import store from "../../app/redux/store/store";

describe("Given a NavWellcome component", () => {
  describe("When rendered", () => {
    test("Then place holder text header-wellcome is rendered", () => {
      const stringToFind = "header-wellcome";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavWellcome headerTitle="HomePage" />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(stringToFind);

      expect(label).toBeInTheDocument();
    });
  });
});
