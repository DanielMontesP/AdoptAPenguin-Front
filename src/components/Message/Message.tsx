import { useNavigate } from "react-router-dom";
import {
  isModalOpenActionCreator,
  modalMessageActionCreator,
  modalTypeActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch } from "../../app/redux/hooks/hooks";
import { getMessageThunk } from "../../app/redux/thunks/messageThunk/messageThunk";
import { IMessage } from "../../app/redux/types/message/messageInterfaces";

interface Props {
  message: IMessage;
}

const Message = ({ message }: Props): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
  };

  const classIconIsRead = message.read ? "icon-unread" : "icon-read";

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
        className={"message-delete"}
        onClick={handleDelete}
        placeholder="bt-delete"
      />
    </div>
  );
};

export default Message;
