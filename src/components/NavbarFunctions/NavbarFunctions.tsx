import { KeyboardEvent } from "react";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
  isMenuOpenActionCreator,
  isModalOpenActionCreator,
  modalMessageActionCreator,
  modalTypeActionCreator,
  stringToSearchActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { editMessageThunk } from "../../app/redux/thunks/messageThunk/messageThunk";
import { searchPenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { IMessage } from "../../app/redux/types/message/messageInterfaces";

export const loadHome = (
  dispatch: any,
  headerTitle: string,

  navigate: any
): any => {
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
  dispatch(isMenuOpenActionCreator(false));
  setMenu(false);

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

export const setMessageRead = (message: IMessage, dispatch: any) => {
  const newData = { ...message };
  newData.read = !message.read ? true : false;

  dispatch(editMessageThunk(newData, "Delete Like."));
};
