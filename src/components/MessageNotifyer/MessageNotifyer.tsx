import { ReactElement } from "react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { getMessageThunk } from "../../app/redux/thunks/messageThunk/messageThunk";
import { IMessage } from "../../app/redux/types/message/messageInterfaces";
import { getUserMessagesThunk } from "../../app/redux/thunks/userThunk/userThunk";

import "../../styles/PagesStyles.css";
interface Props {
  messages: IMessage[];
}

const MessageNotifyer = ({ messages }: Props): ReactElement => {
  const userId = useAppSelector((state) => state.user.id);

  const [isHide, setHidder] = useState(true);
  const [, setHidderContainer] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleClose = (): string => {
    const newHidder = " display-none";
    setHidder((prevState) => !prevState);

    return newHidder;
  };

  const handleInbox = (): void => {
    setHidder(true);
    dispatch(getUserMessagesThunk(userId));
    navigate(`/users/messages/${userId}`);
  };

  const handleClick = (event: FormEvent<HTMLDivElement>): void => {
    const idMessage = event.currentTarget.id;
    setHidder(true);
    setHidderContainer(true);
    dispatch(getMessageThunk(idMessage));
    navigate(`/message/edit/id=${idMessage}`);
  };

  const openNotifys = !isHide ? " notifyer-bt-close-selected" : "";

  return (
    <div className={`notifyer-container`} title="notifyer-container">
      <div className="notifyer-header">
        <span className="notify-counter" onClick={handleClose}>
          {messages?.length || 0}
        </span>
        <button
          className={`notifyer-bt-close ${openNotifys}`}
          title="notifyer-bt-close"
          onClick={handleClose}
          // placeholder="notifyer-bt-close"
        />
      </div>
      {!isHide ? (
        <div className={`notify-list`}>
          <span
            className={`notifiyer-bt-inbox`}
            onClick={handleInbox}
            // placeholder="bt-inbox"
          >
            Inbox
          </span>
          {messages?.length > 0
            ? messages.map((message) => {
                return (
                  <div
                    className={`notify`}
                    key={message.id}
                    onClick={handleClick}
                    id={message.id}
                    // placeholder="notify"
                  >
                    <div
                      className={`notify-read-img`}
                      onClick={handleClick}
                      id={message.id}
                      // placeholder="notify-read"
                    />

                    <span className="notify-data">
                      {message.data.substring(0, message.data.indexOf(","))}
                    </span>
                    <span className="notify-subject">{message.subject}</span>
                  </div>
                );
              })
            : ""}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MessageNotifyer;
