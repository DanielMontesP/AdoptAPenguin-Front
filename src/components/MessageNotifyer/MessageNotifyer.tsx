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
  const [isContainerHide, setHidderContainer] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleClose = () => {
    const newHidder = " display-none";
    setHidder((prevState) => !prevState);

    return newHidder;
  };

  const handleClick = (event: FormEvent<HTMLDivElement>): void => {
    const idMessage = event.currentTarget.id;
    setHidder(true);
    setHidderContainer(true);
    dispatch(getMessageThunk(idMessage));
    navigate(`/message/edit/id=${idMessage}`);
  };

  const hidder = isHide || messages?.length === 0 ? " display-none" : "";
  const hidderContainer = isContainerHide ? " display-none" : "";

  return (
    <PagesStyles className={`new-messages-container`} title="notifyer-header">
      <div className="notifyer-header">
        <span onClick={handleClose}>
          {messages?.length === 0 ? "No new messages" : "You have new messages"}
        </span>
        <button
          className="notifyer-bt-close"
          onClick={handleClose}
          placeholder="notifyer-bt-close"
        >
          {!isHide ? "Hide" : "Show"}
        </button>
      </div>
      <div className={`notifyer-container${hidderContainer}`}>
        {messages?.length > 0
          ? messages.map((message, index) => {
              return (
                <div
                  className={`message${hidder}`}
                  key={index}
                  onClick={handleClick}
                  id={message.id}
                  placeholder="messages-notifyer"
                >
                  <div
                    className={`message-read-img`}
                    key={index}
                    onClick={handleClick}
                    id={message.id}
                    placeholder="message-read-notifyer"
                  />
                  {message.data.substring(0, message.data.indexOf(","))} -{" "}
                  {message.subject}
                </div>
              );
            })
          : ""}
      </div>
    </PagesStyles>
  );
};

export default MessageNotifyer;
