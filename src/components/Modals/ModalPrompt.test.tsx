import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { headerTitleActionCreator } from "../../app/redux/features/uiSlice/uiSlice";
import store from "../../app/redux/store/store";
import Navbar from "../Navbar/Navbar";
import { Modal } from "./ModalPrompt";

describe("Given a LoginForm component", () => {
  describe("When the word 'user1' is written to the username input field", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-accept";
      const inputText = "user1";

      const closeModal = jest.fn();
      const deletePenguin = jest.fn();
      const handleAcceptClick = jest.fn();
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Navbar headerTitle="Detail" />
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
      expect(label).toBeInTheDocument();

      userEvent.type(label, inputText);

      handleAcceptClick();
      deletePenguin();

      expect(handleAcceptClick).toHaveBeenCalled();
      expect(deletePenguin).toHaveBeenCalled();
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
              type="Wellcome"
            />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.type(label, inputText);

      expect(label).toBeInTheDocument();
    });
  });

  describe("Given About modal", () => {
    test("Then closeModal should be called", () => {
      const labelToFind = "btn-accept";

      const closeModal = jest.fn();
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Modal
              closeModal={closeModal}
              idPenguin="modal"
              message="message"
              type="About"
            />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.click(label);

      expect(closeModal).toHaveBeenCalled();
    });
  });

  describe("Given Help modal", () => {
    test("Then Help Modal should be called", () => {
      const labelToFind = "btn-accept";

      const closeModal = jest.fn();
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Modal
              closeModal={closeModal}
              idPenguin="modal"
              message="message"
              type="Help"
            />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.click(label);

      expect(closeModal).toHaveBeenCalled();
    });
  });

  describe("Given Validation modal", () => {
    test("Then Help Validation should be called", () => {
      const labelToFind = "btn-accept";

      const closeModal = jest.fn();
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Modal
              closeModal={closeModal}
              idPenguin="modal"
              message="message"
              type="Validation"
            />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.click(label);

      expect(closeModal).toHaveBeenCalled();
    });
  });

  describe("Given no modal type", () => {
    test("Then closeModal should be called", () => {
      const labelToFind = "btn-accept";

      const closeModal = jest.fn();
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Modal
              closeModal={closeModal}
              idPenguin="modal"
              message="message"
              type=""
            />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.click(label);

      expect(closeModal).toHaveBeenCalled();
    });
  });

  describe("When cancel", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-cancel";
      const inputText = "user1";

      const closeModal = jest.fn();
      const dispatch = jest.fn();

      dispatch(headerTitleActionCreator("Detail"));
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Navbar headerTitle="Detail" />
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
      const deletePenguin = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Navbar headerTitle="Detail" />
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
      deletePenguin();

      expect(handleAcceptClick).toHaveBeenCalled();
      expect(deletePenguin).toHaveBeenCalled();
    });
  });
  describe("When Error modal", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-accept";
      const inputText = "user1";

      const closeModal = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Navbar headerTitle="Detail" />
            <Modal
              closeModal={closeModal}
              idPenguin="modal"
              message="message"
              type="Error"
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

  describe("When Search modal", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-accept";
      const inputText = "user1";

      const closeModal = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Navbar headerTitle="Detail" />
            <Modal
              closeModal={closeModal}
              idPenguin="modal"
              message="message"
              type="Search"
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
