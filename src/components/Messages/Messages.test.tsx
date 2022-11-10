import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Messages from "./Messages";
import store from "../../app/redux/store/store";
import { mockMessages } from "../../mocks/messages";
import { mockPenguin } from "../../mocks/penguins";

describe("Given a Messages component", () => {
  describe("When rendered", () => {
    test("Then text 'result/s found` have to been called", () => {
      const stringToFind1 = "data";
      const stringToFind2 = "subject";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Messages allMessages={mockMessages} penguin={mockPenguin} />
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
