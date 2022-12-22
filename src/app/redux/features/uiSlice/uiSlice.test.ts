import uiReducer, {
  loadingActionCreator,
  finishedLoadingActionCreator,
  modalMessageActionCreator,
  isDesktopActionCreator,
  stringToSearchActionCreator,
  isSearchOpenActionCreator,
} from "./uiSlice";

const initialState = {
  loading: false,
  modalMessage: "",
  modalType: "",
  feedback: false,
  headerTitle: "",
  headerLastTitle: "",
  isDesktop: false,
  stringToSearch: "search",
  isMenuOpen: false,
  isModalOpen: false,
  isSearchOpen: false,
};

const expectedState = {
  loading: false,
  modalMessage: "",
  modalType: "",
  feedback: true,
  headerTitle: "",
  headerLastTitle: "",
  isDesktop: false,
  stringToSearch: "search",
  isMenuOpen: false,
  isModalOpen: false,
  isSearchOpen: false,
};

const expectedLoadingState = {
  loading: true,
  modalMessage: "",
  modalType: "",
  feedback: true,
  headerTitle: "",
  headerLastTitle: "",
  isDesktop: false,
  stringToSearch: "",
  isMenuOpen: false,
  isModalOpen: false,
  isSearchOpen: false,
};

const process = {
  loadedProcess: { process: "Loading LoadHome", loading: true },
};

describe("Given the loadingActionCreator", () => {
  describe("When invoked", () => {
    test("Then the loading ui state should change to true", () => {
      const action = loadingActionCreator(process);
      const loadedState = uiReducer(expectedLoadingState, action);

      expect(loadedState).toEqual(expectedLoadingState);
    });
  });
});

describe("Given the finiushedLoadingActionCreator", () => {
  describe("When invoked", () => {
    test("Then the loading ui state should change to false", () => {
      const action = finishedLoadingActionCreator("loadingActionCreator");
      const loadedState = uiReducer(expectedState, action);

      expect(loadedState).toEqual(expectedState);
    });
  });
});

describe("Given the modalMessage", () => {
  describe("When invoked", () => {
    test("Then the feedback ui state should change to true", () => {
      const action = modalMessageActionCreator("");
      const loadedState = uiReducer(initialState, action);

      expect(loadedState).toEqual(initialState);
    });
  });

  describe("Given the isDesktopActionCreator", () => {
    describe("When invoked", () => {
      test("Then the feedback ui state should change to true", () => {
        const action = isDesktopActionCreator(false);
        const loadedState = uiReducer(initialState, action);

        expect(loadedState).toEqual(initialState);
      });
    });
  });
});
describe("Given the stringToSearchActionCreator", () => {
  describe("When invoked", () => {
    test("Then the feedback ui state should change", () => {
      const action = stringToSearchActionCreator("search");
      const loadedState = uiReducer(expectedState, action);

      expect(loadedState).toEqual(expectedState);
    });
  });
});

describe("Given the isSearchOpenActionCreator", () => {
  describe("When invoked", () => {
    test("Then the feedback ui state should change", () => {
      const action = isSearchOpenActionCreator(false);
      const loadedState = uiReducer(expectedState, action);

      expect(loadedState).toEqual(expectedState);
    });
  });
});
