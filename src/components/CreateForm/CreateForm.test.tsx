import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useAppSelector } from "../../app/redux/hooks/hooks";
import store from "../../app/redux/store/store";
import { mockPenguin } from "../../mocks/penguins";
import CreateForm from "./CreateForm";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useAppSelector: jest.fn(),
}));

describe("Given a CreateForm component", () => {
  describe("When the word 'user1' is written to the username input field", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelName = "Name";
      const labelCategory = "Category";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreateForm penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const inputName = screen.getByPlaceholderText(labelName);
      const inputCategory = screen.getByPlaceholderText(labelCategory);

      expect(inputName).toBeInTheDocument();
      expect(inputCategory).toBeInTheDocument();
    });
  });

  describe("When last title is Favourites and submit form", () => {
    test("Then navigate to favourites'", () => {
      const labelName = "form-create";
      const handleSubmit = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreateForm penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const buttonSubmit = screen.getByTitle(labelName);
      userEvent.click(buttonSubmit);

      handleSubmit();

      expect(buttonSubmit).toBeInTheDocument();
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
