import { handleLogout, loadFavs, loadHome, loadLikes } from "./NavbarFunctions";

describe("Given a loadFavs function", () => {
  describe("When called", () => {
    test("Then dispatch have to been called", () => {
      const dispatch = jest.fn();
      const setMenu = jest.fn();
      const setModal = jest.fn();

      loadFavs(dispatch, "Test", setMenu, setModal);

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

      handleLogout(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a loadLikes function", () => {
  describe("When called", () => {
    test("Then dispatch have to been called", () => {
      const dispatch = jest.fn();
      const setMenu = jest.fn();
      const navigate = jest.fn();

      loadLikes(dispatch, "Test", setMenu, navigate);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});
