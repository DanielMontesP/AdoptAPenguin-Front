import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { mockPenguin } from "../../mocks/penguins";
import { mockUser } from "../../mocks/users";
import HomePage from "./HomePage";

let mockLogged = true;

jest.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({
    user: {
      logged: mockLogged,
      id: mockUser.id,
    },
    penguin: mockPenguin,
    headerTitle: "New message...",
    ui: { headerTitle: "New message..." },
  }),
  useAppDispatch: () => jest.fn(),
}));

describe("Given a HomePage Component", () => {
  describe("When it's rendered", () => {
    test("Then it should show the text 'Home'", () => {
      const expectedResult = "Home";

      const SetTitleHeader = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <HomePage />
          </BrowserRouter>
        </Provider>
      );

      const receivedResult = screen.getAllByText(expectedResult);
      SetTitleHeader();
      expect(receivedResult.length).toBe(1);
      expect(SetTitleHeader).toHaveBeenCalled();
    });
  });
});
