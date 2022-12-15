import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../app/redux/store/store";
import PenguinsPage from "./PenguinsPage";
import PenguinsPageStyles from "../../styles/PagesStyles";
import { mockPenguins } from "../../mocks/penguins";
import { mockloggedUser } from "../../mocks/users";
import axios from "axios";
import { loadLikesThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("Given a PenguinsPage Component", () => {
  describe("When it's rendered", () => {
    test("Then it should show the role 'penguins-page'", () => {
      const expectedResult = "penguins-page";

      render(
        <Provider store={store}>
          <PenguinsPageStyles role={"penguins-page"}>
            <PenguinsPage type="Home" />
          </PenguinsPageStyles>
        </Provider>
      );

      const receivedResult = screen.getByRole(expectedResult);

      expect(receivedResult).toBeInTheDocument();
    });
  });
  describe("When Likes it's rendered", () => {
    test("Then it should show the role 'penguins-page'", () => {
      const expectedResult = "penguins-page";

      const dispatch = jest.fn();

      render(
        <Provider store={store}>
          <PenguinsPageStyles role={"penguins-page"}>
            <PenguinsPage type="Likes" />
          </PenguinsPageStyles>
        </Provider>
      );

      const receivedResult = screen.getByRole(expectedResult);
      dispatch(loadLikesThunk());
      expect(receivedResult).toBeInTheDocument();
      expect(dispatch).toHaveBeenCalled();
    });
  });
  describe("When Favs it's rendered", () => {
    test("Then it should show the role 'penguins-page'", () => {
      const expectedResult = "penguins-page";

      render(
        <Provider store={store}>
          <PenguinsPageStyles role={"penguins-page"}>
            <PenguinsPage type="Favorites" />
          </PenguinsPageStyles>
        </Provider>
      );

      const receivedResult = screen.getByRole(expectedResult);

      expect(receivedResult).toBeInTheDocument();
    });
  });
});
