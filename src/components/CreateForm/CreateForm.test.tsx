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

  describe("When rendered", () => {
    test("Then navigate to favourites'", async () => {
      const textToFind = "Name";
      const placeHolderSubmit = "bt-save";
      const inputToFind = "Name";
      const inputText = "penguin1";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreateForm penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );
      const handleSubmit = jest.fn();

      const textSubject = screen.getByPlaceholderText(textToFind);
      const btSave = screen.getByPlaceholderText(placeHolderSubmit);

      const label = screen.getByPlaceholderText(inputToFind);

      expect(textSubject).toBeInTheDocument();
      expect(btSave).toBeInTheDocument();

      userEvent.type(label, inputText);
      userEvent.click(btSave);

      handleSubmit();

      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
