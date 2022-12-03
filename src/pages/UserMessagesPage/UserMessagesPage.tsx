import { useEffect } from "react";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import Messages from "../../components/Messages/Messages";

const UserMessagesPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { allMessages } = useAppSelector((state) => state.user);
  const { penguin } = useAppSelector((state) => state.penguins);

  const { headerTitle, headerLastTitle } = useAppSelector((state) => state.ui);

  const thisTitle = "Inbox";

  useEffect(() => {
    const SetTitleHeader = (title: string, lastTitle: string) => {
      dispatch(headerTitleActionCreator(title));
      dispatch(headerLastTitleActionCreator(lastTitle));
    };

    if (headerTitle !== thisTitle) SetTitleHeader(thisTitle, headerTitle);
  }, [dispatch, headerTitle, headerLastTitle]);

  return <Messages allMessages={allMessages} penguin={penguin} />;
};

export default UserMessagesPage;
