import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { mockPenguin } from "../../mocks/penguins";
import { mockUser } from "../../mocks/users";
import HomePage from "./HomePage";

let mockLogged = true;

vi.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({
    user: {
      logged: mockLogged,
      id: mockUser.id,
    },
    penguin: mockPenguin,
    headerTitle: "New message...",
  }),
  useAppDispatch: () => vi.fn(),
}));

describe("Given a HomePage Component", (): void => {
  describe("When it's rendered", (): void => {
    test("Then it should show the text 'Login'", (): void => {
      const expectedResult = "Adopt Apenguin .com";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <HomePage />
          </BrowserRouter>
        </Provider>,
      );

      const receivedResult = screen.getByText(expectedResult);

      expect(receivedResult).toBeDefined();
    });
  });
});
