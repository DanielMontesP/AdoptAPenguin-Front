import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Message from "./Message";
import store from "../../app/redux/store/store";
import { mockMessage, mockMessageEmpty } from "../../mocks/messages";
import userEvent from "@testing-library/user-event";

describe("Given a Message componen", () => {
  describe("When click submit with data", () => {
    test("Then handleClick have to been called and show error prompt", () => {
      const buttonClick = "bt-view";
      const handleClick = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Message message={mockMessage} />
          </BrowserRouter>
        </Provider>
      );

      const button = screen.getByPlaceholderText(buttonClick);

      expect(button).toBeInTheDocument();

      userEvent.click(button);
      handleClick();
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("When click submit with no data", () => {
    test("Then handleClick have to been called", () => {
      const buttonClick = "bt-view";
      const handleClick = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Message message={mockMessageEmpty} />
          </BrowserRouter>
        </Provider>
      );

      const button = screen.getByPlaceholderText(buttonClick);

      expect(button).toBeInTheDocument();

      userEvent.click(button);
      handleClick();
      expect(handleClick).toHaveBeenCalled();
    });
  });
});

describe("Given a Message component with data", () => {
  describe("When rendered", () => {
    test("Then handleDelete have to been called", () => {
      const stringToFind1 = "subject";
      const buttonClick = "bt-delete";
      const handleDelete = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Message message={mockMessage} />
          </BrowserRouter>
        </Provider>
      );

      const label1 = screen.getByText(stringToFind1);
      const button = screen.getByPlaceholderText(buttonClick);

      expect(label1).toBeInTheDocument();
      expect(button).toBeInTheDocument();

      userEvent.click(button);
      handleDelete();
      expect(handleDelete).toHaveBeenCalled();
    });
  });
});
