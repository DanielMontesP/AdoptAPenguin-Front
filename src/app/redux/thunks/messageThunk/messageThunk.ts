import axios from "axios";
import { AppDispatch } from "../../store/store";
import {
  setLoadingOffWithMessage,
  setLoadingOn,
} from "../../../../components/Modals/Modals";
import {
  getMessageActionCreator,
  getMessagesActionCreator,
  resetMessageActionCreator,
  resetMessagesActionCreator,
} from "../../features/messageSlice/messageSlice";
import {
  finishedLoadingActionCreator,
  loadingActionCreator,
} from "../../features/uiSlice/uiSlice";
import { blankMessageData } from "../../../../utils/utils";

export const getMessagesThunk =
  (formPenguin: any) => async (dispatch: AppDispatch) => {
    dispatch(loadingActionCreator());

    setLoadingOn(
      `GET Messages: ...Probably service render.com is sleeping...Be watter penguin...it will start as soon as possible.`
    );

    const token = localStorage.getItem("token");

    if (token) {
      const {
        data: { messages },
      } = await axios.get(
        `${process.env.REACT_APP_API_URL}messages/${formPenguin.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getMessagesActionCreator(messages));
      dispatch(finishedLoadingActionCreator());
      setLoadingOffWithMessage("", false);
    }
  };

export const getMessageThunk =
  (id: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingActionCreator());

    if (id !== "") {
      const token = localStorage.getItem("token");

      if (token) {
        const { data: message } = await axios.get(
          `${process.env.REACT_APP_API_URL}messages/${id}`,
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
    }
  };

export const resetMessageThunk = () => async (dispatch: AppDispatch) => {
  dispatch(loadingActionCreator());

  dispatch(resetMessageActionCreator(blankMessageData));
  dispatch(finishedLoadingActionCreator());

  setLoadingOffWithMessage("RESET Penguin: Finished successfully.", false);
};

export const resetMessagesThunk = () => async (dispatch: AppDispatch) => {
  dispatch(loadingActionCreator());

  dispatch(resetMessagesActionCreator(blankMessageData));
  dispatch(finishedLoadingActionCreator());

  setLoadingOffWithMessage("RESET Messages: Finished successfully.", false);
};
