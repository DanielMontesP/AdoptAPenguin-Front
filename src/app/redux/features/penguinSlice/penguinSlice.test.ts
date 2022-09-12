import {
  mockEmptyDataPenguin,
  mockPenguin,
  mockPenguins,
  mockPenguinsEmpty,
} from "../../../../mocks/penguins";
import { IPenguin } from "../../types/penguin/penguinInterfaces";
import penguinReducer, {
  createPenguinActionCreator,
  deletePenguinActionCreator,
  editPenguinActionCreator,
  loadPenguinActionCreator,
  loadPenguinsActionCreator,
  resetPenguinActionCreator,
  resetPenguinsActionCreator,
} from "./penguinSlice";

interface SliceIniState {
  allPenguins: IPenguin[];
  penguin: IPenguin;
}

describe("Given the loadPenguinsActionCreator", () => {
  describe("When invoked", () => {
    test("Then the loading ui state should change to true", () => {
      const action = loadPenguinsActionCreator(mockPenguins);
      const loadedState = penguinReducer(
        { allPenguins: mockPenguins, penguin: mockPenguin },
        action
      );

      expect(loadedState).toEqual({
        allPenguins: mockPenguins,
        penguin: mockPenguin,
      });
    });
  });
});

describe("Given the loadPenguinActionCreator", () => {
  describe("When invoked", () => {
    test("Then the loading ui state should change to true", () => {
      const action = loadPenguinActionCreator(mockPenguin);
      const loadedState = penguinReducer(
        { allPenguins: mockPenguins, penguin: mockPenguin },
        action
      );

      expect(loadedState).toEqual({
        allPenguins: mockPenguins,
        penguin: mockPenguin,
      });
    });
  });
});

describe("Given the deletePenguinActionCreator", () => {
  describe("When invoked", () => {
    test("Then delete penguin from list", () => {
      const action = deletePenguinActionCreator(mockPenguin.id);
      const loadedState = penguinReducer(
        { allPenguins: mockPenguins, penguin: mockPenguin },
        action
      );

      const initialState: SliceIniState = {
        allPenguins: [],
        penguin: {
          id: "",
          name: "",
          category: "",
          image: "",
          imageBackup: "",
          imageResized: "",
          likes: 0,
          likers: [],
          favs: [],
          description: "",
        },
      };
      expect(loadedState).toEqual({
        allPenguins: mockPenguins,
        penguin: initialState.penguin,
      });
    });
  });
});

describe("Given the createPenguinActionCreator", () => {
  describe("When invoked", () => {
    test("Then the load list with new record", () => {
      const action = createPenguinActionCreator(mockPenguin);
      const loadedState = penguinReducer(
        { allPenguins: mockPenguins, penguin: mockPenguin },
        action
      );

      expect(loadedState).toEqual({
        allPenguins: mockPenguins,
        penguin: mockPenguin,
      });
    });
  });
});

describe("Given the editPenguinActionCreator", () => {
  describe("When invoked", () => {
    test("Then the load list with record edited", () => {
      const action = editPenguinActionCreator(mockPenguin);
      const loadedState = penguinReducer(
        { allPenguins: mockPenguins, penguin: mockPenguin },
        action
      );

      expect(loadedState).toEqual({
        allPenguins: mockPenguins,
        penguin: mockPenguin,
      });
    });
  });
});

describe("Given the resetPenguinActionCreator", () => {
  describe("When invoked", () => {
    test("Then the load list with record edited", () => {
      const action = resetPenguinActionCreator(mockPenguin);
      const loadedState = penguinReducer(
        { allPenguins: mockPenguins, penguin: mockPenguin },
        action
      );

      expect(loadedState).toEqual({
        allPenguins: mockPenguins,
        penguin: mockPenguin,
      });
    });
  });
});

describe("Given resetPenguinsActionCreator", () => {
  describe("When  invoked", () => {
    test("Then the load list with record edited", async () => {
      const action = resetPenguinsActionCreator(mockEmptyDataPenguin);
      const loadedState = penguinReducer(
        { allPenguins: mockPenguinsEmpty, penguin: mockEmptyDataPenguin },
        action
      );

      expect(loadedState).toEqual({
        allPenguins: mockPenguinsEmpty,
        penguin: mockEmptyDataPenguin,
      });
    });
  });
});
