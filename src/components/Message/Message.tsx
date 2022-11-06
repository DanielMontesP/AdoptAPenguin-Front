import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import {
  getMessagesThunk,
  getMessageThunk,
} from "../../app/redux/thunks/messageThunk/messageThunk";
import { IMessage } from "../../app/redux/types/message/messageInterfaces";

interface Props {
  message: IMessage;
}

const Message = ({ message }: Props): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { penguin } = useAppSelector((state) => state.penguins);
  const idMessage = message.id;

  const handleClick = () => {
    dispatch(getMessagesThunk(penguin.id));
    dispatch(getMessageThunk(penguin.id));

    navigate(`../message/edit/${idMessage}`);
  };

  return (
    <div className="messages-content">
      <div className="message-container">
        <span className="message-read" />
        <span className="message-data">{message.data}</span>
        <span className="message-subject">{message.subject}</span>

        <span className="message-content">{message.content}</span>
        <button className={"message-read-img"} onClick={handleClick} />
      </div>
    </div>
  );
};

export default Message;
