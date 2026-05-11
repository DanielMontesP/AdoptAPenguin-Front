import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { headerTitleActionCreator } from "../../app/redux/features/uiSlice/uiSlice";
import store from "../../app/redux/store/store";
import Navbar from "../Navbar/Navbar";
import { Modal } from "./ModalPrompt";

vi.mock("../../app/redux/hooks/hooks", () => ({
  ...vi.importActual("../../app/redux/hooks/hooks"),
  useAppSelector: () => ({ modalType: "logOutUser", headerTitle: "Detail" }),
  useAppDispatch: () => vi.fn(),
}));

describe("Given a Modal component", (): void => {
  describe("When asked to delete a penguin and user click Accept button", (): void => {
    test("Then delete function has to be callled", (): void => {
      const labelToFind = "btn-accept";
      const inputText = "user1";

      const closeModal = vi.fn();
      const deletePenguin = vi.fn();
      const handleAcceptClick = vi.fn();

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
        </Provider>,
      );

      const label = screen.getByTitle(labelToFind);
      expect(label).toBeDefined();

      userEvent.type(label, inputText);

      handleAcceptClick();
      deletePenguin();

      expect(handleAcceptClick).toHaveBeenCalled();
      expect(deletePenguin).toHaveBeenCalled();
    });
  });

  describe("When asked to delete message and user click Accept button", (): void => {
    test("Then delete function has to be callled", (): void => {
      const labelToFind = "btn-accept";
      const inputText = "user1";

      const closeModal = vi.fn();
      const deleteMessage = vi.fn();
      const handleAcceptClick = vi.fn();

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
        </Provider>,
      );

      const label = screen.getByTitle(labelToFind);
      expect(label).toBeDefined();

      userEvent.type(label, inputText);

      handleAcceptClick();
      deleteMessage();

      expect(handleAcceptClick).toHaveBeenCalled();
      expect(deleteMessage).toHaveBeenCalled();
    });
  });

  describe("When logout", (): void => {
    test("Then the value of the username input field should be 'user1'", (): void => {
      const labelToFind = "btn-accept";
      const inputText = "user1";

      const closeModal = vi.fn();
      const logOutUser = vi.fn();

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
        </Provider>,
      );

      const label = screen.getByTitle(labelToFind);
      userEvent.type(label, inputText);
      logOutUser();

      expect(label).toBeDefined();
    });
  });
  describe("When error", (): void => {
    test("Then the value of the username input field should be 'user1'", (): void => {
      const labelToFind = "btn-accept";
      const inputText = "user1";

      const closeModal = vi.fn();
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
        </Provider>,
      );

      const label = screen.getByTitle(labelToFind);
      userEvent.type(label, inputText);

      expect(label).toBeDefined();
    });
  });

  describe("Given About modal", (): void => {
    test("Then closeModal should be called", (): void => {
      const labelToFind = "btn-close";
      const user = userEvent.setup();
      const closeModal = vi.fn().mockReturnValue(() => true);

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
        </Provider>,
      );

      const label = screen.getByTitle(labelToFind);
      closeModal();
      user.click(label);

      expect(closeModal).toHaveBeenCalled();
    });
  });

  describe("Given Help modal", (): void => {
    test("Then Help Modal should be called", (): void => {
      const labelToFind = "btn-close";

      const closeModal = vi.fn();
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
        </Provider>,
      );

      const label = screen.getByTitle(labelToFind);
      userEvent.click(label);
      closeModal();
      expect(closeModal).toHaveBeenCalled();
    });
  });

  describe("Given Validation modal", (): void => {
    test("Then Help Validation should be called", (): void => {
      const labelToFind = "btn-accept";

      const closeModal = vi.fn();
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
        </Provider>,
      );

      const label = screen.getByTitle(labelToFind);
      closeModal();
      userEvent.click(label);

      expect(closeModal).toHaveBeenCalled();
    });
  });

  describe("Given no modal type", (): void => {
    test("Then closeModal should be called", (): void => {
      const labelToFind = "btn-accept";

      const closeModal = vi.fn();

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
        </Provider>,
      );

      const label = screen.getByTitle(labelToFind);
      userEvent.click(label);
      closeModal();
      expect(closeModal).toHaveBeenCalled();
    });
  });

  describe("When cancel", (): void => {
    test("Then the value of the username input field should be 'user1'", (): void => {
      const labelToFind = "btn-cancel";
      const inputText = "user1";

      const closeModal = vi.fn();
      const dispatch = vi.fn();

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
        </Provider>,
      );

      const label = screen.getByTitle(labelToFind);
      userEvent.type(label, inputText);

      expect(label).toBeDefined();
    });
  });
  describe("When delete penguin", (): void => {
    test("Then the value of the username input field should be 'user1'", (): void => {
      const labelToFind = "btn-cancel";
      const inputText = "user1";

      const closeModal = vi.fn();
      const deletePenguin = vi.fn();

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
        </Provider>,
      );

      const label = screen.getByTitle(labelToFind);
      userEvent.type(label, inputText);
      const handleAcceptClick = vi.fn();

      handleAcceptClick();
      deletePenguin();

      expect(handleAcceptClick).toHaveBeenCalled();
      expect(deletePenguin).toHaveBeenCalled();
    });
  });
  describe("When Error modal", (): void => {
    test("Then the value of the username input field should be 'user1'", (): void => {
      const labelToFind = "btn-accept";
      const inputText = "user1";

      const closeModal = vi.fn();

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
        </Provider>,
      );

      const label = screen.getByTitle(labelToFind);
      userEvent.type(label, inputText);
      const handleAcceptClick = vi.fn();

      handleAcceptClick();
      expect(handleAcceptClick).toHaveBeenCalled();
    });
  });
});

