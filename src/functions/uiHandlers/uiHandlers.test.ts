import { render, screen } from "@testing-library/react";

import {
  handleFocus,
  handleLogout,
  handleNoConexion,
  handleSearchEnter,
  handleSearchSubmit,
  loadFavs,
  loadHome,
  loadLikes,
} from "./uiHandlers";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../app/redux/store/store";
import CreatePage from "../../pages/CreatePage/CreatePage";

describe("Given a loadFavs function", () => {
  describe("When called", () => {
    test("Then dispatch have to been called", () => {
      const dispatch = jest.fn();
      const setMenu = jest.fn();

      loadFavs(dispatch, "Test", setMenu);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a loadHome function", () => {
  describe("When called", () => {
    test("Then dispatch have to been called", () => {
      const dispatch = jest.fn();
      const navigate = jest.fn();

      loadHome(dispatch, "Test", navigate);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a handleLogout function", () => {
  describe("When called", () => {
    test("Then dispatch have to been called", () => {
      const dispatch = jest.fn();
      const navigate = jest.fn();

      handleLogout(dispatch, navigate);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a loadLikes function", () => {
  describe("When called", () => {
    test("Then dispatch have to been called", () => {
      const dispatch = jest.fn();
      const navigate = jest.fn();

      loadLikes(dispatch, "Test", navigate);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a handleSearchEnter function", () => {
  describe("When called", () => {
    test("Then dispatch have to been called", () => {
      const dispatch = jest.fn();
      const event: any = jest.fn();

      dispatch(handleSearchEnter(event, "", dispatch, "Test"));

      userEvent.keyboard("[Enter]");
      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a handleNoConexion function", () => {
  describe("When called", () => {
    test("Then dispatch have to been called", () => {
      const dispatch = jest.fn();

      userEvent.keyboard("[Enter]");

      dispatch(handleNoConexion(dispatch, "id"));

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a handleSearchSubmit function", () => {
  describe("When called", () => {
    test("Then dispatch have to been called", () => {
      const dispatch = jest.fn();
      const event: any = jest.fn();

      dispatch(handleSearchEnter(event, "", dispatch, "Test"));

      dispatch(handleSearchSubmit(dispatch, "", ""));

      expect(dispatch).toHaveBeenCalled();
    });
  });
  describe("When handleSearchSubmit with stringToSearch called", () => {
    test("Then dispatch have to been called", () => {
      const dispatch = jest.fn();
      const event: any = jest.fn();

      dispatch(handleSearchEnter(event, "", dispatch, "Test"));

      dispatch(handleSearchSubmit(dispatch, "Test", "Test"));

      expect(dispatch).toHaveBeenCalled();
    });
  });
});
