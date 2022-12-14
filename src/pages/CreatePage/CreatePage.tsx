import React, { useEffect } from "react";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import CreateForm from "../../components/CreateForm/CreateForm";
import CreateMessageForm from "../../components/CreateMessage/CreateMessageForm";
import "../../styles/FormsStyles.css";

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

  const thisTitle = isCreate ? `New ${form}` : `${form}`;

  useEffect(() => {
    const SetTitleHeader = (title: string, lastTitle: string) => {
      dispatch(headerTitleActionCreator(title));
      dispatch(headerLastTitleActionCreator(lastTitle));
    };

    if (headerTitle !== thisTitle) SetTitleHeader(thisTitle, headerTitle);
  }, [dispatch, penguin, headerTitle, thisTitle, isCreate, message]);

  return (
    <div className="create-container">
      {form === "Message" || form === "Reply" ? (
        <CreateMessageForm message={message} />
      ) : (
        <CreateForm penguin={penguin} />
      )}
    </div>
  );
};

export default CreatePage;
