import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import {
  cleanArray,
  getCurrentDate,
  setMessageRead,
} from "../../functions/sysHandlers/sysHandlers";
import {
  createMessageThunk,
  editMessageThunk,
  getMessagesThunk,
  resetMessageThunk,
} from "../../app/redux/thunks/messageThunk/messageThunk";
import { IMessage } from "../../app/redux/types/message/messageInterfaces";
import {
  blankMessageData,
  newMessageData,
  newReply,
} from "../../app/redux/initializers/iniMessages";
import { headerTitleActionCreator } from "../../app/redux/features/uiSlice/uiSlice";

let modFields = [""];

interface Props {
  message: IMessage;
}

const CreateMessageForm = ({ message }: Props): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const idUser = useAppSelector((state) => state.user.id);
  const { penguin } = useAppSelector((state) => state.penguins);
  const { headerTitle, headerLastTitle } = useAppSelector((state) => state.ui);

  const isCreate = headerTitle === "New..." && headerLastTitle !== "Reply";
  const isReply = headerLastTitle === "Reply";

  const [formData, setFormData] = useState(
    isCreate
      ? newMessageData(idUser, penguin.id)
      : isReply
      ? newReply(idUser, penguin.id, message.subject)
      : blankMessageData
  );

  const processCreate = (type: string) => {
    if (type === "create") {
      formData.idPenguin = penguin.id;
      formData.idUser = idUser;
      formData.data = getCurrentDate();
    } else {
      formData.subject = message.subject;
    }
    dispatch(createMessageThunk(formData));
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void => {
    event.preventDefault();

    isCreate
      ? setFormData({
          ...formData,
          [event.target.id]: event.target.value,
        })
      : setFormData({
          ...(formData.id ? formData : message),
          [event.target.id]: event.target.value,
        });

    modFields.push(event.target.id);
  };

  const processEdit = () => {
    modFields = cleanArray(modFields);

    dispatch(
      editMessageThunk(formData, "Update fields: " + modFields.join(", "))
    );
    dispatch(getMessagesThunk(penguin.id));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (isCreate) {
      processCreate("New");
      dispatch(getMessagesThunk(penguin.id));
      setFormData(blankMessageData);
      dispatch(resetMessageThunk());

      navigate(`/detail/${penguin.id}#messages`);
    } else if (event.currentTarget.outerText?.includes("Reply")) {
      handleCreateReply();
    } else {
      processEdit();
      dispatch(getMessagesThunk(penguin.id));
      setFormData(blankMessageData);
      dispatch(resetMessageThunk());

      navigate(`/detail/${penguin.id}#messages`);
    }
  };

  const handleCreateReply = (): void => {
    dispatch(headerTitleActionCreator("Reply"));
    navigate(`/message/create`);
  };

  const handleMessageRead = () => {
    setMessageRead(message, dispatch);
  };
  const classRead = message.read ? "message-read" : "message-unread";
  const textRead = message.read ? "Mark as unread" : "Mark as read";

  return (
    <div className="container">
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className="form-create"
        title="form-create"
      >
        <div className={classRead} onClick={handleMessageRead}>
          {textRead}
        </div>
        <label htmlFor="description">Send To</label>
        <input
          id="sendto"
          type="text"
          placeholder="Send To"
          className="form-input-disabled"
          value={penguin.name}
          readOnly
        />
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          type="text"
          placeholder="Subject"
          value={formData.subject || message.subject}
          autoComplete="off"
          className={isCreate || isReply ? "form-input" : "form-input-disabled"}
          onChange={handleInputChange}
        />

        <label htmlFor="content">Message</label>
        <input
          id="content"
          type="text"
          placeholder="Message"
          value={formData.content || message.content}
          autoComplete="off"
          className={
            isCreate || isReply
              ? "input-description"
              : "input-description form-input-disabled"
          }
          onChange={handleInputChange}
        />

        {isCreate ? (
          <button
            type="submit"
            className="bt-message-save"
            placeholder="bt-save"
          >
            Send
          </button>
        ) : (
          <button
            type="submit"
            className="bt-message-save"
            placeholder="bt-reply"
            id="bt-reply"
          >
            Reply
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateMessageForm;
