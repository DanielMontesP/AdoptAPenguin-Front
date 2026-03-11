import {
  mockEmptyDataPenguin,
  mockPenguin,
  mockPenguins,
  mockPenguinsEmpty,
} from "../../../../mocks/penguins";
import penguinReducer, {
  createPenguinActionCreator,
  deletePenguinActionCreator,
  editPenguinActionCreator,
  loadPenguinActionCreator,
  loadPenguinsActionCreator,
  resetPenguinActionCreator,
  resetPenguinsActionCreator,
  searchPenguinsActionCreator,
} from "./penguinSlice";

describe("Given the loadPenguinsActionCreator", (): void => {
  describe("When invoked", (): void => {
    test("Then the loading ui state should change to true", (): void => {
      const action = loadPenguinsActionCreator(mockPenguins);
      const loadedState = penguinReducer(
        { allPenguins: mockPenguins, penguin: mockPenguin },
        action,
      );

      expect(loadedState).toEqual({
        allPenguins: mockPenguins,
        penguin: mockPenguin,
      });
    });
  });
});

describe("Given the loadPenguinActionCreator", (): void => {
  describe("When invoked", (): void => {
    test("Then the loading ui state should change to true", (): void => {
      const action = loadPenguinActionCreator(mockPenguin);
      const loadedState = penguinReducer(
        { allPenguins: mockPenguins, penguin: mockPenguin },
        action,
      );

      expect(loadedState).toEqual({
        allPenguins: mockPenguins,
        penguin: mockPenguin,
      });
    });
  });
});

describe("Given the deletePenguinActionCreator", (): void => {
  describe("When invoked", (): void => {
    test("Then delete penguin from list", (): void => {
      const action = deletePenguinActionCreator(mockPenguin.id);
      const loadedState = penguinReducer(
        { allPenguins: mockPenguins, penguin: mockPenguin },
        action,
      );

      expect(loadedState.allPenguins.length).toEqual(1);
    });
  });
});

describe("Given the createPenguinActionCreator", (): void => {
  describe("When invoked", (): void => {
    test("Then it will create a penguin", (): void => {
      const action = createPenguinActionCreator(mockPenguin);
      const loadedState = penguinReducer(
        { allPenguins: mockPenguins, penguin: mockPenguin },
        action,
      );

      expect(loadedState).toEqual({
        allPenguins: mockPenguins,
        penguin: mockPenguin,
      });
    });
  });
});

describe("Given the editPenguinActionCreator", (): void => {
  describe("When invoked", (): void => {
    test("Then penguin will be edited", (): void => {
      const action = editPenguinActionCreator(mockPenguin);
      const loadedState = penguinReducer(
        { allPenguins: mockPenguins, penguin: mockPenguin },
        action,
      );

      expect(loadedState).toEqual({
        allPenguins: mockPenguins,
        penguin: mockPenguin,
      });
    });
  });
});

describe("Given the resetPenguinActionCreator", (): void => {
  describe("When invoked", (): void => {
    test("Then penguin data will be reseted", (): void => {
      const action = resetPenguinActionCreator(mockPenguin);
      const loadedState = penguinReducer(
        { allPenguins: mockPenguins, penguin: mockPenguin },
        action,
      );

      expect(loadedState.penguin.id).toBe("");
    });
  });
});

describe("Given resetPenguinsActionCreator", (): void => {
  describe("When  invoked", (): void => {
    test("Then  penguins data will be reseted", async (): void => {
      const action = resetPenguinsActionCreator(mockEmptyDataPenguin);
      const loadedState = penguinReducer(
        { allPenguins: mockPenguinsEmpty, penguin: mockEmptyDataPenguin },
        action,
      );

      expect(loadedState.allPenguins.length).toEqual(0);
    });
  });
});

describe("Given searchPenguinActionCreator", (): void => {
  describe("When  invoked", (): void => {
    test("Then string will be used to find penguin data matches", async (): void => {
      const action = searchPenguinsActionCreator(mockPenguins);
      const loadedState = penguinReducer(
        { allPenguins: mockPenguins, penguin: mockPenguin },
        action,
      );

      expect(loadedState).toEqual({
        allPenguins: mockPenguins,
        penguin: mockPenguin,
      });
    });
  });
});
