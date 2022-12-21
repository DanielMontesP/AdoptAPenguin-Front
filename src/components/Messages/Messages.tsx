import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { resetMessageThunk } from "../../app/redux/thunks/messageThunk/messageThunk";
import { IMessage } from "../../app/redux/types/message/messageInterfaces";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";

import { hasNewMessages } from "../../functions/sysHandlers/sysHandlers";
import Message from "../Message/Message";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import "../../styles/PagesStyles.css";

interface Props {
  allMessages: IMessage[];
  penguin: IPenguin;
}

const Messages = ({ allMessages, penguin }: Props): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { headerTitle } = useAppSelector((state) => state.ui);

  const handleClick = () => {
    dispatch(resetMessageThunk());

    dispatch(headerTitleActionCreator("New message"));
    dispatch(headerLastTitleActionCreator("Message"));

    navigate(`../message/create/`);
  };

  const counterNewMessages = hasNewMessages(allMessages, penguin.id);
  const isInbox = headerTitle === "Inbox";

  return (
    <div
      className={`${headerTitle === "Inbox" ? "inbox-" : ""}messages-container`}
      title="messages-container"
    >
      <div className="message-buttons">
        {!isInbox ? (
          <button
            className={"message-new"}
            onClick={handleClick}
            placeholder="bt-submit"
          >
            + New Message
          </button>
        ) : (
          ""
        )}
        <h3 className={"inbox-view-list-counter"}>
          Total {allMessages?.length} messages.
          {counterNewMessages} unread messages.
        </h3>
      </div>
      {allMessages.map((message, index) => {
        return <Message key={message.id} message={message} />;
      })}
    </div>
  );
};

export default Messages;
