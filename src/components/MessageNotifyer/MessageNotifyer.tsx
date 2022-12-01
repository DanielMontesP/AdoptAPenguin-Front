import PagesStyles from "../../Styles/PagesStyles";
import { INewMessage } from "../../app/redux/types/message/messageInterfaces";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/redux/hooks/hooks";
import { getMessageThunk } from "../../app/redux/thunks/messageThunk/messageThunk";

interface Props {
  messages: INewMessage[];
}

const MessageNotifyer = ({ messages }: Props): JSX.Element => {
  const [isHide, setHidder] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleHidder = () => {
    const newHidder = " display-none";
    setHidder(true);
    return newHidder;
  };

  const handleClick = (event: FormEvent<HTMLDivElement>): void => {
    const idMessage = event.currentTarget.id;
    setHidder(true);
    dispatch(getMessageThunk(idMessage));
    navigate(`/message/edit/id=${idMessage}`);
  };

  const hidder = isHide || messages?.length === 0 ? " display-none" : "";

  return (
    <PagesStyles
      className={`new-messages-container${hidder}`}
      title="notifyer-header"
    >
      <div className="notifyer-header">
        You have new messages
        <button
          className="notifyer-bt-close"
          onClick={handleHidder}
          placeholder="notifyer-bt-close"
        >
          X
        </button>
      </div>
      {messages.map((message, index) => {
        return (
          <div
            className="messages-notifyer"
            key={index}
            onClick={handleClick}
            id={message.id}
            placeholder="messages-notifyer"
          >
            {message.data} - {message.subject}
          </div>
        );
      })}
    </PagesStyles>
  );
};

export default MessageNotifyer;
