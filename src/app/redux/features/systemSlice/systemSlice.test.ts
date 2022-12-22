import { mockProcesses } from "../../../../mocks/system";
import systemReducer, {
  serverLoadingActionCreator,
  serverFinishedLoadActionCreator,
} from "./systemSlice";

describe("Given the loadPenguinsActionCreator", () => {
  describe("When invoked", () => {
    test("Then the loading ui state should change to true", () => {
      const action = serverLoadingActionCreator(mockProcesses);
      const loadedState = systemReducer(
        {
          allProcess: mockProcesses,
          server: { path: "Test", connected: true, status: "Test" },
        },
        action
      );

      expect(loadedState).toEqual({
        allProcess: mockProcesses,
        loading: true,
        server: { connected: true, status: "Test", path: "Test" },
      });
    });
  });
});

describe("Given the serverFinishedLoadActionCreator", () => {
  describe("When invoked", () => {
    test("Then the loading ui state should change to true", () => {
      const action = serverFinishedLoadActionCreator(mockProcesses);
      const loadedState = systemReducer(
        {
          allProcess: mockProcesses,
          server: { path: "Test", connected: false, status: "Test" },
        },
        action
      );

      expect(loadedState).toEqual({
        allProcess: mockProcesses,
        loading: false,
        server: { connected: false, status: "Test", path: "Test" },
      });
    });
  });
});
