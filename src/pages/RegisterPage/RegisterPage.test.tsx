import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import RegisterPage from "./RegisterPage";

describe("Given a RegisterPage Component", (): void => {
  describe("When it's rendered", (): void => {
    test("Then it should show the text 'Register'", (): void => {
      const expectedResult = "Register";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <RegisterPage />
          </BrowserRouter>
        </Provider>,
      );

      const receivedResult = screen.getByText(expectedResult);

      expect(receivedResult).toBeDefined();
    });
  });
});
