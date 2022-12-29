import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import Navbar from "../Navbar/Navbar";
import RegisterForm from "./RegisterForm";

describe("Given a RegisterForm component", () => {
  describe("When the word 'user1' is written to the username input field", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "Username";
      const inputText = "user1";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <RegisterForm />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByLabelText(labelToFind);
      userEvent.type(label, inputText);

      expect(label).toBeInTheDocument();
    });
  });
  describe("When the two inputs have text and the submit button is clicked", () => {
    test("Then the two inputs should be empty", () => {
      const usernameLabel = "Username";
      const passwordLabel = "Password";
      const inputText = "user1";
      const handleSubmit = jest.fn();
      const SetTitleHeader = jest.fn();
      const mockUAppDispatch = jest.fn();
      const dispatch = jest.fn();
      const headerTitleActionCreator = jest.fn();
      const headerLastTitleActionCreator = jest.fn();

      jest.mock("../../app/redux/hooks/hooks", () => ({
        useAppSelector: () => ({
          logged: true,
          id: "id",
          headerLastTitle: "lastTitle",
          headerTitle: "Test",
        }),
        useAppDispatch: () => mockUAppDispatch,
      }));

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Navbar headerTitle="Test" isMenuOpen={false} isDesktop={false} />
            <RegisterForm />
          </BrowserRouter>
        </Provider>
      );

      const username = screen.getByLabelText(usernameLabel);
      const password = screen.getByLabelText(passwordLabel);
      const submitButton = screen.getByPlaceholderText("bt-submit");

      userEvent.type(username, inputText);
      userEvent.type(password, inputText);

      expect(username).toHaveValue("user1");
      expect(password).toHaveValue("user1");

      SetTitleHeader("lastTitle");

      dispatch(headerTitleActionCreator("Test"));
      dispatch(headerLastTitleActionCreator("lastTitle"));
      userEvent.click(submitButton);

      handleSubmit();

      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
