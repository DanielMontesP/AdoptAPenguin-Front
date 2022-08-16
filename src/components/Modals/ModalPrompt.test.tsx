import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { headerTitleActionCreator } from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch } from "../../app/redux/hooks/hooks";
import store from "../../app/redux/store/store";
import { Modal } from "./ModalPrompt";

describe("Given a LoginForm component", () => {
  describe("When the word 'user1' is written to the username input field", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-accept";
      const inputText = "user1";

      const closeModal = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Modal
              closeModal={closeModal}
              idPenguin="modal"
              message="message"
              type="delete"
            />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.type(label, inputText);

      expect(label).toBeInTheDocument();
    });
  });

  describe("When logout", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-accept";
      const inputText = "user1";

      const closeModal = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Modal
              closeModal={closeModal}
              idPenguin="modal"
              message="message"
              type="logOutUser"
            />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.type(label, inputText);

      expect(label).toBeInTheDocument();
    });
  });
  describe("When error", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-accept";
      const inputText = "user1";

      const closeModal = jest.fn();
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Modal
              closeModal={closeModal}
              idPenguin="modal"
              message="message"
              type="xxx"
            />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.type(label, inputText);

      expect(label).toBeInTheDocument();
    });
  });
  describe("When close", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-close";
      const inputText = "user1";

      const closeModal = jest.fn();
      const dispatch = jest.fn();

      dispatch(headerTitleActionCreator("Detail"));

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Modal
              closeModal={closeModal}
              idPenguin="modal"
              message="message"
              type="delete"
            />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.type(label, inputText);

      expect(label).toBeInTheDocument();
    });
  });
  describe("When cancel", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-cancel";
      const inputText = "user1";

      const closeModal = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Modal
              closeModal={closeModal}
              idPenguin="modal"
              message="message"
              type="delete"
            />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.type(label, inputText);

      expect(label).toBeInTheDocument();
    });
  });
  describe("When delete penguin", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-cancel";
      const inputText = "user1";

      const closeModal = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Modal
              closeModal={closeModal}
              idPenguin="modal"
              message="message"
              type="delete"
            />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.type(label, inputText);
      const handleAcceptClick = jest.fn();

      handleAcceptClick();
      expect(handleAcceptClick).toHaveBeenCalled();
    });
  });
});
