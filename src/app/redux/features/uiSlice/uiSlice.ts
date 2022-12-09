import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UISliceState } from "../../types/ui/uiInterfaces";

const initialState: UISliceState = {
  loading: false,
  modalMessage: "",
  modalType: "",
  headerTitle: "AdoptAPenguin.com",
  headerLastTitle: "",
  isDesktop: false,
  stringToSearch: "",
  isMenuOpen: false,
  isModalOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    loading: (ui: UISliceState, action: PayloadAction<any>) => ({
      ...ui,
      loading: true,
    }),

    finishedLoading: (ui: UISliceState, action: PayloadAction<any>) => ({
      ...ui,
      loading: false,
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

    isDesktop: (ui: UISliceState, action: PayloadAction<any>) => ({
      ...ui,
      isDesktop: action.payload,
    }),

    stringToSearch: (ui: UISliceState, action: PayloadAction<any>) => ({
      ...ui,
      stringToSearch: action.payload,
    }),

    isMenuOpen: (ui: UISliceState, action: PayloadAction<any>) => ({
      ...ui,
      isMenuOpen: action.payload,
    }),

    isModalOpen: (ui: UISliceState, action: PayloadAction<any>) => ({
      ...ui,
      isModalOpen: action.payload,
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
  isDesktop: isDesktopActionCreator,
  isMenuOpen: isMenuOpenActionCreator,
  isModalOpen: isModalOpenActionCreator,
} = uiSlice.actions;

export default uiSlice.reducer;
