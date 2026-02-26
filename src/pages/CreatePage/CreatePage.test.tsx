import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { createFavThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { mockMessage, mockMessages } from "../../mocks/messages";
import { mockPenguin, mockPenguins } from "../../mocks/penguins";
import CreatePage from "./CreatePage";

let mockLogged = true;

describe("Given a CreatePage component", () => {
  describe("When the word 'penguin' is written to the username input field", () => {
    test("Then the value of the username input field should be 'penguin'", () => {
      const labelToFind = "Message";
      const inputText = "penguin1";

      vi.mock("../../app/redux/hooks/hooks", () => ({
        useAppSelector: () => ({
          logged: mockLogged,
          id: "id",
          allMessages: mockMessages,
          message: mockMessage,
          penguin: mockPenguin,
          headerTitle: "message",
        }),
        useAppDispatch: () => vi.fn(),
      }));

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreatePage form="Message" type="Create" />
          </BrowserRouter>
        </Provider>,
      );

      const label = screen.getByTitle(labelToFind);
      userEvent.type(label, inputText);

      expect(label).toBeDefined();
    });
  });
});

describe("Given a penguin CreatePage component", () => {
  describe("When CreatePage is rendered with type penguin", () => {
    test("Then the value of the Name input field should be 'penguin'", () => {
      const textToFind = "Name";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreatePage form="Penguin" type="Create" />
          </BrowserRouter>
        </Provider>,
      );

      const label = screen.getByText(textToFind);

      expect(label).toBeDefined();
    });
  });

  describe("When the two inputs have text and the submit button is clicked", () => {
    test("Then the two input name should have value penguin1", async () => {
      const nameLabel = "Name";
      const inputText = "penguin1";

      vi.mock("../../app/redux/hooks/hooks", () => ({
        useAppSelector: () => ({
          logged: mockLogged,
          id: "id",
          allMessages: mockMessages,
          message: mockMessage,
          penguin: mockPenguin,
          headerTitle: "penguin",
        }),
        useAppDispatch: () => vi.fn(),
      }));

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreatePage form="Penguin" type="Create" />
          </BrowserRouter>
        </Provider>,
      );

      const name = screen.getByTitle(nameLabel);
      const submitButton = screen.getByTitle("bt-save");
      axios.get = vi
        .fn()
        .mockResolvedValue({ data: { penguins: mockPenguins }, status: 200 });
      const dispatch = vi.fn();

      await userEvent.type(name, inputText);
      await userEvent.click(submitButton);

      expect(name).toHaveValue("ppeenngguuiinn11");
      await dispatch(createFavThunk);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When the render message form with two inputs have text and the submit button is clicked", () => {
    test("Then the two input name should have value penguin1", async () => {
      const nameLabel = "Message";
      const inputText = "penguin1";
      const user = userEvent.setup();

      const dispatch = vi.fn();
      axios.get = vi
        .fn()
        .mockResolvedValue({ data: { penguins: mockPenguins }, status: 200 });

      vi.mock("../../app/redux/hooks/hooks", () => ({
        useAppSelector: () =>
          vi.fn().mockReturnValue({ headerTitle: "message" }),
        useAppDispatch: () => vi.fn(),
      }));

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreatePage form="Message" type="Create" />
          </BrowserRouter>
        </Provider>,
      );

      const name = screen.getByTitle(nameLabel);
      await user.type(name, inputText);
      expect(name).toHaveValue("");

      const submitButton = screen.getByTitle("bt-reply");
      expect(submitButton).toBeDefined();

      await user.click(submitButton);
      await dispatch(createFavThunk);
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
