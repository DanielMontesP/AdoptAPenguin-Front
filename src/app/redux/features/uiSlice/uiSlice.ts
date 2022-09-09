import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { UISliceState } from "../../types/ui/uiInterfaces";

const initialState: UISliceState = {
  loading: false,
  finishedLoading: true,
  modalMessage: "",
  modalType: "",
  headerTitle: "AdoptAPenguin.com",
  headerLastTitle: "",
  apiResponse: "",
  isDesktop: false,
  stringToSearch: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    loading: (ui: UISliceState, action: PayloadAction<void>) => ({
      ...ui,
      loading: true,
      finishedLoading: false,
    }),

    finishedLoading: (ui: UISliceState, action: PayloadAction<void>) => ({
      ...ui,
      loading: false,
      finishedLoading: true,
    }),

    modalMessage: (ui: UISliceState, action: PayloadAction<string>) => ({
      ...ui,
      modalMessage: action.payload,
    }),

    modalType: (ui: UISliceState, action: PayloadAction<string>) => ({
      ...ui,
      modalType: action.payload,
    }),

    headerTitle: (ui: UISliceState, action: PayloadAction<string>) => ({
      ...ui,
      headerTitle: action.payload,
    }),

    headerLastTitle: (ui: UISliceState, action: PayloadAction<string>) => ({
      ...ui,
      headerLastTitle: action.payload,
    }),

    apiResponse: (ui: UISliceState, action: PayloadAction<any>) => ({
      ...ui,
      feedback: true,
      apiResponse: action.payload,
    }),

    cleanApiResponse: (ui: UISliceState, action: PayloadAction<void>) => ({
      ...ui,
      feedback: false,
      apiResponse: "",
    }),

    isDesktop: (ui: UISliceState, action: PayloadAction<any>) => ({
      ...ui,
      isDesktop: action.payload,
    }),

    stringToSearch: (ui: UISliceState, action: PayloadAction<any>) => ({
      ...ui,
      stringToSearch: action.payload,
    }),
  },
});

export const {
  loading: loadingActionCreator,
  finishedLoading: finishedLoadingActionCreator,
  headerTitle: headerTitleActionCreator,
  headerLastTitle: headerLastTitleActionCreator,
  stringToSearch: stringToSearchActionCreator,
  modalMessage: modalMessageActionCreator,
  modalType: modalTypeActionCreator,
  apiResponse: apiResponseActionCreator,
  cleanApiResponse: cleanApiResponseActionCreator,
  isDesktop: isDesktopActionCreator,
} = uiSlice.actions;

export const uiLoadSpinnerSelector = (state: RootState) => state.ui.loading;

export default uiSlice.reducer;
