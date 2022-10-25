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
      <h3 className={"view-list-counter"}>
        {allMessages.length} result/s found.
      </h3>
      <div className="message-buttons">
        <button className={"message-new"} onClick={handleClick} />
      </div>
      {allMessages.map((message, index) => {
        return <Message key={index} message={message} />;
      })}
    </PagesStyles>
  );
};

export default Messages;
