import * as React from "react";
import { useNavigate } from "react-router-dom";
import { finishedLoadingActionCreator } from "../../app/redux/features/uiSlice/uiSlice";
import { logOutActionCreator } from "../../app/redux/features/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { deletePenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
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
  const isWellcome = type === "About" || type === "Wellcome" ? true : false;

  const logOutUser = () => {
    dispatch(finishedLoadingActionCreator());
    dispatch(logOutActionCreator());

    localStorage.removeItem("token");

    navigate("/");
  };

  const getMessage = (): React.ReactNode => {
    if (isWellcome) {
      return <WellcomeComments />;
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
      default:
        correctAction("Sorry, this feature is not available yet.");
    }
    closeModal(false);
  };

  const handleCancelClick = () => {
    closeModal(false);
  };

  const windowTitle = isWellcome ? "About" : "Please confirm";
  const modalClass = isWellcome ? "modal modal-wellcome" : "modal";
  const cancelClass = isWellcome
    ? "modal-btn-cancel display-none"
    : "modal-btn-cancel";

  return (
    <div className={modalClass}>
      <div className="modal-header">
        <h3 className="modal-title">{windowTitle}</h3>
        <button
          onClick={handleAcceptClick}
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
