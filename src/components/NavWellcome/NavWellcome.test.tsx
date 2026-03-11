import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { NavWellcome } from "./NavWellcome";
import store from "../../app/redux/store/store";

describe("Given a NavWellcome component", (): void => {
  describe("When rendered", (): void => {
    test("Then place holder text header-wellcome is rendered", (): void => {
      const stringToFind = "header-wellcome";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavWellcome headerTitle="HomePage" />
          </BrowserRouter>
        </Provider>,
      );

      const label = screen.getByTitle(stringToFind);

      expect(label).toBeDefined();
    });
  });
});
