import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import Navbar from "./Navbar";

describe("Given a Navbar component", () => {
  describe("When it's invoked", () => {
    test("Then it should render a list of 2 separators", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Detail" />
          </Provider>
        </BrowserRouter>
      );

      const expectedListsItems = screen.getByText("Detail");

      expect(expectedListsItems).toBeInTheDocument();
    });
  });
});