describe("Given btn-accept is clicked", (): void => {
  describe("When modal type is logOutUser", (): void => {
    test("Then the logOutUser function is called", (): void => {
      const labelToFind = "btn-accept";

      const handleAcceptClick = vi.fn();
      const closeModal = vi.fn();

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
        </Provider>,
      );

      const label = screen.getByTitle(labelToFind);
      userEvent.click(label);

      handleAcceptClick();
      expect(handleAcceptClick).toHaveBeenCalled();
    });
  });
});

describe("Given btn-accept is clicked with delete", (): void => {
  describe("When modal type is logOutUser", (): void => {
    test("Then the logOutUser function is called", (): void => {
      const labelToFind = "btn-accept";

      const handleAcceptClick = vi.fn();
      const closeModal = vi.fn();

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
        </Provider>,
      );

      const label = screen.getByTitle(labelToFind);
      userEvent.click(label);

      handleAcceptClick();
      expect(handleAcceptClick).toHaveBeenCalled();
    });
  });
});

describe("Given btn-accept is clicked with Settings", (): void => {
  describe("When modal type is logOutUser", (): void => {
    test("Then the handleAcceptClick function is called", (): void => {
      const labelToFind = "btn-accept";

      const handleAcceptClick = vi.fn();
      const closeModal = vi.fn();

      window.URL.createObjectURL = vi.fn();

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
        </Provider>,
      );

      const label = screen.getByTitle(labelToFind);
      userEvent.click(label);

      handleAcceptClick();
      expect(handleAcceptClick).toHaveBeenCalled();
    });
  });
});

describe("Given btn-accept is clicked with Server", (): void => {
  describe("When modal type is logOutUser", (): void => {
    test("Then the handleAcceptClick function is called", (): void => {
      const labelToFind = "btn-accept";

      const handleAcceptClick = vi.fn();
      const closeModal = vi.fn();

      window.URL.createObjectURL = vi.fn();

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
        </Provider>,
      );

      const label = screen.getByTitle(labelToFind);
      userEvent.click(label);

      handleAcceptClick();
      expect(handleAcceptClick).toHaveBeenCalled();
    });
  });
});
