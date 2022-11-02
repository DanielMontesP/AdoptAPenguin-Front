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
}

const CreatePage = ({ type }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const { headerTitle } = useAppSelector((state) => state.ui);
  const { penguin } = useAppSelector((state) => state.penguins);
  const { message } = useAppSelector((state) => state.messages);

  const isCreate = document.location.href.includes("create");

  let thisTitle = "";

  switch (type) {
    case "Message":
      if (isCreate) {
        thisTitle = "New message...";
      } else {
        thisTitle = "Edit message...";
      }
      break;
    default:
      if (isCreate) {
        thisTitle = "New...";
      } else {
        thisTitle = "Edit...";
      }
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
      type === "Message"
        ? dispatch(getMessageThunk(idToProcess))
        : dispatch(getPenguinThunk(idToProcess));
    }
  }, [dispatch, idToProcess, type, headerTitle, thisTitle, isCreate]);

  return (
    <FormsStyles>
      {type === "Message" ? (
        <CreateMessageForm message={message} />
      ) : (
        <CreateForm penguin={penguin} />
      )}
    </FormsStyles>
  );
};

export default CreatePage;
