import axios from "axios";
import { AppDispatch } from "../../store/store";
import {
  setLoadingOffWithMessage,
  setLoadingOn,
} from "../../../../components/Modals/Modals";
import {
  createMessageActionCreator,
  deleteMessageActionCreator,
  editMessageActionCreator,
  getMessageActionCreator,
  getMessagesActionCreator,
  resetMessageActionCreator,
  resetMessagesActionCreator,
} from "../../features/messageSlice/messageSlice";

import { messages } from "../../../../utils/messages-export.js";
import { blankMessageData } from "../../initializers/iniMessages";
import { getPenguinThunk } from "../penguinThunk/penguinThunk";
import {
  connectedToServer,
  handleNoConexion,
} from "../../../../components/uiHandlers/uiHandlers";
import { getUserNewMessagesActionCreator } from "../../features/userSlice/userSlice";

let firstLoad = true;
let textNoConnection = "";
const textFirstLoad = "Server is still loading, functionality will be disabled";
const textNextLoadsNoConnection =
  "Please try again in few seconds. Service render.com is still initializing";

if (firstLoad) {
  textNoConnection = textFirstLoad;
} else {
  textNoConnection = textNextLoadsNoConnection;
}

export const getMessagesThunk =
  (idPenguin: string) => async (dispatch: AppDispatch) => {
    // dispatch(serverLoadingActionCreator("getMessagesThunk"));
    try {
      const token = localStorage.getItem("token");
      const connected = connectedToServer() ? true : false;

      if (connected) {
        if (token) {
          const {
            data: { messages },
          } = await axios.get(
            `${process.env.REACT_APP_API_URL}messages/${idPenguin}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          dispatch(getMessagesActionCreator(messages));
          // dispatch(
          //   serverFinishedLoadActionCreator({
          //     process: "getMessagesThunk",
          //     loading: true,
          //   })
          // );
        } else {
          handleNoConexion(dispatch, "user.id");
          setLoadingOffWithMessage(`GET Messages: ${textNoConnection}`, false);
        }
      }
    } catch (error) {
      handleNoConexion(dispatch, "user.id");
      dispatch(getUserNewMessagesActionCreator(messages));
      setLoadingOffWithMessage(`GET Penguins: ${textNoConnection}`, false);
    }
  };

export const getMessageThunk =
  (idMessage: string) => async (dispatch: AppDispatch) => {
    // dispatch(
    //   serverLoadingActionCreator({
    //     process: "getMessagesThunk",
    //     loading: true,
    //   })
    // );

    setLoadingOn(`GET Message: Loading data...`);

    if (idMessage !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        const { data: message } = await axios.get(
          `${process.env.REACT_APP_API_URL}messages/message/${idMessage}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(getPenguinThunk(message.idPenguin));
        dispatch(getMessageActionCreator(message));
        // dispatch(
        //   serverFinishedLoadActionCreator({
        //     process: "getMessageThunk",
        //     loading: false,
        //   })
        // );
        setLoadingOffWithMessage(
          `GET Message: ${message.subject} successfully.`,
          false
        );
      }
    } else {
      setLoadingOffWithMessage(
        `GET Message: id undefined, process canceled.`,
        false
      );
    }
  };

export const createMessageThunk =
  (formMessage: any) => async (dispatch: AppDispatch) => {
    // dispatch(
    //   serverLoadingActionCreator({
    //     process: "createMessageThunk",
    //     loading: true,
    //   })
    // );

    setLoadingOn(`CREATE Message: Creating Message...`);

    const token = localStorage.getItem("token");
    if (token) {
      const { data: message } = await axios.post(
        `${process.env.REACT_APP_API_URL}messages/create`,
        formMessage,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(createMessageActionCreator(message));

      dispatch(getMessagesThunk(formMessage.idPenguin));
      // dispatch(
      //   serverFinishedLoadActionCreator({
      //     process: "createMessageThunk",
      //     loading: false,
      //   })
      // );
      setLoadingOffWithMessage(
        `CREATE Message: ${message.subject} created successfully.`,
        false
      );
    } else {
      setLoadingOffWithMessage(
        "CREATE Message: Sorry, no token no cookies...",
        true
      );
    }
  };

export const editMessageThunk =
  (formMessage: any, type: string) => async (dispatch: AppDispatch) => {
    // dispatch(
    //   serverLoadingActionCreator({
    //     process: "editMessageThunk",
    //     loading: true,
    //   })
    // );

    setLoadingOn("EDIT Message...");

    const token = localStorage.getItem("token");

    if (token) {
      const { data: message } = await axios.put(
        `${process.env.REACT_APP_API_URL}messages/${formMessage.id}?task=${type}`,
        formMessage,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(editMessageActionCreator(message));

      // dispatch(
      //   serverFinishedLoadActionCreator({
      //     process: "editMessageThunk",
      //     loading: false,
      //   })
      // );
      setLoadingOffWithMessage(`${type}`, false);
    }
  };

export const deleteMessageThunk =
  (id: string) => async (dispatch: AppDispatch) => {
    // dispatch(
    //   serverLoadingActionCreator({
    //     process: "deleteMessageThunk",
    //     loading: true,
    //   })
    // );

    setLoadingOn("DELETE Message: Deleting...");

    const token = localStorage.getItem("token");

    const { status } = await axios.delete(
      `${process.env.REACT_APP_API_URL}messages/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (status === 200) {
      dispatch(deleteMessageActionCreator(id));

      // dispatch(
      //   serverFinishedLoadActionCreator({
      //     process: "deleteMessageThunk",
      //     loading: false,
      //   })
      // );
      setLoadingOffWithMessage("DELETE Message: Finished successfully!", false);
    }
  };

export const resetMessageThunk = () => async (dispatch: AppDispatch) => {
  // dispatch(
  //   serverLoadingActionCreator({
  //     process: "resetMessageThunk",
  //     loading: true,
  //   })
  // );

  dispatch(resetMessageActionCreator(blankMessageData));
  // dispatch(
  //   serverFinishedLoadActionCreator({
  //     process: "resetMessageThunk",
  //     loading: false,
  //   })
  // );
};

export const resetMessagesThunk = () => async (dispatch: AppDispatch) => {
  // dispatch(
  //   serverLoadingActionCreator({
  //     process: "resetMessagesThunk",
  //     loading: true,
  //   })
  // );

  dispatch(resetMessagesActionCreator(blankMessageData));
  // dispatch(
  //   serverFinishedLoadActionCreator({
  //     process: "resetMessagesThunk",
  //     loading: false,
  //   })
  // );

  setLoadingOffWithMessage("RESET Messages: Finished successfully.", false);
};
