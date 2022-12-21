import { render, screen } from "@testing-library/react";
import store from "../../app/redux/store/store";
import { Provider } from "react-redux";
import PenguinsPage from "./PenguinsPage";
import { mockPenguins } from "../../mocks/penguins";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({
    allPenguins: mockPenguins,
    headerTitle: "Likes",
    modalType: "",
  }),
  useAppDispatch: () => jest.fn(),
}));

describe("Given Favs it's rendered", () => {
  describe("When Favs it's rendered", () => {
    test("Then it should show the role 'penguins-page'", () => {
      const expectedResult = "penguins-container";
      const loadLikesThunk = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <PenguinsPage type="Likes" />
          </BrowserRouter>
        </Provider>
      );

      const receivedResult = screen.getByTitle(expectedResult);

      loadLikesThunk();
      expect(receivedResult).toBeInTheDocument();
      expect(loadLikesThunk).toHaveBeenCalled();
    });
  });
});
