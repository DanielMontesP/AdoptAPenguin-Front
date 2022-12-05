import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { mockMessages } from "../../mocks/messages";
import userEvent from "@testing-library/user-event";
import MessageNotifyer from "./MessageNotifyer";

describe("Given a Message componen", () => {
  describe("When click submit with data", () => {
    test("Then handleClick have to been called and show error prompt", () => {
      const handleHidder = jest.fn();
      const handleClick = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <MessageNotifyer messages={mockMessages} />
          </BrowserRouter>
        </Provider>
      );

      const text = screen.getByPlaceholderText("notifyer-bt-close");
      const text2 = screen.getByTitle("notifyer-container");

      userEvent.click(text);
      handleHidder();

      expect(text).toBeInTheDocument();
      expect(handleHidder).toHaveBeenCalled();

      userEvent.click(text2);
      handleClick();

      expect(text).toBeInTheDocument();
      expect(handleClick).toHaveBeenCalled();
    });
  });
});
