import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import {
  mockEmptyDataPenguin,
  mockPenguin,
  mockPenguins,
} from "../../mocks/penguins";
import { mockUser } from "../../mocks/users";
import CreateForm from "./CreateForm";

let mockLogged = true;

jest.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({
    user: {
      logged: mockLogged,
      id: mockUser.id,
    },
    headerLastTitle: "Favorites",
    headerTitle: "Favorites",
    penguins: { allPenguins: mockPenguins, penguin: mockPenguin },
  }),
  useAppDispatch: () => jest.fn(),
}));

const processEdit = jest.fn();

describe("Given a CreateForm component", () => {
  describe("When the word 'user1' is written to the username input field", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelName = "Name";
      const labelSubmit = "bt-save";
      const PlaceHolderInputImage = "image-input";

      const handleSubmit = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreateForm penguin={mockEmptyDataPenguin} />
          </BrowserRouter>
        </Provider>
      );
      const inputName = screen.getByPlaceholderText(labelName);
      const buttonSubmit = screen.getByPlaceholderText(labelSubmit);
      const inputImage = screen.getByPlaceholderText(PlaceHolderInputImage);

      userEvent.click(inputImage);

      userEvent.click(buttonSubmit);
      handleSubmit();
      processEdit(true);

      expect(inputName).toBeInTheDocument();
    });
  });
});
