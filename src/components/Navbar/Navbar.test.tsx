import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import Navbar from "./Navbar";

describe("Given a Navbar component", () => {
  describe("When it's invoked", () => {
    test("Then it should render a list of 2 separators", () => {
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

  describe("When bt-fav is clicked", () => {
    test("Then it should call the addFav action", () => {
      const addFav = jest.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Favorites" />
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
            <Navbar headerTitle="Favorites" />
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
      jest.mock("react", () => ({
        ...jest.requireActual("react"),
        isMenuOpen: () => true,
        useState: () => jest.fn().mockReturnValue(true),
      }));
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Favorites" />
          </Provider>
        </BrowserRouter>
      );
      const btToCLick = screen.getByTitle("bt-favs");

      userEvent.click(btToCLick);
      loadFavs();
      expect(loadFavs).toHaveBeenCalled();
    });
  });

  describe("When loadLikes is clicked", () => {
    test("Then it should call the loadLikes action", () => {
      const loadLikes = jest.fn();

      jest.mock("react", () => ({
        ...jest.requireActual("react"),
        isMenuOpen: () => true,
        useState: () => jest.fn().mockResolvedValue(true),
      }));

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Favorites" />
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
            <Navbar headerTitle="Favorites" />
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
            <Navbar headerTitle="Favorites" />
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
            <Navbar headerTitle="Favorites" />
          </Provider>
        </BrowserRouter>
      );
      const btToCLick = screen.getByTitle("bt-help");

      userEvent.click(btToCLick);
      handleHelp();
      expect(handleHelp).toHaveBeenCalled();
    });
  });
  describe("When header is New...", () => {
    test("Then it should call the loadLikes action", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="New..." />
          </Provider>
        </BrowserRouter>
      );
      const headerTitle = screen.getAllByText("New...");

      expect(headerTitle.length).toBeGreaterThan(1);
    });
  });
});

describe("Given a Search components", () => {
  describe("When button search (bt-search) is clicked", () => {
    test("Then it should call the handleFocus function", () => {
      const titleSearchButton = "bt-search";

      const placeHolderSearchInput = "Search by name/category/description...";

      const handleFocus = jest.fn();
      const handleSearchChange = jest.fn();
      const handleSearchSubmit = jest.fn();
      const handleSearchEnter = jest.fn();
      jest.mock("../../app/redux/hooks/hooks", () => ({
        useAppSelector: jest.fn().mockReturnValue("test"),
      }));

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Favorites" />
          </Provider>
        </BrowserRouter>
      );

      const btToCLick = screen.getByTitle(titleSearchButton);
      const inputSearch = screen.getByPlaceholderText(placeHolderSearchInput);
      const btToCLickSubmit = screen.getByTitle("bt-search-submit");

      userEvent.click(btToCLick);
      userEvent.type(inputSearch, "Enter");
      userEvent.click(btToCLickSubmit);

      handleSearchChange();
      handleFocus(".search-input");
      handleSearchEnter({ event: { key: "Enter" } });
      handleSearchSubmit();

      expect(handleSearchChange).toHaveBeenCalled();
      expect(handleFocus).toHaveBeenCalled();
      expect(handleSearchEnter).toHaveBeenCalled();
      expect(handleSearchSubmit).toHaveBeenCalled();
    });
  });
});
