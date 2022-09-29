import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { NavWellcome } from "./NavWellcome";
import store from "../../app/redux/store/store";

describe("Given a NavWellcome component", () => {
  describe("When rendered", () => {
    test("Then deleteFromLikers have to been called", () => {
      const stringToFind = "Responsive site";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavWellcome />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByText(stringToFind);
      expect(label).toBeInTheDocument();
    });
  });
});
