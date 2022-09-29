import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NavDesktop from "./NavDesktop";
import store from "../../app/redux/store/store";
import userEvent from "@testing-library/user-event";

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

describe("Given a NavWellcome with headerTitle Favourites", () => {
  describe("When rendered", () => {
    test("Then AdoptApenguin.com have to been in the document", () => {
      const stringToFind = "AdoptApenguin.com";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavDesktop headerTitle="Favourites" />
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
      const labelAddFav = "desktop-btn-menu";

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

      const labelAbout = "bt-about";
      const labelLogout = "desktop-btn-logout";
      const labelSearch = "bt-search-submit";
      const labelHelp = "desktop-btn-help";
      const labelSearch2 = "bt-search";
      const searchPlaceHolderText = "Search by name or category...";

      const labelHome = "btn-home";
      const labelFavs = "btn-favs";
      const labelLikes = "btn-likes";

      const handleAbout = jest.fn();
      const handleLogoutCall = jest.fn();
      const handleSearch = jest.fn();
      const handleHelp = jest.fn();
      const handleSearchSubmitCall = jest.fn();
      const handleSearchChange = jest.fn();
      const handleSearchEnter = jest.fn();

      const loadHomeCall = jest.fn();
      const loadLikesCall = jest.fn();
      const loadFavsCall = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavDesktop headerTitle="Home" />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByText(stringToFind);
      expect(label).toBeInTheDocument();

      const button1 = screen.getByTitle(labelLogout);
      userEvent.click(button1);

      handleLogoutCall();
      expect(handleLogoutCall).toHaveBeenCalled();

      const button2 = screen.getAllByTitle(labelAbout);
      userEvent.click(button2[0]);

      handleAbout();
      expect(handleAbout).toHaveBeenCalled();

      const button3 = screen.getByTitle(labelHelp);
      userEvent.click(button3);

      handleHelp();
      expect(handleHelp).toHaveBeenCalled();

      const button4 = screen.getAllByTitle(labelSearch);
      userEvent.click(button4[0]);

      handleSearchSubmitCall();
      expect(handleSearchSubmitCall).toHaveBeenCalled();

      const button5 = screen.getAllByTitle(labelSearch2);
      userEvent.click(button5[0]);

      handleSearch();
      expect(handleSearch).toHaveBeenCalled();

      const inputSearch = screen.getAllByPlaceholderText(searchPlaceHolderText);
      userEvent.type(inputSearch[0], "test");

      handleSearchChange();
      expect(handleSearchChange).toHaveBeenCalled();

      userEvent.type(inputSearch[0], "Enter");

      handleSearchEnter({ event: { key: "Enter" } });
      expect(handleSearchEnter).toHaveBeenCalled();

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
    });
  });
});
