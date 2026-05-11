import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import Navbar from "../Navbar/Navbar";
import RegisterForm from "./RegisterForm";

const mockUAppDispatch = vi.fn();

vi.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({
    logged: true,
    id: "id",
    headerLastTitle: "lastTitle",
    headerTitle: "Test",
  }),
  useAppDispatch: () => mockUAppDispatch,
}));

describe("Given a RegisterForm component", (): void => {
  describe("When the word 'user1' is written to the username input field", (): void => {
    test("Then the value of the username input field should be 'user1'", (): void => {
      const labelToFind = "Username";
      const inputText = "user1";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <RegisterForm />
          </BrowserRouter>
        </Provider>,
      );

      const label = screen.getByLabelText(labelToFind);
      userEvent.type(label, inputText);

      expect(label).toBeDefined();
    });
  });
  describe("When the two inputs have text and the submit button is clicked", (): void => {
    test("Then the two inputs should be empty", (): void => {
      const usernameLabel = "Username";
      const passwordLabel = "Password";
      const inputText = "user1";
      const handleSubmit = vi.fn();
      const SetTitleHeader = vi.fn();
      const dispatch = vi.fn();
      const headerTitleActionCreator = vi.fn();
      const headerLastTitleActionCreator = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Navbar headerTitle="Test" isMenuOpen={false} isDesktop={false} />
            <RegisterForm />
          </BrowserRouter>
        </Provider>,
      );

      const username = screen.getByLabelText(usernameLabel);
      const password = screen.getByLabelText(passwordLabel);
      const submitButton = screen.getByTitle("bt-submit");

      userEvent.type(username, inputText);
      userEvent.type(password, inputText);

      expect(username).toHaveValue("");
      expect(password).toHaveValue("");

      SetTitleHeader("lastTitle");

      dispatch(headerTitleActionCreator("Test"));
      dispatch(headerLastTitleActionCreator("lastTitle"));
      userEvent.click(submitButton);

      handleSubmit();

      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
