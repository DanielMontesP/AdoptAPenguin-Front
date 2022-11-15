import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Messages from "./Messages";
import store from "../../app/redux/store/store";
import { mockMessages } from "../../mocks/messages";
import { mockPenguin } from "../../mocks/penguins";
import userEvent from "@testing-library/user-event";

describe("Given a Messages component", () => {
  describe("When rendered", () => {
    test("Then text 'result/s found` have to been called", () => {
      const stringToFind1 = "data";
      const stringToFind2 = "subject";
      const btSubmitLabel = "bt-submit";

      const handleClick = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Messages allMessages={mockMessages} penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const label1 = screen.getByText(stringToFind1);
      const label2 = screen.getByPlaceholderText(btSubmitLabel);
      const label3 = screen.getByText(stringToFind2);

      expect(label1).toBeInTheDocument();
      expect(label2).toBeInTheDocument();
      expect(label3).toBeInTheDocument();

      userEvent.click(label2);

      handleClick();
      expect(handleClick).toHaveBeenCalled();
    });
  });
});
