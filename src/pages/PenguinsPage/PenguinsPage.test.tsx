import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../app/redux/store/store";
import PenguinsPage from "./PenguinsPage";
import "../../styles/PagesStyles.css";
import { loadLikesThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { mockPenguin, mockPenguins } from "../../mocks/penguins";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({
    connected: true,
    headerTitle: "Favorites",
    penguin: mockPenguin,
    penguins: { allPenguins: mockPenguins, penguin: mockPenguin },
    allPenguins: mockPenguins,
  }),
  useAppDispatch: () => vi.fn(),
}));

describe("Given page of penguins", (): void => {
  describe("When type Likes it's rendered", (): void => {
    test("Then it should show a div with title 'penguins-container'", (): void => {
      const expectedResult = "penguins-container";

      const dispatch = vi.fn();

      render(
        <Provider store={store}>
          <PenguinsPage type="Likes" />
        </Provider>,
      );

      const receivedResult = screen.getByTitle(expectedResult);
      dispatch(loadLikesThunk());
      expect(receivedResult).toBeDefined();
    });
  });
});
