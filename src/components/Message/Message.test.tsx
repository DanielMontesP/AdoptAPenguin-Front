import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Message from "./Message";
import store from "../../app/redux/store/store";
import { mockMessage, mockMessageEmpty } from "../../mocks/messages";
import userEvent from "@testing-library/user-event";

describe("Given a Message componen", (): void => {
  describe("When click submit with data", (): void => {
    test("Then handleClick have to been called and show error prompt", (): void => {
      const buttonClick = "bt-view";
      const handleClick = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Message message={mockMessage} />
          </BrowserRouter>
        </Provider>,
      );

      const button = screen.getByTitle(buttonClick);

      expect(button).toBeDefined();

      userEvent.click(button);
      handleClick();
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("When click submit with no data", (): void => {
    test("Then handleClick have to been called", (): void => {
      const buttonClick = "bt-view";
      const handleClick = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Message message={mockMessageEmpty} />
          </BrowserRouter>
        </Provider>,
      );

      const button = screen.getByTitle(buttonClick);

      expect(button).toBeDefined();

      userEvent.click(button);
      handleClick();
      expect(handleClick).toHaveBeenCalled();
    });
  });
});

describe("Given a Message component with data", (): void => {
  describe("When rendered", (): void => {
    test("Then handleDelete have to been called", (): void => {
      const stringToFind1 = "subject";
      const buttonClick = "bt-delete";
      const handleDelete = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Message message={mockMessage} />
          </BrowserRouter>
        </Provider>,
      );

      const label1 = screen.getByText(stringToFind1);
      const button = screen.getByTitle(buttonClick);

      expect(label1).toBeDefined();
      expect(button).toBeDefined();

      userEvent.click(button);
      handleDelete();
      expect(handleDelete).toHaveBeenCalled();
    });
  });
});
