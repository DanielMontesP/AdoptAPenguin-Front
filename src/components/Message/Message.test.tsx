import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Message from "./Message";
import store from "../../app/redux/store/store";
import { mockMessage } from "../../mocks/messages";

describe("Given a NavWellcome component", () => {
  describe("When rendered", () => {
    test("Then deleteFromLikers have to been called", () => {
      const stringToFind1 = "subject";
      const stringToFind2 = "content";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Message message={mockMessage} />
          </BrowserRouter>
        </Provider>
      );

      const label1 = screen.getByText(stringToFind1);
      expect(label1).toBeInTheDocument();

      const label2 = screen.getByText(stringToFind2);
      expect(label2).toBeInTheDocument();
    });
  });
});
