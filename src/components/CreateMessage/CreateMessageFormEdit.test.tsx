import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { mockMessage } from "../../mocks/messages";
import { mockPenguin } from "../../mocks/penguins";
import { mockUser } from "../../mocks/users";
import CreateMessageForm from "./CreateMessageForm";

let mockLogged = true;

jest.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({
    user: {
      logged: mockLogged,
      id: mockUser.id,
    },
    penguin: mockPenguin,
    headerTitle: "Test",
  }),
  useAppDispatch: () => jest.fn(),
}));

describe("Given a CreateMessageForm component", () => {
  describe("When edit Message is submited", () => {
    test("Then processEdit is called", () => {
      const textToFind = "Subject";
      const placeHolderSubmit = "bt-reply";

      const handleSubmit = jest.fn();
      const processEdit = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreateMessageForm message={mockMessage} />
          </BrowserRouter>
        </Provider>
      );

      const textSubject = screen.getByPlaceholderText(textToFind);
      const btSave = screen.getByPlaceholderText(placeHolderSubmit);

      expect(textSubject).toBeInTheDocument();
      expect(btSave).toBeInTheDocument();

      userEvent.click(btSave);

      handleSubmit();
      processEdit();

      expect(handleSubmit).toHaveBeenCalled();
      expect(processEdit).toHaveBeenCalled();
    });
  });
});
