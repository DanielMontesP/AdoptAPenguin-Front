import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { mockMessage, mockMessages } from "../../mocks/messages";
import userEvent from "@testing-library/user-event";
import MessageNotifyer from "./MessageNotifyer";

jest.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({
    headerTitle: "test",
    isMenuOpen: true,
  }),
  useAppDispatch: () => jest.fn(),
}));

describe("Given a NewMessagesNotify component", () => {
  describe("When click close button", () => {
    test("Then handleClick have to been called and show error prompt", () => {
      const handleClose = jest.fn();
      const dispatch = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <MessageNotifyer messages={mockMessages} />
          </BrowserRouter>
        </Provider>
      );

      const text = screen.getAllByPlaceholderText("notifyer-bt-close");
      expect(text.length).toBeGreaterThan(0);

      userEvent.click(text[0]);
      dispatch(handleClose());

      expect(dispatch).toHaveBeenCalled();
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
      handleClick({ currentTarget: { id: mockMessage.id } });

      expect(handleClick).toHaveBeenCalled();
    });
  });
});
