import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import HomePage from "./HomePage";

describe("Given a HomePage Component", () => {
  describe("When it's rendered", () => {
    test("Then it should show the text 'AdoptAPenguin.com'", () => {
      const expectedResult = "Home";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <HomePage />
          </BrowserRouter>
        </Provider>
      );

      const receivedResult = screen.getByText(expectedResult);

      expect(receivedResult).toBeInTheDocument();
    });
  });
});
