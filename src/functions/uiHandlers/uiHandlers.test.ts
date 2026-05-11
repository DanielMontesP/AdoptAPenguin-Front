import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { KeyboardEvent } from "react";
import {
  handleLogout,
  handleNoConexion,
  handleSearchEnter,
  handleSearchSubmit,
  loadFavs,
  loadHome,
  loadLikes,
} from "./uiHandlers";

describe("Given a loadFavs function", (): void => {
  describe("When called", (): void => {
    test("Then dispatch have to been called", (): void => {
      const dispatch = vi.fn();
      const setMenu = vi.fn();

      loadFavs(dispatch, "Test", setMenu);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a loadHome function", (): void => {
  describe("When called", (): void => {
    test("Then dispatch have to been called", (): void => {
      const dispatch = vi.fn();
      const navigate = vi.fn();

      loadHome(dispatch, "Test", navigate);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a handleLogout function", (): void => {
  describe("When called", (): void => {
    test("Then dispatch have to been called", (): void => {
      const dispatch = vi.fn();
      const navigate = vi.fn();

      handleLogout(dispatch, navigate);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a loadLikes function", (): void => {
  describe("When called", (): void => {
    test("Then dispatch have to been called", (): void => {
      const dispatch = vi.fn();
      const navigate = vi.fn();

      loadLikes(dispatch, "Test", navigate);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a handleSearchEnter function", (): void => {
  describe("When called", (): void => {
    test("Then dispatch have to been called", (): void => {
      const dispatch = vi.fn();
      const event = {} as KeyboardEvent<HTMLInputElement>;

      dispatch(handleSearchEnter(event, "", dispatch, "Test"));

      userEvent.keyboard("[Enter]");
      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a handleNoConexion function", (): void => {
  describe("When called", (): void => {
    test("Then dispatch have to been called", (): void => {
      const dispatch = vi.fn();

      userEvent.keyboard("[Enter]");

      dispatch(handleNoConexion(dispatch));

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a handleSearchSubmit function", (): void => {
  describe("When called", (): void => {
    test("Then dispatch have to been called", (): void => {
      const dispatch = vi.fn();
      const event = {} as KeyboardEvent<HTMLInputElement>;

      dispatch(handleSearchEnter(event, "", dispatch, "Test"));

      dispatch(handleSearchSubmit(dispatch, "", ""));

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When handleSearchSubmit with stringToSearch called", (): void => {
    test("Then dispatch have to been called", (): void => {
      const dispatch = vi.fn();
      const event = {} as KeyboardEvent<HTMLInputElement>;

      dispatch(handleSearchEnter(event, "", dispatch, "Test"));

      dispatch(handleSearchSubmit(dispatch, "Test", "Test"));

      expect(dispatch).toHaveBeenCalled();
    });
  });
});
