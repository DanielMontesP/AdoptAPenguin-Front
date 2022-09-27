import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
  isMenuOpenActionCreator,
  isModalOpenActionCreator,
  modalMessageActionCreator,
  modalTypeActionCreator,
  stringToSearchActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { searchPenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";

export const loadHome = (
  dispatch: any,
  headerTitle: string,
  setMenu: any,
  navigate: any
): void => {
  setMenu(false);

  dispatch(modalTypeActionCreator(""));
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
): void => {
  dispatch(isMenuOpenActionCreator(false));
  setMenu(false);

  dispatch(modalTypeActionCreator(""));
  dispatch(headerLastTitleActionCreator(headerTitle));
  dispatch(headerTitleActionCreator("Favourites"));

  navigate("/penguins/favs");
};

export const loadLikes = (
  dispatch: any,
  headerTitle: string,
  setMenu: any,
  navigate: any
): void => {
  setMenu(false);

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
  navigate: any,
  stringToSearch: string
): void => {
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
