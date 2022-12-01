import React, { useEffect } from "react";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
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

  let thisTitle = "";
  const isMessage = headerTitle.includes("message");

  if (isMessage) {
    thisTitle = isCreate ? "New message..." : "Edit message...";
  } else {
    thisTitle = isCreate ? "New..." : "Edit...";
  }

  useEffect(() => {
    const SetTitleHeader = (title: string, lastTitle: string) => {
      dispatch(headerTitleActionCreator(title));
      dispatch(headerLastTitleActionCreator(lastTitle));
    };

    if (headerTitle !== thisTitle) SetTitleHeader(thisTitle, headerTitle);
  }, [dispatch, penguin, headerTitle, thisTitle, isCreate, message]);

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
