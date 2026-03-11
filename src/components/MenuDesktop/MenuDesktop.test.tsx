import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Menu from "./MenuDesktop";
import store from "../../app/redux/store/store";
import userEvent from "@testing-library/user-event";

describe("Given a MenuDesktop component", (): void => {
  describe("When bt-logout clicked", (): void => {
    test("Then handleLogoutCall is called", (): void => {
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

  describe("When bt-about clicked", (): void => {
    test("Then handleAbout is called", (): void => {
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

  describe("When bt-help clicked", (): void => {
    test("Then handleAbout is called", (): void => {
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

  describe("When bt-settings clicked", (): void => {
    test("Then handleSettings is called", (): void => {
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

  describe("When bt-inbox clicked", (): void => {
    test("Then handleInbox is called", (): void => {
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
});
