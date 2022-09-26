import { IMessage } from "../../app/redux/types/message/messageInterfaces";

interface Props {
  message: IMessage;
}

const Message = ({ message }: Props): JSX.Element => {
  return (
    <div className="message-container">
      <span className="message-data">{message.data}</span>
      <span className="message-subject">{message.subject}</span>
      <span className="message-read">
        <button
          className={message.read ? "message-read-img" : "message-noread-img"}
        />
      </span>
      <span className="message-content">{message.content}</span>
    </div>
  );
};

export default Message;
