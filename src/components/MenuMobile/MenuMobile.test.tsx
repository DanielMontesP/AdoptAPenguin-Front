import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Menu from "./MenuMobile";
import store from "../../app/redux/store/store";
import userEvent from "@testing-library/user-event";

describe("Given a MenuDesktop component", () => {
  describe("When bt-logout clicked", () => {
    test("Then handleLogoutCall is called", () => {
      const labelButtonLogout = "btn-logout";
      const handleLogoutCall = vi.fn();
      const handleLogoutPrompt = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Menu isMenuOpened={true} />
          </BrowserRouter>
        </Provider>,
      );

      const btLogout = screen.getByTitle(labelButtonLogout);
      expect(btLogout).toBeDefined();

      userEvent.click(btLogout);

      handleLogoutCall();
      expect(handleLogoutCall).toHaveBeenCalled();

      handleLogoutPrompt();
      expect(handleLogoutPrompt).toHaveBeenCalled();
    });
  });

  describe("When bt-about clicked", () => {
    test("Then handleAbout is called", () => {
      const labelButton = "bt-about";
      const handleAbout = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Menu isMenuOpened={true} />
          </BrowserRouter>
        </Provider>,
      );

      const btAbout = screen.getByTitle(labelButton);
      expect(btAbout).toBeDefined();

      userEvent.click(btAbout);
      handleAbout();
      expect(handleAbout).toHaveBeenCalled();
    });
  });

  describe("When bt-help clicked", () => {
    test("Then handleAbout is called", () => {
      const labelButton = "bt-help";
      const handleHelp = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Menu isMenuOpened={true} />
          </BrowserRouter>
        </Provider>,
      );

      const button = screen.getByTitle(labelButton);
      expect(button).toBeDefined();

      userEvent.click(button);
      handleHelp();
      expect(handleHelp).toHaveBeenCalled();
    });
  });

  describe("When bt-settings clicked", () => {
    test("Then handleSettings is called", () => {
      const labelButton = "bt-settings";
      const handleSettings = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Menu isMenuOpened={true} />
          </BrowserRouter>
        </Provider>,
      );

      const button = screen.getByTitle(labelButton);
      expect(button).toBeDefined();

      userEvent.click(button);
      handleSettings();
      expect(handleSettings).toHaveBeenCalled();
    });
  });

  describe("When bt-inbox clicked", () => {
    test("Then handleInbox is called", () => {
      const labelButton = "bt-view-messages";
      const handleInbox = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Menu isMenuOpened={true} />
          </BrowserRouter>
        </Provider>,
      );

      const button = screen.getByTitle(labelButton);
      expect(button).toBeDefined();

      userEvent.click(button);
      handleInbox();
      expect(handleInbox).toHaveBeenCalled();
    });
  });

  describe("When bt-favs clicked", () => {
    test("Then handleFavs is called", () => {
      const labelButton = "bt-favs";
      const handleFavs = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Menu isMenuOpened={true} />
          </BrowserRouter>
        </Provider>,
      );

      const button = screen.getByTitle(labelButton);
      expect(button).toBeDefined();

      userEvent.click(button);
      handleFavs();
      expect(handleFavs).toHaveBeenCalled();
    });
  });

  describe("When bt-likes clicked", () => {
    test("Then hanhandleLikesdleFavs is called", () => {
      const labelButton = "bt-likes";
      const handleLikes = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Menu isMenuOpened={true} />
          </BrowserRouter>
        </Provider>,
      );

      const button = screen.getByTitle(labelButton);
      expect(button).toBeDefined();

      userEvent.click(button);
      handleLikes();
      expect(handleLikes).toHaveBeenCalled();
    });
  });

  describe("When bt-home clicked", () => {
    test("Then handleHome is called", () => {
      const labelButton = "bt-home";
      const handleHome = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Menu isMenuOpened={true} />
          </BrowserRouter>
        </Provider>,
      );

      const button = screen.getByTitle(labelButton);
      expect(button).toBeDefined();

      userEvent.click(button);
      handleHome();
      expect(handleHome).toHaveBeenCalled();
    });
  });

  describe("When bt-fav clicked", () => {
    test("Then addFav is called", () => {
      const labelButton = "bt-fav";
      const addFav = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Menu isMenuOpened={true} />
          </BrowserRouter>
        </Provider>,
      );

      const button = screen.getByTitle(labelButton);
      expect(button).toBeDefined();

      userEvent.click(button);
      addFav();
      expect(addFav).toHaveBeenCalled();
    });
  });

  describe("When bt-search clicked", () => {
    test("Then handleSearchEnter is called", () => {
      const labelButton = "Home";
      const handleSearchEnter = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Menu isMenuOpened={true} />
          </BrowserRouter>
        </Provider>,
      );

      const button = screen.getByText(labelButton);
      expect(button).toBeDefined();

      handleSearchEnter();
      expect(handleSearchEnter).toHaveBeenCalled();
    });
  });

  describe("When bt-search-submit clicked", () => {
    test("Then handleSearch is called", () => {
      const labelButton = "bt-search-submit";
      const handleSearch = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Menu isMenuOpened={true} />
          </BrowserRouter>
        </Provider>,
      );

      const button = screen.getByTitle(labelButton);
      expect(button).toBeDefined();

      userEvent.click(button);

      handleSearch();
      expect(handleSearch).toHaveBeenCalled();
    });
  });
});
