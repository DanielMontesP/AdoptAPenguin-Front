import { render, screen } from "@testing-library/react";
import store from "../../app/redux/store/store";
import { Provider } from "react-redux";
import PenguinsPage from "./PenguinsPage";
import { mockPenguins } from "../../mocks/penguins";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({
    allPenguins: mockPenguins,
    headerTitle: "Favorites",
    modalType: "",
  }),
  useAppDispatch: () => jest.fn(),
}));

describe("Given Favorites it's rendered", () => {
  describe("When Favorites it's rendered", () => {
    test("Then it should show the role 'penguins-page'", () => {
      const expectedResult = "penguins-container";
      const loadFavsThunk = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <PenguinsPage type="Favorites" />
          </BrowserRouter>
        </Provider>
      );

      const receivedResult = screen.getByTitle(expectedResult);

      loadFavsThunk();
      expect(receivedResult).toBeInTheDocument();
      expect(loadFavsThunk).toHaveBeenCalled();
    });
  });
});
