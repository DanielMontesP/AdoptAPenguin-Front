import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../app/redux/store/store";
import PenguinsPage from "./PenguinsPage";
import PenguinsPageStyles from "../../Styles/PagesStyles";

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

      render(
        <Provider store={store}>
          <PenguinsPageStyles role={"penguins-page"}>
            <PenguinsPage type="Likes" />
          </PenguinsPageStyles>
        </Provider>
      );

      const receivedResult = screen.getByRole(expectedResult);

      expect(receivedResult).toBeInTheDocument();
    });
  });
  describe("When Favs it's rendered", () => {
    test("Then it should show the role 'penguins-page'", () => {
      const expectedResult = "penguins-page";

      render(
        <Provider store={store}>
          <PenguinsPageStyles role={"penguins-page"}>
            <PenguinsPage type="Favourites" />
          </PenguinsPageStyles>
        </Provider>
      );

      const receivedResult = screen.getByRole(expectedResult);

      expect(receivedResult).toBeInTheDocument();
    });
  });
});
