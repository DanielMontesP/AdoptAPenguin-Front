import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { wrongAction } from "../Modals/Modals";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import {
  blankMessageData,
  cleanArray,
  getCurrentDate,
} from "../../utils/utils";
import {
  createMessageThunk,
  editMessageThunk,
  getMessagesThunk,
  getMessageThunk,
  resetMessageThunk,
} from "../../app/redux/thunks/messageThunk/messageThunk";

let modFields = [""];

interface Props {
  messageId?: string;
}

const CreateMessageForm = ({ messageId }: Props): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const idUser = useAppSelector((state) => state.user.id);
  const { penguin } = useAppSelector((state) => state.penguins);
  const { headerTitle } = useAppSelector((state) => state.ui);

  const { message } = useAppSelector((state) => state.messages);
  const isCreate = headerTitle === "New message...";

  const [formData, setFormData] = useState(blankMessageData);

  const processCreate = (type: string) => {
    const newFormData = new FormData();

    newFormData.append("idUser", formData.idUser);
    newFormData.append("idPenguin", formData.idPenguin);
    newFormData.append("subject", formData.subject);
    newFormData.append("content", formData.content);
    newFormData.append("data", formData.data);
    newFormData.append("read", JSON.stringify(false));

    dispatch(createMessageThunk(newFormData));
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void => {
    event.preventDefault();

    isCreate
      ? setFormData({
          ...formData,
          [event.target.id]: event.target.value,
          idUser: idUser,
          idPenguin: penguin.id.toString(),
          data: getCurrentDate().toString(),
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
    try {
      if (isCreate) {
        processCreate("New");
      } else {
        processEdit();
      }

      dispatch(getMessagesThunk(penguin.id));
      setFormData(blankMessageData);
      dispatch(resetMessageThunk());

      navigate(`/detail/${penguin.id}#messages`);
    } catch (error) {
      wrongAction("Error:" + error);
    }
  };

  useEffect(() => {
    if (messageId) {
      dispatch(getMessageThunk(messageId));
    }
  }, [dispatch, messageId]);

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
