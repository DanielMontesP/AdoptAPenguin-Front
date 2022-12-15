import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { mockMessages } from "../../mocks/messages";
import userEvent from "@testing-library/user-event";
import MessageNotifyer from "./MessageNotifyer";

describe("Given a NewMessagesNotify component", () => {
  describe("When click close button", () => {
    test("Then handleClick have to been called and show error prompt", () => {
      const handleClose = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <MessageNotifyer messages={mockMessages} />
          </BrowserRouter>
        </Provider>
      );

      const text = screen.getByPlaceholderText("notifyer-bt-close");
      expect(text).toBeInTheDocument();

      userEvent.click(text);
      handleClose();

      expect(handleClose).toHaveBeenCalled();
    });
  });

  describe("When click submit with data", () => {
    test("Then handleClick have to been called and show error prompt", () => {
      const handleClick = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <MessageNotifyer messages={mockMessages} />
          </BrowserRouter>
        </Provider>
      );

      const text = screen.getAllByTitle("notifyer-container");
      expect(text.length).toBeGreaterThan(0);

      userEvent.click(text[0]);
      handleClick();

      expect(handleClick).toHaveBeenCalled();
    });
  });
});
