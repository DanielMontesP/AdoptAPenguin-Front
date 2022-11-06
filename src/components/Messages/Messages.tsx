import { useNavigate } from "react-router-dom";
import { IMessage } from "../../app/redux/types/message/messageInterfaces";
import PagesStyles from "../../Styles/PagesStyles";
import Message from "../Message/Message";

interface Props {
  allMessages: IMessage[];
}

const Messages = ({ allMessages }: Props): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`../message/create/`);
  };

  return (
    <PagesStyles className={`messages-container`} title="messages-container">
      <div className="message-buttons">
        <button className={"message-new"} onClick={handleClick}>
          New Message
        </button>
      </div>
      <h3 className={"view-list-counter"}>
        {allMessages.length} message/s found.
      </h3>
      {allMessages.map((message, index) => {
        return <Message key={index} message={message} />;
      })}
    </PagesStyles>
  );
};

export default Messages;
