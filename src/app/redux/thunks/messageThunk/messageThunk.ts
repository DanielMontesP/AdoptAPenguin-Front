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
import { messages } from "../../../../export/messages-export.js";
import { blankMessageData } from "../../initializers/iniMessages";
import { getPenguinThunk } from "../penguinThunk/penguinThunk";
import { handleNoConexion } from "../../../../functions/uiHandlers/uiHandlers";
import { getUserNewMessagesActionCreator } from "../../features/userSlice/userSlice";
import { connectedToServer } from "../../../../functions/sysHandlers/sysHandlers";

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

      setLoadingOffWithMessage(`${type}`, false);
    }
  };

export const deleteMessageThunk =
  (id: string) => async (dispatch: AppDispatch) => {
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

      setLoadingOffWithMessage("DELETE Message: Finished successfully!", false);
    }
  };

export const resetMessageThunk = () => async (dispatch: AppDispatch) => {
  dispatch(resetMessageActionCreator(blankMessageData));
};

export const resetMessagesThunk = () => async (dispatch: AppDispatch) => {
  dispatch(resetMessagesActionCreator(blankMessageData));

  setLoadingOffWithMessage("RESET Messages: Finished successfully.", false);
};
