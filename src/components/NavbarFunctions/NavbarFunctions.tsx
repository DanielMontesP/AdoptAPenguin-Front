import { KeyboardEvent } from "react";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
  isMenuOpenActionCreator,
  isModalOpenActionCreator,
  loadingActionCreator,
  modalMessageActionCreator,
  modalTypeActionCreator,
  stringToSearchActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import {
  resetPenguinThunk,
  searchPenguinThunk,
} from "../../app/redux/thunks/penguinThunk/penguinThunk";

export const loadHome = (
  dispatch: any,
  headerTitle: string,
  navigate: any
): any => {
  dispatch(loadingActionCreator());

  dispatch(modalTypeActionCreator(""));
  dispatch(modalMessageActionCreator(""));
  dispatch(headerLastTitleActionCreator(headerTitle));
  dispatch(headerTitleActionCreator("Home"));

  navigate("/penguins");
};

export const handleLogout = (dispatch: any): void => {
  const message = "Log out?";
  const newModalType = "logOutUser";

  dispatch(modalTypeActionCreator(newModalType));
  dispatch(modalMessageActionCreator(message));

  dispatch(isMenuOpenActionCreator(false));

  dispatch(isModalOpenActionCreator(true));
};

export const loadFavs = (
  dispatch: any,
  headerTitle: string,
  setMenu: any,
  navigate: any
): any => {
  setMenu(false);

  dispatch(loadingActionCreator());
  dispatch(modalTypeActionCreator(""));
  dispatch(headerLastTitleActionCreator(headerTitle));
  dispatch(headerTitleActionCreator("Favorites"));

  navigate("/penguins/favs");
};

export const loadLikes = (
  dispatch: any,
  headerTitle: string,
  setMenu: any,
  navigate: any
): void => {
  setMenu(false);

  dispatch(loadingActionCreator());
  dispatch(modalTypeActionCreator(""));
  dispatch(headerLastTitleActionCreator(headerTitle));
  dispatch(headerTitleActionCreator("Likes"));

  navigate("/penguins/likes");
};

export const handleSearchSubmit = (
  dispatch: any,
  headerTitle: string,
  setMenu: any,
  setModal: any,
  stringToSearch: string
) => {
  setMenu(false);

  if (stringToSearch !== "") {
    dispatch(modalTypeActionCreator("FFeature"));
    dispatch(searchPenguinThunk(stringToSearch));

    dispatch(stringToSearchActionCreator(stringToSearch));
    dispatch(headerLastTitleActionCreator(headerTitle));
    dispatch(headerTitleActionCreator("Search results..."));
  } else {
    dispatch(modalTypeActionCreator("Search"));
    dispatch(modalMessageActionCreator("Please enter a search term"));
    setModal(false);
  }
};

export const handleSearchEnter = (
  event: KeyboardEvent<HTMLInputElement>,
  stringToSearch: string,
  dispatch: any,
  setModal: any,
  setMenu: any,
  headerTitle: string
) => {
  if (event.key === "Enter") {
    dispatch(stringToSearchActionCreator(stringToSearch));
    handleSearchSubmit(
      dispatch,
      headerTitle,
      setMenu,
      setModal,
      stringToSearch
    );
  }
};

export const loadHelp = (dispatch: any) => {
  dispatch(isMenuOpenActionCreator(false));

  dispatch(modalTypeActionCreator("Help"));

  dispatch(isModalOpenActionCreator(true));
};

export const loadAbout = (dispatch: any) => {
  dispatch(isMenuOpenActionCreator(false));

  dispatch(modalTypeActionCreator("About"));

  dispatch(isModalOpenActionCreator(true));
};

export const addNewFav = (dispatch: any, navigate: any) => {
  dispatch(resetPenguinThunk());

  navigate("/create");
};
