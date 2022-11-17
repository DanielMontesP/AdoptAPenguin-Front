import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/redux/hooks/hooks";
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

  const handleClick = () => {
    dispatch(resetMessageThunk());

    navigate(`../message/create/`);
  };

  const counterNewMessages = hasNewMessages(allMessages, penguin);

  return (
    <PagesStyles className={`messages-container`} title="messages-container">
      <div className="message-buttons">
        <button
          className={"message-new"}
          onClick={handleClick}
          placeholder="bt-submit"
        >
          + New Message
        </button>
        <h3 className={"view-list-counter"}>
          Total {allMessages.length} message
          {allMessages.length === 1 ? ". " : "s. "}
          {counterNewMessages} new message
          {counterNewMessages === 1 ? "." : "s."}
        </h3>
      </div>
      {allMessages.map((message, index) => {
        return <Message key={index} message={message} />;
      })}
    </PagesStyles>
  );
};

export default Messages;
