import { IMessage } from "../../app/redux/types/message/messageInterfaces";
import PagesStyles from "../../Styles/PagesStyles";
import Message from "../Message/Message";

interface Props {
  allMessages: IMessage[];
}

const Messages = ({ allMessages }: Props): JSX.Element => {
  return (
    <PagesStyles className={`messages-container`} title="messages-container">
      <h3 className={"view-list-counter"}>
        {allMessages.length} result/s found.
      </h3>
      {allMessages.map((message, index) => {
        return <Message key={index} message={message} />;
      })}
    </PagesStyles>
  );
};

export default Messages;
