import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { resetMessageThunk } from "../../app/redux/thunks/messageThunk/messageThunk";
import { IMessage } from "../../app/redux/types/message/messageInterfaces";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import PagesStyles from "../../Styles/PagesStyles";
import { hasNewMessages } from "../../utils/utils";
import Message from "../Message/Message";

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

    navigate(`../message/create/`);
  };

  const counterNewMessages = hasNewMessages(allMessages, penguin.id);

  return (
    <PagesStyles
      className={`${headerTitle === "Inbox" ? "inbox-" : ""}messages-container`}
      title="messages-container"
    >
      <div className="message-buttons">
        <button
          className={"message-new"}
          onClick={handleClick}
          placeholder="bt-submit"
        >
          + New Message
        </button>
        <h3 className={"inbox-view-list-counter"}>
          Total {allMessages.length} messages.
          {counterNewMessages} unread messages.
        </h3>
      </div>
      {allMessages.map((message, index) => {
        return <Message key={index} message={message} />;
      })}
    </PagesStyles>
  );
};

export default Messages;
