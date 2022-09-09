import uiReducer, {
  loadingActionCreator,
  finishedLoadingActionCreator,
  apiResponseActionCreator,
  cleanApiResponseActionCreator,
  modalMessageActionCreator,
  isDesktopActionCreator,
} from "./uiSlice";

const initialState = {
  loading: false,
  finishedLoading: true,
  modalMessage: "",
  modalType: "",
  feedback: false,
  headerTitle: "",
  headerLastTitle: "",
  apiResponse: "",
  isDesktop: false,
  stringToSearch: "",
};

const expectedState = {
  loading: false,
  finishedLoading: true,
  modalMessage: "",
  modalType: "",
  feedback: true,
  headerTitle: "",
  headerLastTitle: "",
  apiResponse: "Message",
  isDesktop: false,
  stringToSearch: "",
};

const expectedLoadingState = {
  loading: true,
  finishedLoading: false,
  modalMessage: "",
  modalType: "",
  feedback: true,
  headerTitle: "",
  headerLastTitle: "",
  apiResponse: "Message",
  isDesktop: false,
  stringToSearch: "",
};
describe("Given the loadingActionCreator", () => {
  describe("When invoked", () => {
    test("Then the loading ui state should change to true", () => {
      const action = loadingActionCreator();
      const loadedState = uiReducer(expectedLoadingState, action);

      expect(loadedState).toEqual(expectedLoadingState);
    });
  });
});

describe("Given the finiushedLoadingActionCreator", () => {
  describe("When invoked", () => {
    test("Then the loading ui state should change to false", () => {
      const action = finishedLoadingActionCreator();
      const loadedState = uiReducer(expectedState, action);

      expect(loadedState).toEqual(expectedState);
    });
  });
});

describe("Given the apiResponse", () => {
  describe("When invoked", () => {
    test("Then the feedback ui state should change to true and the given message should be added", () => {
      const action = apiResponseActionCreator("Message");
      const loadedState = uiReducer(initialState, action);

      expect(loadedState).toEqual(expectedState);
    });
  });
});

describe("Given the cleanApiResponse", () => {
  describe("When invoked", () => {
    test("Then the feedback ui state should change to true", () => {
      const action = cleanApiResponseActionCreator();
      const loadedState = uiReducer(initialState, action);

      expect(loadedState).toEqual(initialState);
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
