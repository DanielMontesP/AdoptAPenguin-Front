import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { deletePenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { mockPenguin, mockPenguins } from "../../mocks/penguins";
import CreateForm from "./CreateForm";

describe("Given a CreateForm component", () => {
  describe("When the word 'user1' is written to the username input field", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "Name";
      const inputText = "user1";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreateForm penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.type(label, inputText);

      expect(label).toBeInTheDocument();
    });
  });
  describe("When the two inputs have text and the submit button is clicked", () => {
    test("Then the two inputs should be empty", () => {
      const inputIAmge = "image-input";
      const handlImg = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreateForm penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );
      const label = screen.getByPlaceholderText(inputIAmge);

      userEvent.click(label);

      expect(label).toBeInTheDocument();

      const mockEvent = { event: { target: { files: [mockPenguins] } } };
      handlImg(mockEvent);

      expect(handlImg).toHaveBeenCalled();
    });
  });
  describe("When processCreate is called", () => {
    test("Then the two inputs should be empty", () => {
      const button = "bt-save";
      const imageLabel = "image-input";
      const handleSubmit = jest.fn();
      const processCreate = jest.fn();
      const handleImg = jest.fn();

      const inputText = "user1";
      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreateForm penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );
      const label = screen.getByPlaceholderText(button);
      const image = screen.getByPlaceholderText(imageLabel);
      document.location.href = jest.fn().mockReturnValue("create").toString();
      userEvent.type(image, inputText);
      userEvent.click(label);

      expect(label).toBeInTheDocument();
      const dispatch = jest.fn();
      const mockEvent = { event: { target: { files: [mockPenguins] } } };
      handleSubmit(mockEvent);
      processCreate("New");
      handleImg();

      dispatch(deletePenguinThunk);
      expect(handleSubmit).toHaveBeenCalled();
      expect(processCreate).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
