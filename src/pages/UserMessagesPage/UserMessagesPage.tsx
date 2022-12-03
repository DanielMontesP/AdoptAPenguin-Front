import { useAppSelector } from "../../app/redux/hooks/hooks";
import Messages from "../../components/Messages/Messages";

const UserMessagesPage = (): JSX.Element => {
  const { allMessages } = useAppSelector((state) => state.user);
  const { penguin } = useAppSelector((state) => state.penguins);

  return <Messages allMessages={allMessages} penguin={penguin} />;
};

export default UserMessagesPage;
