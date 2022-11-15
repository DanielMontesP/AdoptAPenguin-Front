import { useNavigate } from "react-router-dom";
import {
  isModalOpenActionCreator,
  modalMessageActionCreator,
  modalTypeActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch } from "../../app/redux/hooks/hooks";
import { IMessage } from "../../app/redux/types/message/messageInterfaces";

interface Props {
  message: IMessage;
}

const Message = ({ message }: Props): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (message.id === "" || message.id === undefined) {
      const message = "Message id not found.";
      const newModalType = "Error";

      dispatch(modalTypeActionCreator(newModalType));
      dispatch(modalMessageActionCreator(message));

      dispatch(isModalOpenActionCreator(true));
    } else {
      navigate(`../message/edit/id=${message.id}`);
    }
  };

  return (
    <div className="messages-content">
      <div className="message-container">
        <span className="message-read" />
        <span className="message-data">{message.data}</span>
        <span className="message-subject">{message.subject}</span>

        <span className="message-content">{message.content}</span>
        <button
          className={"message-read-img"}
          onClick={handleClick}
          placeholder="bt-click"
        />
      </div>
    </div>
  );
};

export default Message;
