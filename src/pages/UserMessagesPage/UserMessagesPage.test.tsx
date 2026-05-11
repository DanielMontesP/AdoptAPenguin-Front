import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import UserMessagesPage from "./UserMessagesPage";

describe("Given a UserMessagesPage Component", (): void => {
  describe("When it's rendered", (): void => {
    test("Then it should render messages-container div'", (): void => {
      const expectedResult = "messages-container";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <UserMessagesPage />
          </BrowserRouter>
        </Provider>,
      );

      const receivedResult = screen.getByTitle(expectedResult);

      expect(receivedResult).toBeDefined();
    });
  });
});
