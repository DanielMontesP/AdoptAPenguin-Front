import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import store from "../../app/redux/store/store";
import { Provider } from "react-redux";
import PenguinsPage from "./PenguinsPage";
import { mockPenguins } from "../../mocks/penguins";
import { BrowserRouter } from "react-router-dom";

vi.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({
    allPenguins: mockPenguins,
    headerTitle: "Favorites",
    modalType: "",
  }),
  useAppDispatch: () => vi.fn(),
}));

describe("Given Favorites it's rendered", (): void => {
  describe("When Favorites it's rendered", (): void => {
    test("Then it should show the role 'penguins-page'", (): void => {
      const expectedResult = "penguins-container";
      const loadFavsThunk = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <PenguinsPage type="Favorites" />
          </BrowserRouter>
        </Provider>,
      );

      const receivedResult = screen.getByTitle(expectedResult);

      loadFavsThunk();
      expect(receivedResult).toBeDefined();
      expect(loadFavsThunk).toHaveBeenCalled();
    });
  });
});
