import { useEffect } from "react";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { getMessageThunk } from "../../app/redux/thunks/messageThunk/messageThunk";
import CreateMessageForm from "../../components/CreateMessage/CreateMessageForm";
import FormsStyles from "../../Styles/FormsStyles";

const CreateMessagePage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { headerTitle } = useAppSelector((state) => state.ui);
  const { message } = useAppSelector((state) => state.messages);

  const isCreate = document.location.href.includes("create");

  let thisTitle = "";

  if (isCreate) {
    thisTitle = "New message...";
  } else {
    thisTitle = "Edit message...";
  }

  const idToProcess = document.location.href.substring(
    document.location.href.lastIndexOf("/") + 1,
    document.location.href.length
  );

  useEffect(() => {
    const SetTitleHeader = (title: string, lastTitle: string) => {
      dispatch(headerTitleActionCreator(title));
      dispatch(headerLastTitleActionCreator(lastTitle));
    };

    if (headerTitle !== thisTitle) SetTitleHeader(thisTitle, headerTitle);

    if (!isCreate) {
      dispatch(getMessageThunk(idToProcess));
    }
  }, [dispatch, idToProcess, headerTitle, thisTitle, isCreate]);

  return (
    <FormsStyles>
      <CreateMessageForm message={message} />
    </FormsStyles>
  );
};

export default CreateMessagePage;
