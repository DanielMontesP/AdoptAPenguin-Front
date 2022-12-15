import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../app/redux/store/store";
import LoginPage from "./LoginPage";
import { BrowserRouter } from "react-router-dom";
import FormsStyles from "../../styles/FormsStyles";

describe("Given a LoginPage Component", () => {
  describe("When it's rendered", () => {
    test("Then it should show the text 'Register'", () => {
      const expectedResult = "Register";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <FormsStyles>
              <LoginPage />
            </FormsStyles>
          </Provider>
        </BrowserRouter>
      );

      const receivedResult = screen.getByText(expectedResult);
      expect(receivedResult).toBeInTheDocument();
    });
  });
});
