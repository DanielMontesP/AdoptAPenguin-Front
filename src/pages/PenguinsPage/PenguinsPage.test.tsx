import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../app/redux/store/store";
import PenguinsPage from "./PenguinsPage";
import "../../rstyles/PagesStyles.css";
import { loadLikesThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("Given a PenguinsPage Component", () => {
  describe("When it's rendered", () => {
    test("Then it should show the role 'penguins-page'", () => {
      const expectedResult = "penguins-container";

      render(
        <Provider store={store}>
          <PenguinsPage type="Home" />
        </Provider>
      );

      const receivedResult = screen.getByTitle(expectedResult);

      expect(receivedResult).toBeInTheDocument();
    });
  });
  describe("When Likes it's rendered", () => {
    test("Then it should show the role 'penguins-page'", () => {
      const expectedResult = "penguins-container";

      const dispatch = jest.fn();

      render(
        <Provider store={store}>
          <PenguinsPage type="Likes" />
        </Provider>
      );

      const receivedResult = screen.getByTitle(expectedResult);
      dispatch(loadLikesThunk());
      expect(receivedResult).toBeInTheDocument();
      expect(dispatch).toHaveBeenCalled();
    });
  });
  describe("When Favs it's rendered", () => {
    test("Then it should show the role 'penguins-page'", () => {
      const expectedResult = "penguins-container";

      render(
        <Provider store={store}>
          <PenguinsPage type="Favorites" />
        </Provider>
      );

      const receivedResult = screen.getByTitle(expectedResult);

      expect(receivedResult).toBeInTheDocument();
    });
  });
});
