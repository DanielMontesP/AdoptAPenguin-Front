import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  DataAxiosLogin,
  LoginResponse,
  UserRegister,
} from "../../types/userInterfaces/userInterfaces";
import {
  editUserActionCreator,
  getUserMessagesActionCreator,
  loadUserDataActionCreator,
  logInActionCreator,
} from "../../features/userSlice/userSlice";

import {
  setLoadingOffWithMessage,
  setLoadingOn,
} from "../../../../components/Modals/Modals";
import { headerTitleActionCreator } from "../../features/uiSlice/uiSlice";
import { AppDispatch } from "../../store/store";
import {
  getUserNewMessages,
  handleServerInfo,
} from "../../../../functions/sysHandlers/sysHandlers";
import { handleNoConexion } from "../../../../functions/uiHandlers/uiHandlers";

let message = "";

export const loginThunk =
  (userData: UserRegister) => async (dispatch: AppDispatch) => {
    try {
      setLoadingOn(
        `LOGIN:...Service render.com is starting...Be watter penguin...Load will finish as soon as possible.`,
      );
      const url = `${import.meta.env.VITE_APP_API_URL}users/login`;

      const { data, status }: DataAxiosLogin = await axios.post(url, userData);

      if (status === 200) {
        const {
          id,
          username,
          isAdmin,
          image,
          allMessages,
          newMessages,
        }: LoginResponse = jwtDecode(data.token);
        const logged = false;

        localStorage.setItem("token", data.token);

        dispatch(
          logInActionCreator({
            id,
            username,
            logged,
            isAdmin,
            image,
            allMessages,
            newMessages,
          }),
        );

        setLoadingOffWithMessage(`LOGIN: logged successfully `, false);
        dispatch(headerTitleActionCreator("Home"));

        dispatch(getUserMessagesThunk(id));
      }
    } catch {
      const errorMessage =
        "Login failed!\nCheck credentials for username: " + userData.username;
      handleNoConexion(dispatch);
      setLoadingOffWithMessage(errorMessage, false);

      return errorMessage;
    }
  };

export const registerThunk =
  (userData: UserRegister, password: string) =>
  async (dispatch: AppDispatch) => {
    try {
      setLoadingOn(
        `REGISTER:...Probably service render.com is sleeping...Be watter penguin...it will start as soon as possible.`,
      );
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}users/register`,
        userData,
      );

      if (data) {
        const newUserData = {
          username: userData.username,
          password: password,
        };
        message =
          "Thanks for register! Logged successfully and redirected to home page...";

        dispatch(loginThunk(newUserData));
      }

      setLoadingOffWithMessage(message, false);
    } catch {
      const errorMessage =
        "Registration failed!: \nUsername: " +
        userData.username +
        ", this username all ready exist. " +
        userData.password;

      setLoadingOffWithMessage(errorMessage, true);

      return errorMessage;
    }
  };

export const getUserThunk = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem("token");

    if (token && id) {
      const { data: user } = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}users/${id}`,
      );

      handleServerInfo(
        true,
        `${import.meta.env.VITE_APP_API_URL}`,
        "Connected to server",
        dispatch,
      );

      dispatch(getUserMessagesThunk(id));
      dispatch(loadUserDataActionCreator(user));
    }
  } catch (error) {
    setLoadingOffWithMessage(`GET User: ERROR: ${error}`, false);
  }
};

export const editUserThunk =
  (idUser: string) => async (dispatch: AppDispatch) => {
    setLoadingOn("EDIT User...");

    const token = localStorage.getItem("token");

    if (token) {
      const { data: user } = await axios.put(
        `${import.meta.env.VITE_APP_API_URL}users/edit/${idUser}`,
        idUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch(editUserActionCreator(user));

      setLoadingOffWithMessage(`EDIT user: Finished successfully.`, false);
    }
  };

export const getUserMessagesThunk =
  (idUser: string) => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      const {
        data: { messages },
      } = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}users/messages/${idUser}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      handleServerInfo(
        true,
        `${import.meta.env.VITE_APP_API_URL}`,
        "Connected to server",
        dispatch,
      );
      if (messages?.length > 0) {
        getUserNewMessages(messages, dispatch);
        dispatch(getUserMessagesActionCreator(messages));
      }
    }
  };
