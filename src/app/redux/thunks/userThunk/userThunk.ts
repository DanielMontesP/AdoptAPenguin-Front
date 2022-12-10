import axios from "axios";
import jwt_decode from "jwt-decode";
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
  connectedToServer,
  getUserNewMessages,
  handleServerInfo,
} from "../../../../functions/sysHandlers/sysHandlers";
import { handleNoConexion } from "../../../../functions/uiHandlers/uiHandlers";

let message = "";

const textNoConnection =
  "Please try again in few seconds. Service render.com is still initializing";

export const loginThunk =
  (userData: UserRegister) => async (dispatch: AppDispatch) => {
    try {
      const url: string = `${process.env.REACT_APP_API_URL}users/login`;

      const { data, status }: DataAxiosLogin = await axios.post(url, userData);

      if (status === 200) {
        const {
          id,
          username,
          isAdmin,
          image,
          allMessages,
          newMessages,
        }: LoginResponse = jwt_decode(data.token);
        const logged = false;

        localStorage.setItem("token", data.token);

        const connected = connectedToServer() ? true : false;

        if (connected) {
          dispatch(
            logInActionCreator({
              id,
              username,
              logged,
              isAdmin,
              image,
              allMessages,
              newMessages,
            })
          );
          dispatch(headerTitleActionCreator("Home"));

          dispatch(getUserMessagesThunk(id));
        } else {
          handleNoConexion(dispatch, "user.id");
          setLoadingOffWithMessage(`GET Users: ${textNoConnection}`, false);
        }
      }
    } catch (error: any) {
      handleNoConexion(dispatch, "user.id");
      setLoadingOffWithMessage(
        "Login failed!\nCheck credentials for username: " + userData.username,
        false
      );

      return error.message;
    }
  };

export const registerThunk =
  (userData: any, password: string) => async (dispatch: AppDispatch) => {
    try {
      setLoadingOn(
        `REGISTER:...Probably service render.com is sleeping...Be watter penguin...it will start as soon as possible.`
      );
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}users/register`,
        userData
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
    } catch (error: any) {
      setLoadingOffWithMessage(
        "Registration failed!: \nUsername: " +
          userData.username +
          ", this username all ready exist. " +
          userData.password,
        true
      );

      return error.message;
    }
  };

export const getUserThunk = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem("token");

    const connected = connectedToServer() ? true : false;

    if (connected) {
      if (token && id) {
        const { data: user } = await axios.get(
          `${process.env.REACT_APP_API_URL}users/${id}`
        );

        handleServerInfo(
          true,
          `${process.env.REACT_APP_API_URL}`,
          "Connected to server",
          dispatch
        );

        dispatch(getUserMessagesThunk(id));
        dispatch(loadUserDataActionCreator(user));
      }
    } else {
      handleNoConexion(dispatch, "user.id");
      setLoadingOffWithMessage(`GET User: ${textNoConnection}`, false);
    }
  } catch (error) {
    setLoadingOffWithMessage(`GET User: ERROR: ${error}`, false);
  }
};

export const editUserThunk = (idUser: any) => async (dispatch: AppDispatch) => {
  setLoadingOn("EDIT User...");

  const token = localStorage.getItem("token");

  if (token) {
    const { data: user } = await axios.put(
      `${process.env.REACT_APP_API_URL}users/edit/${idUser}`,
      idUser,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(editUserActionCreator(user));

    setLoadingOffWithMessage(`EDIT user: Finished successfully.`, false);
  }
};

export const getUserMessagesThunk =
  (idUser: string) => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");

    const connected = connectedToServer() ? true : false;

    if (connected) {
      if (token) {
        const {
          data: { messages },
        } = await axios.get(
          `${process.env.REACT_APP_API_URL}users/messages/${idUser}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        handleServerInfo(
          true,
          `${process.env.REACT_APP_API_URL}`,
          "Connected to server",
          dispatch
        );
        getUserNewMessages(messages, dispatch);
        dispatch(getUserMessagesActionCreator(messages));
      }
    } else {
      handleNoConexion(dispatch, "user.id");
      setLoadingOffWithMessage(`GET Penguins: ${textNoConnection}`, false);
    }
  };
