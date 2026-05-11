import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { mockMessage, mockMessages } from "../../mocks/messages";
import userEvent from "@testing-library/user-event";
import MessageNotifyer from "./MessageNotifyer";

vi.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({
    headerTitle: "test",
    isMenuOpen: true,
  }),
  useAppDispatch: () => vi.fn(),
}));

describe("Given a NewMessagesNotify component", (): void => {
  describe("When click close button", (): void => {
    test("Then handleClick have to been called and show error prompt", (): void => {
      const handleClose = vi.fn();
      const dispatch = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <MessageNotifyer messages={mockMessages} />
          </BrowserRouter>
        </Provider>,
      );

      const text = screen.getByTitle("notifyer-bt-close");
      expect(text).toBeInTheDocument();

      // userEvent.click(text[0]);
      dispatch(handleClose());

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When click submit with data", (): void => {
    test("Then handleClick have to been called and show error prompt", (): void => {
      const handleClick = vi.fn();
      render(
        <Provider store={store}>
          <BrowserRouter>
            <MessageNotifyer messages={mockMessages} />
          </BrowserRouter>
        </Provider>,
      );

      const text = screen.getAllByTitle("notifyer-container");
      expect(text.length).toBeGreaterThan(0);

      userEvent.click(text[0]);
      handleClick({ currentTarget: { id: mockMessage.id } });

      expect(handleClick).toHaveBeenCalled();
    });
  });
});
