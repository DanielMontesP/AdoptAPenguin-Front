import axios from "axios";
import { AppDispatch } from "../../store/store";
import {
  setLoadingOffWithMessage,
  setLoadingOn,
} from "../../../../components/Modals/Modals";
import { getMessagesActionCreator } from "../../features/messageSlice/messageSlice";
import {
  finishedLoadingActionCreator,
  loadingActionCreator,
} from "../../features/uiSlice/uiSlice";

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
      setLoadingOffWithMessage("GET Messages: Finished successfully.", false);
    }
  };
