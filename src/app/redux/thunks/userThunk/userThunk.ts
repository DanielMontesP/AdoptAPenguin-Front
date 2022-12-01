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
import {
  finishedLoadingActionCreator,
  headerTitleActionCreator,
  loadingActionCreator,
} from "../../features/uiSlice/uiSlice";
import { AppDispatch } from "../../store/store";

let message = "";

export const loginThunk =
  (userData: UserRegister) => async (dispatch: AppDispatch) => {
    try {
      setLoadingOn(
        `LOGIN: ${userData.username}...Probably service render.com is sleeping...Be watter penguin...it will start as soon as possible.`
      );
      const url: string = `${process.env.REACT_APP_API_URL}users/login`;

      const { data, status }: DataAxiosLogin = await axios.post(url, userData);

      if (status === 200) {
        const { id, username, isAdmin, image, allMessages }: LoginResponse =
          jwt_decode(data.token);
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
          })
        );
        dispatch(headerTitleActionCreator("Home"));
        dispatch(finishedLoadingActionCreator());

        message =
          message === ""
            ? `${userData.username} logged successfully.`
            : message;

        setLoadingOffWithMessage(message, false);
      }
    } catch (error: any) {
      setLoadingOffWithMessage(
        "Login failed!\nCheck credentials for username: " + userData.username,
        true
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
    dispatch(loadingActionCreator());

    const token = localStorage.getItem("token");

    if (token && id) {
      const { data: user } = await axios.get(
        `${process.env.REACT_APP_API_URL}users/${id}`
      );

      dispatch(getUserMessagesThunk(id));
      dispatch(loadUserDataActionCreator(user));
      dispatch(finishedLoadingActionCreator());
    }
  } catch (error) {
    setLoadingOffWithMessage(`GET User: ERROR: ${error}`, false);
  }
};

export const editUserThunk = (idUser: any) => async (dispatch: AppDispatch) => {
  dispatch(loadingActionCreator());

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

    dispatch(finishedLoadingActionCreator());

    setLoadingOffWithMessage(`EDIT user: Finished successfully.`, false);
  }
};

export const getUserMessagesThunk =
  (idUser: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingActionCreator());

    const token = localStorage.getItem("token");

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

      dispatch(getUserMessagesActionCreator(messages));
      dispatch(finishedLoadingActionCreator());
    }
  };
