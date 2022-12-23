import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NavDesktop from "./NavDesktop";
import store from "../../app/redux/store/store";
import userEvent from "@testing-library/user-event";
import { handleSearchEnter } from "../../functions/uiHandlers/uiHandlers";

describe("Given a NavDesktop component", () => {
  describe("When click AddFav", () => {
    test("Then AddFav have to been called", () => {
      const stringToFind = "AdoptApenguin.com";
      const labelAddFav = "btn-addFav";

      const addFav = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavDesktop headerTitle="Home" />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByText(stringToFind);
      expect(label).toBeInTheDocument();

      const buttonAddFav = screen.getByTitle(labelAddFav);
      userEvent.click(buttonAddFav);

      addFav();
      expect(addFav).toHaveBeenCalled();
    });
  });
});

describe("Given a NavWellcome component", () => {
  describe("When headerTitle is New...", () => {
    test("Then AdoptApenguin.com have to been in the document", () => {
      const stringToFind = "AdoptApenguin.com";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavDesktop headerTitle="New..." />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByText(stringToFind);
      expect(label).toBeInTheDocument();
    });
  });
});

describe("Given a NavWellcome with headerTitle  Likes", () => {
  describe("When rendered", () => {
    test("Then AdoptApenguin.com have to been in the document", () => {
      const stringToFind = "AdoptApenguin.com";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavDesktop headerTitle="Likes" />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByText(stringToFind);
      expect(label).toBeInTheDocument();
    });
  });
});

describe("Given a NavWellcome with headerTitle Favorites", () => {
  describe("When rendered", () => {
    test("Then AdoptApenguin.com have to been in the document", () => {
      const stringToFind = "AdoptApenguin.com";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavDesktop headerTitle="Favorites" />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByText(stringToFind);
      expect(label).toBeInTheDocument();
    });
  });
});

describe("Given a handleMenu button NavDesktop component", () => {
  describe("When click handleMenu", () => {
    test("Then AddFav have to been called", () => {
      const stringToFind = "AdoptApenguin.com";
      const labelAddFav = "btn-addFav";

      const handleMenu = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavDesktop headerTitle="Home" />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByText(stringToFind);
      expect(label).toBeInTheDocument();

      const buttonAddFav = screen.getByTitle(labelAddFav);
      userEvent.click(buttonAddFav);

      handleMenu();
      expect(handleMenu).toHaveBeenCalled();
    });
  });
});

describe("Given a handleLogoutCall button NavDesktop component", () => {
  describe("When click handleMenu", () => {
    test("Then AddFav have to been called", () => {
      const stringToFind = "AdoptApenguin.com";

      const labelHome = "btn-home";
      const labelFavs = "btn-favs";
      const labelLikes = "btn-likes";
      const loadHomeCall = jest.fn();
      const loadLikesCall = jest.fn();
      const loadFavsCall = jest.fn();
      const handleSearchEnter = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavDesktop headerTitle="Home" />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByText(stringToFind);
      expect(label).toBeInTheDocument();

      const button6 = screen.getByTitle(labelHome);
      userEvent.click(button6);

      loadHomeCall();
      expect(loadHomeCall).toHaveBeenCalled();

      const button7 = screen.getByTitle(labelFavs);
      userEvent.click(button7);

      loadFavsCall();
      expect(loadFavsCall).toHaveBeenCalled();

      const button8 = screen.getByTitle(labelLikes);
      userEvent.click(button8);

      loadLikesCall();
      expect(loadLikesCall).toHaveBeenCalled();

      const button9 = screen.getByTitle("bt-search");
      userEvent.click(button9);

      handleSearchEnter();
      expect(handleSearchEnter).toHaveBeenCalled();
    });
  });
});
