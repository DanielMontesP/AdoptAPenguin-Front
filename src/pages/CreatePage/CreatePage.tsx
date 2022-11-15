import { useEffect } from "react";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { getMessageThunk } from "../../app/redux/thunks/messageThunk/messageThunk";
import { getPenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import CreateForm from "../../components/CreateForm/CreateForm";
import CreateMessageForm from "../../components/CreateMessage/CreateMessageForm";
import FormsStyles from "../../Styles/FormsStyles";

interface Props {
  type: string;
  form: string;
}

const CreatePage = ({ type, form }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const { headerTitle } = useAppSelector((state) => state.ui);
  const { penguin } = useAppSelector((state) => state.penguins);
  const { message } = useAppSelector((state) => state.messages);

  const isCreate = type === "Create";

  const idToEdit = document.location.href.substring(
    document.location.href.lastIndexOf("/") + 4,
    document.location.href.length
  );
  let thisTitle = "";
  const isMessage = form === "Message";

  if (isMessage) {
    thisTitle = isCreate ? "New message..." : "Edit message...";
  } else {
    thisTitle = isCreate ? "New..." : "Edit...";
  }

  useEffect(() => {
    isMessage
      ? dispatch(getMessageThunk(idToEdit))
      : dispatch(getPenguinThunk(idToEdit));
    const SetTitleHeader = (title: string, lastTitle: string) => {
      dispatch(headerTitleActionCreator(title));
      dispatch(headerLastTitleActionCreator(lastTitle));
    };

    if (headerTitle !== thisTitle) SetTitleHeader(thisTitle, headerTitle);
  }, [
    dispatch,
    isMessage,
    idToEdit,
    penguin,
    type,
    headerTitle,
    thisTitle,
    isCreate,
  ]);

  return (
    <FormsStyles>
      {form === "Message" ? (
        <CreateMessageForm message={message} />
      ) : (
        <CreateForm penguin={penguin} />
      )}
    </FormsStyles>
  );
};

export default CreatePage;
