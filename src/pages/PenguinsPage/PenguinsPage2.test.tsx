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
    headerTitle: "Likes",
    modalType: "",
  }),
  useAppDispatch: () => vi.fn(),
}));

describe("Given Favs it's rendered", (): void => {
  describe("When Favs it's rendered", (): void => {
    test("Then it should show the role 'penguins-page'", (): void => {
      const expectedResult = "penguins-container";
      const loadLikesThunk = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <PenguinsPage type="Likes" />
          </BrowserRouter>
        </Provider>,
      );

      const receivedResult = screen.getByTitle(expectedResult);

      loadLikesThunk();
      expect(receivedResult).toBeDefined();
      expect(loadLikesThunk).toHaveBeenCalled();
    });
  });
});
