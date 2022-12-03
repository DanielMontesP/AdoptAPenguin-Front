import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  isModalOpenActionCreator,
  modalMessageActionCreator,
  modalTypeActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { getMessageThunk } from "../../app/redux/thunks/messageThunk/messageThunk";
import { IMessage } from "../../app/redux/types/message/messageInterfaces";
import { Modal } from "../Modals/ModalPrompt";

interface Props {
  message: IMessage;
}

const Message = ({ message }: Props): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isModalOpen, setModal] = useState(false);

  const { modalMessage } = useAppSelector((state) => state.ui);
  const { modalType } = useAppSelector((state) => state.ui);
  const { penguin } = useAppSelector((state) => state.penguins);

  const handleClick = () => {
    const idMessage = message.id;
    if (idMessage === "" || idMessage === undefined) {
      const message = "Message id not found.";
      const newModalType = "Error";

      dispatch(modalTypeActionCreator(newModalType));
      dispatch(modalMessageActionCreator(message));

      dispatch(isModalOpenActionCreator(true));
    } else {
      dispatch(getMessageThunk(idMessage));

      navigate(`../message/edit/id=${idMessage}`);
    }
  };

  const handleDelete = () => {
    const message = "Delete message permanently from database? ";
    const newModalType = "delete";

    dispatch(modalTypeActionCreator(newModalType));
    dispatch(modalMessageActionCreator(message));

    setModal((prevState) => !prevState);
  };

  const classIconIsRead = message.read ? "message-unread" : "message-read";

  return (
    <div className="message-container">
      <span className={classIconIsRead} />
      <span className="message-data">{message.data}</span>
      <span className="message-subject">{message.subject}</span>
      <button
        className={"message-read-img"}
        onClick={handleClick}
        placeholder="bt-view"
      />
      <button
        className={"animatedDelete"}
        onClick={handleDelete}
        placeholder="bt-delete"
      />
      {isModalOpen && (
        <Modal
          type={modalType}
          idToProcess={message.id || penguin.id}
          content={modalMessage}
          closeModal={setModal}
          form="Message"
        />
      )}
    </div>
  );
};

export default Message;
