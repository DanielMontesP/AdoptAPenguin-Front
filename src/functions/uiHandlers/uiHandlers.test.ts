import { handleLogout, loadFavs, loadHome, loadLikes } from "./uiHandlers";
import userEvent from "@testing-library/user-event";

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
      const stringToSearch = jest.fn();
      const dispatch = jest.fn();

      const setMenu = jest.fn();
      const headerTitle = jest.fn();
      const handleSearchEnter = jest.fn();
      userEvent.keyboard("[Enter]");

      handleSearchEnter(
        { event: { key: "[Enter]" } },
        stringToSearch,
        dispatch,
        setMenu,
        setMenu,
        headerTitle
      );

      expect(handleSearchEnter).toHaveBeenCalled();
    });
  });
});
