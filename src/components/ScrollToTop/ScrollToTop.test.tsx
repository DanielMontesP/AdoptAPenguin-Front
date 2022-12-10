import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FaAngleUp } from "react-icons/fa";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import ScrollToTop from "./ScrollToTop";

describe("Given a ScrollToTop Component", () => {
  describe("When it's rendered", () => {
    test("Then it should render messages-container div'", () => {
      const expectedResult = "scroll-top-container";

      jest.mock("react", () => ({
        ...jest.requireActual("react"),
        useState: () => ({ showTopBtn: 500 }),
      }));

      render(
        <Provider store={store}>
          <BrowserRouter>
            <ScrollToTop />
          </BrowserRouter>
        </Provider>
      );
      const scrollContainer = screen.getByTitle(expectedResult);
      expect(scrollContainer).toBeInTheDocument();
    });
  });
});
