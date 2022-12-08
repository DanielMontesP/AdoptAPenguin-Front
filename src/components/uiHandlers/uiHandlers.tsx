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
import {
  resetPenguinsThunk,
  resetPenguinThunk,
  searchPenguinThunk,
} from "../../app/redux/thunks/penguinThunk/penguinThunk";
import {
  resetMessagesThunk,
  resetMessageThunk,
} from "../../app/redux/thunks/messageThunk/messageThunk";
import { logOutActionCreator } from "../../app/redux/features/userSlice/userSlice";
import { AppDispatch } from "../../app/redux/store/store";
import { handleServerInfo } from "../../utils/utils";

let firstLoad = true;

export const loadHome = (
  dispatch: any,
  headerTitle: string,
  navigate: any,
  setMenu: any
): any => {
  setMenu(false);

  dispatch(modalTypeActionCreator(""));
  dispatch(headerLastTitleActionCreator(headerTitle));
  dispatch(headerTitleActionCreator("Home"));

  navigate("/penguins");
};

export const handleLogoutPrompt = (dispatch: any, navigate: any): void => {
  const message = "Log out?";
  const newModalType = "logOutUser";

  dispatch(modalTypeActionCreator(newModalType));
  dispatch(modalMessageActionCreator(message));

  dispatch(isMenuOpenActionCreator(false));
  dispatch(isModalOpenActionCreator(true));
};

export const handleLogout = (dispatch: any, navigate: any): void => {
  dispatch(logOutActionCreator());

  dispatch(resetMessagesThunk);
  dispatch(resetMessageThunk);

  dispatch(resetPenguinsThunk);

  localStorage.removeItem("token");

  navigate("/");
};

export const loadFavs = (
  dispatch: any,
  headerTitle: string,
  setMenu: any,
  navigate: any
): any => {
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

export const handleNoConexion = (dispatch: any, idUser: string) => {
  let textNoConnection = "";
  const textFirstLoad =
    "Sorry, server is still starting. Data will be not editable";
  const textNextLoadsNoConnection =
    "Please try again in few seconds. Service render.com is still initializing";

  if (firstLoad) {
    textNoConnection = textFirstLoad;
    firstLoad = false;
  } else {
    textNoConnection = textNextLoadsNoConnection;
  }
  dispatch(modalTypeActionCreator("Server"));
  dispatch(modalMessageActionCreator(textNoConnection));
  dispatch(isModalOpenActionCreator(true));

  handleServerInfo(false, "local", "Unavailable", dispatch);
};

export const connectedToServer = () => async (dispatch: AppDispatch) => {
  let result = false;

  return await fetch(`${process.env.REACT_APP_API_URL}penguins`)
    .then((resp) => {
      if (resp.status === 200) {
        handleServerInfo(
          true,
          `${process.env.REACT_APP_API_URL}`,
          "Connected to server",
          dispatch
        );
        result = true;
      } else {
        Promise.reject(new Error("Server unavailable"));
        result = false;
      }
    })
    .then(() => {
      return result;
    })
    .catch((error) => {
      return false;
    });
};
