import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import UserMessagesPage from "./UserMessagesPage";

describe("Given a UserMessagesPage Component", () => {
  describe("When it's rendered", () => {
    test("Then it should render messages-container div'", () => {
      const expectedResult = "messages-container";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <UserMessagesPage />
          </BrowserRouter>
        </Provider>
      );

      const receivedResult = screen.getByTitle(expectedResult);

      expect(receivedResult).toBeInTheDocument();
    });
  });
});
