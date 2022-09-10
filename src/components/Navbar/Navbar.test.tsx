import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { headerLastTitleActionCreator } from "../../app/redux/features/uiSlice/uiSlice";
import store from "../../app/redux/store/store";
import Navbar from "./Navbar";

describe("Given a Navbar component", () => {
  describe("When it's invoked", () => {
    test("Then it should render a list of 24 item", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Detail" />
          </Provider>
        </BrowserRouter>
      );

      const expectedListsItems = screen.getAllByRole("separator");

      expect(expectedListsItems.length).toBe(2);
    });
  });

  describe("When Back action is invoked", () => {
    test("Then it should call the back action", () => {
      const handleBack = jest.fn();
      headerLastTitleActionCreator("Favourites");
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Detail" />
          </Provider>
        </BrowserRouter>
      );
      const btToCLick = screen.getAllByTitle("btn-back");

      userEvent.click(btToCLick[0]);
      handleBack();
      expect(handleBack).toHaveBeenCalled();
    });
  });

  describe("When Back with edit param  is invoked", () => {
    test("Then it should call the back action", () => {
      const handleBack = jest.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Edit..." />
          </Provider>
        </BrowserRouter>
      );
      const btToCLick = screen.getAllByTitle("btn-back");

      userEvent.click(btToCLick[0]);
      handleBack();
      expect(handleBack).toHaveBeenCalled();
    });
  });

  describe("When Back with default param  is invoked", () => {
    test("Then it should call the back action", () => {
      const handleBack = jest.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="default" />
          </Provider>
        </BrowserRouter>
      );
      const btToCLick = screen.getAllByTitle("btn-back");

      userEvent.click(btToCLick[0]);
      handleBack();
      expect(handleBack).toHaveBeenCalled();
    });
  });

  describe("When Back with Favourites param  is invoked", () => {
    test("Then it should call the back action", () => {
      const handleBack = jest.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Favourites" />
          </Provider>
        </BrowserRouter>
      );
      const btToCLick = screen.getAllByTitle("btn-back");

      userEvent.click(btToCLick[0]);
      handleBack();
      expect(handleBack).toHaveBeenCalled();
    });
  });

  describe("When bt-fav is clicked", () => {
    test("Then it should call the addFav action", () => {
      const addFav = jest.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Favourites" />
          </Provider>
        </BrowserRouter>
      );
      const btToCLick = screen.getByTitle("bt-fav");

      userEvent.click(btToCLick);
      addFav();
      expect(addFav).toHaveBeenCalled();
    });
  });
  describe("When bt-fav is clicked and menu is open", () => {
    test("Then it should call the addFav action", () => {
      const addFav = jest.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Favourites" />
          </Provider>
        </BrowserRouter>
      );
      const btToCLick = screen.getByTitle("bt-fav");

      userEvent.click(btToCLick);
      addFav();
      expect(addFav).toHaveBeenCalled();
    });
  });

  describe("When bt-home is clicked", () => {
    test("Then it should call the loadHome action", () => {
      const loadHome = jest.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Home" />
          </Provider>
        </BrowserRouter>
      );
      const btToCLick = screen.getByTitle("bt-home");

      userEvent.click(btToCLick);
      loadHome();
      expect(loadHome).toHaveBeenCalled();
    });
  });
  describe("When bt-likes is clicked", () => {
    test("Then it should call the loadLikes action", () => {
      const loadLikes = jest.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Likes" />
          </Provider>
        </BrowserRouter>
      );
      const btToCLick = screen.getByTitle("bt-likes");

      userEvent.click(btToCLick);
      loadLikes();
      expect(loadLikes).toHaveBeenCalled();
    });
  });
  describe("When bt-favs is clicked", () => {
    test("Then it should call the loadFavs action", () => {
      const loadFavs = jest.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Favourites" />
          </Provider>
        </BrowserRouter>
      );
      const btToCLick = screen.getByTitle("bt-favs");

      userEvent.click(btToCLick);
      loadFavs();
      expect(loadFavs).toHaveBeenCalled();
    });
  });
  describe("When bt-logout is clicked", () => {
    test("Then it should call the handleLogout action", () => {
      const handleLogout = jest.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Favourites" />
          </Provider>
        </BrowserRouter>
      );
      const btToCLick = screen.getByTitle("btn-logout");

      userEvent.click(btToCLick);
      handleLogout();
      expect(handleLogout).toHaveBeenCalled();
    });
  });

  describe("When headerTitle is clicked", () => {
    test("Then it should call the loadLikes action", () => {
      const loadLikes = jest.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Favourites" />
          </Provider>
        </BrowserRouter>
      );
      const btToCLick = screen.getByTitle("bt-likes");

      userEvent.click(btToCLick);
      loadLikes();
      expect(loadLikes).toHaveBeenCalled();
    });
  });

  describe("When bt-menu is clicked", () => {
    test("Then it should call the loadLikes action", () => {
      const handleMenu = jest.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Favourites" />
          </Provider>
        </BrowserRouter>
      );
      const btToCLick = screen.getByTitle("btn-menu");

      userEvent.click(btToCLick);
      handleMenu();
      expect(handleMenu).toHaveBeenCalled();
    });
  });

  describe("When bt-about is clicked", () => {
    test("Then it should call the loadLikes action", () => {
      const handleAbout = jest.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Favourites" />
          </Provider>
        </BrowserRouter>
      );
      const btToCLick = screen.getAllByTitle("bt-about");

      userEvent.click(btToCLick[0]);
      handleAbout();
      expect(handleAbout).toHaveBeenCalled();
    });
  });

  describe("When bt-help is clicked", () => {
    test("Then it should call the loadLikes action", () => {
      const handleHelp = jest.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Favourites" />
          </Provider>
        </BrowserRouter>
      );
      const btToCLick = screen.getByTitle("bt-help");

      userEvent.click(btToCLick);
      handleHelp();
      expect(handleHelp).toHaveBeenCalled();
    });
  });

  describe("When bt-search is clicked", () => {
    test("Then it should call the loadLikes action", () => {
      const handleSearch = jest.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Favourites" />
          </Provider>
        </BrowserRouter>
      );
      const btToCLick = screen.getByTitle("bt-search");

      userEvent.click(btToCLick);
      handleSearch();
      expect(handleSearch).toHaveBeenCalled();
    });
  });
});
