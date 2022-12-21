import * as React from "react";
import { useNavigate } from "react-router-dom";
import { isModalOpenActionCreator } from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { deleteMessageThunk } from "../../app/redux/thunks/messageThunk/messageThunk";
import { deletePenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { writeFile } from "../../functions/sysHandlers/sysHandlers";
import EditButtons from "../EditButtons/EditButtons";
import Help from "../Help/Help";
import { handleLogout } from "../../functions/uiHandlers/uiHandlers";
import WellcomeComments from "../WellcomeComments/WellcomeComments";
import { correctAction } from "./Modals";

interface IModalProps {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  idToProcess: string;
  content: string;
  type: string;
  form: string;
}

export const Modal = ({
  closeModal,
  idToProcess,
  content,
  type,
  form,
}: IModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { penguin } = useAppSelector((state) => state.penguins);
  const listMessages = useAppSelector((state) => state.user.allMessages);
  const listPenguins = useAppSelector((state) => state.penguins.allPenguins);
  const listNotifys = useAppSelector((state) => state.user.allMessages);

  const { headerTitle, modalType } = useAppSelector((state) => state.ui);

  let isWellcome = false;

  const isHelp = type === "Help";
  const isMessage = form === "Message";
  const isEditPage = type === "Edit";

  let overflowY = " overflow-auto";

  let modalClass = isEditPage ? "modal-options" : "modal";
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
    case "Edit":
      windowTitle = "Options";
      break;
    case "Settings":
      windowTitle = "Settings";
      break;
    default:
      windowTitle = "Please confirm";
  }

  const logOutUser = () => {
    handleLogout(dispatch, navigate);
  };

  const getMessage = (): React.ReactNode => {
    if (isWellcome) {
      return <WellcomeComments />;
    } else if (isHelp) {
      return <Help />;
    } else if (type === "FFeature") {
      content = "This feature will be available soon.";
    } else if (type === "Settings") {
      content = "Export penguins and personal messages list?";
    }

    return type !== "Edit" ? <h3 className="modal-message">{content}</h3> : "";
  };

  const deletePenguin = () => {
    if (idToProcess) {
      dispatch(deletePenguinThunk(`${idToProcess}`));
      if (headerTitle === "Detail") {
        navigate("/penguins/favs");
      }
    }
  };

  const deleteMessage = () => {
    if (idToProcess) {
      dispatch(deleteMessageThunk(idToProcess));
    }
  };

  const handleAcceptClick = () => {
    switch (modalType) {
      case "delete":
        isMessage ? deleteMessage() : deletePenguin();
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
      case "Settings":
        writeFile("penguins", listPenguins);
        writeFile("messages", listMessages);
        writeFile("notifys", listNotifys);
        break;
      case "Server":
        navigate("./");

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
      {isEditPage ? (
        <EditButtons penguin={penguin} />
      ) : (
        <div className="modal-body">
          <button
            onClick={handleAcceptClick}
            className="modal-btn-accept"
            title="btn-accept"
            placeholder="btn-accept"
          >
            Ok
          </button>
          {type === "delete" || type === "logOutUser" || type === "Settings" ? (
            <button
              onClick={handleCancelClick}
              className={cancelClass}
              title="btn-cancel"
              placeholder="btn-cancel"
            >
              Cancel
            </button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};
