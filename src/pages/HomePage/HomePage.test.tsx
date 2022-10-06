import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import Navbar from "../../components/Navbar/Navbar";
import HomePage from "./HomePage";

describe("Given a HomePage Component", () => {
  describe("When it's rendered", () => {
    test("Then it should show the text 'Home'", () => {
      const expectedResult = "Home";

      jest.mock("../../app/redux/hooks/hooks", () => ({
        ...jest.requireActual("../../app/redux/hooks/hooks"),
        useAppSelector: jest.fn().mockReturnValue("Favourites"),
      }));
      render(
        <Provider store={store}>
          <BrowserRouter>
            <HomePage />
          </BrowserRouter>
        </Provider>
      );

      const receivedResult = screen.getAllByText(expectedResult);

      expect(receivedResult.length).toBe(1);
    });
  });
});
