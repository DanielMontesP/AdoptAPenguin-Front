import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  finishedLoadingActionCreator,
  isModalOpenActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { logOutActionCreator } from "../../app/redux/features/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import {
  resetMessagesThunk,
  resetMessageThunk,
} from "../../app/redux/thunks/messageThunk/messageThunk";
import {
  deletePenguinThunk,
  resetPenguinsThunk,
} from "../../app/redux/thunks/penguinThunk/penguinThunk";
import Help from "../Help/Help";
import WellcomeComments from "../WellcomeComments/WellcomeComments";
import { correctAction } from "./Modals";

interface IModalProps {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  idPenguin: string;
  type: string;
  message: string;
}

export const Modal = ({
  closeModal,
  idPenguin,
  message,
  type,
}: IModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { headerTitle } = useAppSelector((state) => state.ui);

  let isWellcome = false;

  const isHelp = type === "Help";

  let overflowY = " overflow-auto";

  let modalClass = "modal";
  let windowTitle = "";

  switch (type) {
    case "About":
      windowTitle = "About";
      modalClass += ` modal-about${overflowY}`;
      isWellcome = true;
      break;
    case "Wellcome":
      windowTitle = "About";
      modalClass += ` modal-wellcome${overflowY}`;
      isWellcome = true;
      break;
    case "Help":
      windowTitle = "Help";
      modalClass += ` modal-help${overflowY}`;
      break;
    case "FFeature":
      windowTitle = "Notice";
      break;
    case "Search":
      windowTitle = "Search";
      break;
    case "Error":
      windowTitle = "Error";
      break;
    default:
      windowTitle = "Please confirm";
  }

  const logOutUser = () => {
    dispatch(finishedLoadingActionCreator());
    dispatch(logOutActionCreator());

    dispatch(resetMessagesThunk);
    dispatch(resetMessageThunk);

    dispatch(resetPenguinsThunk);

    localStorage.removeItem("token");

    navigate("/");
  };

  const getMessage = (): React.ReactNode => {
    if (isWellcome) {
      return <WellcomeComments />;
    } else if (isHelp) {
      return <Help />;
    } else if (type === "FFeature") {
      message = "This feature will be available soon.";
    }

    return <h3 className="modal-message">{message}</h3>;
  };

  const deletePenguin = () => {
    if (idPenguin) {
      dispatch(deletePenguinThunk(`${idPenguin}`));
      if (headerTitle === "Detail") {
        navigate("/penguins/favs");
      }
    }
  };

  const handleAcceptClick = () => {
    switch (type) {
      case "delete":
        deletePenguin();
        break;
      case "logOutUser":
        logOutUser();
        break;
      case "Wellcome":
        break;
      case "About":
        break;
      case "Validation":
        break;
      case "Help":
        break;
      case "Search":
        break;
      case "Error":
        break;
      default:
        correctAction("Sorry, this feature is not available yet.");
    }
    closeModal(false);
    dispatch(isModalOpenActionCreator(false));
  };

  const handleCancelClick = () => {
    closeModal(false);
    dispatch(isModalOpenActionCreator(false));
  };

  const cancelClass =
    isWellcome || isHelp || type === "Search" || type === "Error"
      ? "modal-btn-cancel display-none"
      : "modal-btn-cancel";

  return (
    <div className={modalClass}>
      <div className="modal-header">
        <h3 className="modal-title">{windowTitle}</h3>
        <button
          onClick={handleCancelClick}
          className="modal-btn-close"
          title="btn-close"
          placeholder="btn-close"
        />
      </div>
      {getMessage()}
      <div className="modal-body">
        <button
          onClick={handleAcceptClick}
          className="modal-btn-accept"
          title="btn-accept"
          placeholder="btn-accept"
        />
        <button
          onClick={handleCancelClick}
          className={cancelClass}
          title="btn-cancel"
          placeholder="btn-cancel"
        />
      </div>
    </div>
  );
};
