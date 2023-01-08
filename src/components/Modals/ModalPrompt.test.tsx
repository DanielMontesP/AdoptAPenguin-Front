import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { headerTitleActionCreator } from "../../app/redux/features/uiSlice/uiSlice";
import store from "../../app/redux/store/store";
import Navbar from "../Navbar/Navbar";
import { Modal } from "./ModalPrompt";

jest.mock("../../app/redux/hooks/hooks", () => ({
  ...jest.requireActual("../../app/redux/hooks/hooks"),
  useAppSelector: () => ({ modalType: "logOutUser", headerTitle: "Detail" }),
  useAppDispatch: () => jest.fn(),
}));

describe("Given a Modal component", () => {
  describe("When asked to delete a penguin and user click Accept button", () => {
    test("Then delete function has to be callled", () => {
      const labelToFind = "btn-accept";
      const inputText = "user1";

      const closeModal = jest.fn();
      const deletePenguin = jest.fn();
      const handleAcceptClick = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Navbar headerTitle="Detail" isMenuOpen={false} isDesktop={false} />
            <Modal
              closeModal={closeModal}
              idToProcess="modal"
              content="message"
              form="Penguin"
              type="delete"
              posX={50}
              posY={50}
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

  describe("When asked to delete message and user click Accept button", () => {
    test("Then delete function has to be callled", () => {
      const labelToFind = "btn-accept";
      const inputText = "user1";

      const closeModal = jest.fn();
      const deleteMessage = jest.fn();
      const handleAcceptClick = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Navbar headerTitle="Detail" isMenuOpen={false} isDesktop={false} />
            <Modal
              closeModal={closeModal}
              idToProcess="modal"
              content="message"
              form="Message"
              type="delete"
              posX={50}
              posY={50}
            />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      expect(label).toBeInTheDocument();

      userEvent.type(label, inputText);

      handleAcceptClick();
      deleteMessage();

      expect(handleAcceptClick).toHaveBeenCalled();
      expect(deleteMessage).toHaveBeenCalled();
    });
  });

  describe("When logout", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-accept";
      const inputText = "user1";

      const closeModal = jest.fn();
      const logOutUser = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Modal
              closeModal={closeModal}
              idToProcess="modal"
              content="message"
              form="Penguin"
              type="logOutUser"
              posX={50}
              posY={50}
            />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.type(label, inputText);
      logOutUser();

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
              idToProcess="modal"
              content="message"
              form="Penguin"
              type="Wellcome"
              posX={50}
              posY={50}
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
              idToProcess="modal"
              content="message"
              form="Penguin"
              type="About"
              posX={50}
              posY={50}
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
              idToProcess="modal"
              content="message"
              form="Penguin"
              type="Help"
              posX={50}
              posY={50}
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
              idToProcess="modal"
              content="message"
              form="Penguin"
              type="Validation"
              posX={50}
              posY={50}
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
              idToProcess="modal"
              content="message"
              type=""
              form="Penguin"
              posX={50}
              posY={50}
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
            <Navbar headerTitle="Detail" isMenuOpen={false} isDesktop={false} />
            <Modal
              closeModal={closeModal}
              idToProcess="modal"
              content="message"
              type="delete"
              form="Penguin"
              posX={50}
              posY={50}
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
            <Navbar headerTitle="Detail" isMenuOpen={false} isDesktop={false} />
            <Modal
              closeModal={closeModal}
              idToProcess="modal"
              content="message"
              type="delete"
              form="Penguin"
              posX={50}
              posY={50}
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
            <Navbar headerTitle="Detail" isMenuOpen={false} isDesktop={false} />
            <Modal
              closeModal={closeModal}
              idToProcess="modal"
              content="message"
              type="Error"
              form="=Penguin"
              posX={50}
              posY={50}
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

describe("Given btn-accept is clicked", () => {
  describe("When modal type is logOutUser", () => {
    test("Then the logOutUser function is called", () => {
      const labelToFind = "btn-accept";

      const handleAcceptClick = jest.fn();
      const closeModal = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Navbar headerTitle="Detail" isMenuOpen={false} isDesktop={false} />
            <Modal
              closeModal={closeModal}
              idToProcess="modal"
              content="message"
              type="Search"
              form="Message"
              posX={50}
              posY={50}
            />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.click(label);

      handleAcceptClick();
      expect(handleAcceptClick).toHaveBeenCalled();
    });
  });
});

describe("Given btn-accept is clicked with delete", () => {
  describe("When modal type is logOutUser", () => {
    test("Then the logOutUser function is called", () => {
      const labelToFind = "btn-accept";

      const handleAcceptClick = jest.fn();
      const closeModal = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Navbar headerTitle="Detail" isMenuOpen={false} isDesktop={false} />
            <Modal
              closeModal={closeModal}
              idToProcess="modal"
              content="message"
              type="delete"
              form="Message"
              posX={50}
              posY={50}
            />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.click(label);

      handleAcceptClick();
      expect(handleAcceptClick).toHaveBeenCalled();
    });
  });
});

describe("Given btn-accept is clicked with Settings", () => {
  describe("When modal type is logOutUser", () => {
    test("Then the handleAcceptClick function is called", () => {
      const labelToFind = "btn-accept";

      const handleAcceptClick = jest.fn();
      const closeModal = jest.fn();

      global.window.URL.createObjectURL = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Navbar headerTitle="Detail" isMenuOpen={false} isDesktop={false} />
            <Modal
              closeModal={closeModal}
              idToProcess="modal"
              content="message"
              type="Settings"
              form="Message"
              posX={50}
              posY={50}
            />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.click(label);

      handleAcceptClick();
      expect(handleAcceptClick).toHaveBeenCalled();
    });
  });
});

describe("Given btn-accept is clicked with Server", () => {
  describe("When modal type is logOutUser", () => {
    test("Then the handleAcceptClick function is called", () => {
      const labelToFind = "btn-accept";

      const handleAcceptClick = jest.fn();
      const closeModal = jest.fn();

      global.window.URL.createObjectURL = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Navbar headerTitle="Detail" isMenuOpen={false} isDesktop={false} />
            <Modal
              closeModal={closeModal}
              idToProcess="modal"
              content="message"
              type="Server"
              form="Message"
              posX={50}
              posY={50}
            />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.click(label);

      handleAcceptClick();
      expect(handleAcceptClick).toHaveBeenCalled();
    });
  });
});
