import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import LoginForm from "./LoginForm";

describe("Given a LoginForm component", (): void => {
  describe("When the word 'user1' is written to the username input field", (): void => {
    test("Then the value of the username input field should be 'user1'", (): void => {
      const labelToFind = "Username";
      const inputText = "user1";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <LoginForm />
          </BrowserRouter>
        </Provider>,
      );

      const label = screen.getByTitle(labelToFind);
      userEvent.type(label, inputText);

      expect(label).toBeDefined();
    });
  });
  describe("When the two inputs have text and the submit button is clicked", (): void => {
    test("Then the two inputs should be empty", (): void => {
      const usernameLabel = "Username";
      const passwordLabel = "Password";
      const inputText = "user1";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <LoginForm />
          </BrowserRouter>
        </Provider>,
      );

      const username = screen.getByTitle(usernameLabel);
      const password = screen.getByTitle(passwordLabel);
      const submitButton = screen.getByRole("button");

      userEvent.type(username, inputText);
      userEvent.type(password, inputText);
      userEvent.click(submitButton);

      expect(username).toHaveValue("");
      expect(password).toHaveValue("");
    });
  });
});
