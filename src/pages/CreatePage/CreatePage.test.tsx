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

jest.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({
    logged: mockLogged,
    id: "id",
    allMessages: mockMessages,
    message: mockMessage,
    penguin: mockPenguin,
    headerTitle: "penguin",
  }),
  useAppDispatch: () => jest.fn(),
}));

describe("Given a CreatePage component", () => {
  describe("When the word 'penguin' is written to the username input field", () => {
    test("Then the value of the username input field should be 'penguin'", () => {
      const labelToFind = "Message";
      const inputText = "penguin1";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreatePage form="Message" type="Create" />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.type(label, inputText);

      expect(label).toBeInTheDocument();
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
        </Provider>
      );

      const label = screen.getByText(textToFind);

      expect(label).toBeInTheDocument();
    });
  });

  describe("When the two inputs have text and the submit button is clicked", () => {
    test("Then the two input name should have value penguin1", async () => {
      const nameLabel = "Name";
      const catLabel = "Category";
      const inputText = "penguin";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreatePage form="Penguin" type="Create" />
          </BrowserRouter>
        </Provider>
      );

      const name = screen.getByPlaceholderText(nameLabel);
      const category = screen.getByPlaceholderText(catLabel);
      const submitButton = screen.getByPlaceholderText("bt-save");
      axios.get = jest
        .fn()
        .mockResolvedValue({ data: { penguins: mockPenguins }, status: 200 });
      const dispatch = jest.fn();

      userEvent.type(name, inputText);
      userEvent.type(category, inputText);
      userEvent.click(submitButton);

      expect(name).toHaveValue("penguin1");
      expect(category).toHaveValue("category1");
      await dispatch(createFavThunk);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});
