import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { mockloggedUser } from "../../mocks/users";
import ScrollToTop from "./ScrollToTop";
import { mockPenguins } from "../../mocks/penguins";

describe("Given a ScrollToTop Component", () => {
  describe("When it's rendered", () => {
    test("Then it should render messages-container div'", () => {
      const expectedResult = "scroll-top-container";

      jest.mock("../../app/redux/hooks/hooks", () => ({
        useAppSelector: () => ({
          logged: mockloggedUser,
          headerTitle: "Favorites",
          penguins: { allPenguins: { mockPenguins } },
          allPenguins: { mockPenguins },
          showTopBtn: 500,
          id: "idUser1",
        }),

        useAppDispatch: () => jest.fn(),
      }));

      jest.mock("react", () => ({
        ...jest.requireActual("react"),
        useState: () => ({ showTopBtn: 500 }),
      }));

      render(
        <Provider store={store}>
          <BrowserRouter>
            <ScrollToTop />
          </BrowserRouter>
        </Provider>
      );
      const scrollContainer = screen.getByTitle(expectedResult);
      expect(scrollContainer).toBeInTheDocument();
    });
  });
});
