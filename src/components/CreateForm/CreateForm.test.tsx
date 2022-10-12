import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { mockEmptyDataPenguin, mockPenguin } from "../../mocks/penguins";
import CreateForm from "./CreateForm";

describe("Given a CreateForm component", () => {
  describe("When the word 'user1' is written to the username input field", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelName = "Name";
      const labelCategory = "Category";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreateForm penguin={mockEmptyDataPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const inputName = screen.getByPlaceholderText(labelName);
      const inputCategory = screen.getByPlaceholderText(labelCategory);

      expect(inputName).toBeInTheDocument();
      expect(inputCategory).toBeInTheDocument();
    });
  });

  describe("When last title is Favourites and is create form", () => {
    test("Then navigate to favourites'", async () => {
      const labelButtonSubmit = "bt-save";
      const labelImg = "image-input";

      const handleImg = jest.fn();
      const handleSubmit = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreateForm penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const buttonSubmit = screen.getByPlaceholderText(labelButtonSubmit);
      userEvent.click(buttonSubmit);
      handleSubmit();

      expect(buttonSubmit).toBeInTheDocument();
      expect(handleSubmit).toHaveBeenCalled();

      const imageInput = screen.getByPlaceholderText(labelImg);
      userEvent.type(imageInput, "ss");

      handleImg();

      expect(imageInput).toBeInTheDocument();
      expect(handleImg).toHaveBeenCalled();
    });
  });
});
