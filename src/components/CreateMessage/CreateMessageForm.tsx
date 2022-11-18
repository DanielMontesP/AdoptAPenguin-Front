import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { cleanArray, getCurrentDate } from "../../utils/utils";
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
} from "../../app/redux/initializers/iniMessages";

let modFields = [""];

interface Props {
  message: IMessage;
}

const CreateMessageForm = ({ message }: Props): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const idUser = useAppSelector((state) => state.user.id);
  const { penguin } = useAppSelector((state) => state.penguins);
  const { headerTitle } = useAppSelector((state) => state.ui);

  const isCreate = headerTitle === "New message...";

  const [formData, setFormData] = useState(
    isCreate ? newMessageData(idUser, penguin.id) : blankMessageData
  );

  const processCreate = (type: string) => {
    formData.idPenguin = penguin.id;
    formData.idUser = idUser;
    formData.data = getCurrentDate();

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
          ...message,
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
    } else {
      processEdit();
    }

    dispatch(getMessagesThunk(penguin.id));
    setFormData(blankMessageData);
    dispatch(resetMessageThunk());

    navigate(`/detail/${penguin.id}#messages`);
  };

  return (
    <div className="container">
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className="form-create"
        title="form-create"
      >
        <label htmlFor="description">Send To</label>
        <input
          id="sendto"
          type="text"
          placeholder="Send To"
          value={penguin.name}
          autoComplete="off"
          className="form-input"
          disabled
        />
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          type="text"
          placeholder="Subject"
          value={formData.subject || message.subject}
          autoComplete="off"
          className="form-input"
          onChange={handleInputChange}
        />

        <label htmlFor="content">Message</label>
        <input
          id="content"
          type="text"
          placeholder="Message"
          value={formData.content || message.content}
          autoComplete="off"
          className="input-description"
          onChange={handleInputChange}
        />

        <button type="submit" className="bt-save" placeholder="bt-save">
          {isCreate ? "Send" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default CreateMessageForm;
