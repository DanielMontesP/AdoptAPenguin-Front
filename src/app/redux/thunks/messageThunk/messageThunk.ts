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
import {
  finishedLoadingActionCreator,
  loadingActionCreator,
} from "../../features/uiSlice/uiSlice";
import { blankMessageData } from "../../initializers/iniMessages";

export const getMessagesThunk =
  (idPenguin: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingActionCreator());

    const token = localStorage.getItem("token");

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
      dispatch(finishedLoadingActionCreator());
    }
  };

export const getMessageThunk =
  (idMessage: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingActionCreator());
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

        dispatch(getMessageActionCreator(message));
        dispatch(finishedLoadingActionCreator());
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
    dispatch(loadingActionCreator());
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
      dispatch(finishedLoadingActionCreator());
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
    dispatch(loadingActionCreator());
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

      dispatch(finishedLoadingActionCreator());
      setLoadingOffWithMessage(`${type}`, false);
    }
  };

export const deleteMessageThunk =
  (id: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingActionCreator());

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

      dispatch(finishedLoadingActionCreator());
      setLoadingOffWithMessage("DELETE Message: Finished successfully!", false);
    }
  };

export const resetMessageThunk = () => async (dispatch: AppDispatch) => {
  dispatch(resetMessageActionCreator(blankMessageData));
  dispatch(finishedLoadingActionCreator());
};

export const resetMessagesThunk = () => async (dispatch: AppDispatch) => {
  dispatch(loadingActionCreator());

  dispatch(resetMessagesActionCreator(blankMessageData));
  dispatch(finishedLoadingActionCreator());

  setLoadingOffWithMessage("RESET Messages: Finished successfully.", false);
};
