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
  getMessageThunk,
} from "../../app/redux/thunks/messageThunk/messageThunk";
import { IMessage } from "../../app/redux/types/message/messageInterfaces";

let modFields = [""];
let imageAdded = false;

interface Props {
  messageId?: string;
}

const CreateMessageForm = ({ messageId }: Props): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { penguin } = useAppSelector((state) => state.penguins);
  const { user } = useAppSelector((state) => state);
  const { headerTitle } = useAppSelector((state) => state.ui);

  const { message } = useAppSelector((state) => state.messages);
  const isCreate = headerTitle === "New message...";

  const [formData, setFormData] = useState<IMessage>(blankMessageData);

  const processCreate = (type: string) => {
    dispatch(createMessageThunk(formData));
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void => {
    event.preventDefault();

    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
      idUser: user.id,
      idPenguin: penguin.id,
      data: getCurrentDate(),
      read: false,
    });

    modFields.push(event.target.id);
  };

  const processEdit = (imageAdded: boolean) => {
    modFields = cleanArray(modFields);
    const newFormData = new FormData();

    newFormData.append("idUser", formData.idUser);
    newFormData.append("idPenguin", formData.idPenguin);
    newFormData.append("subject", formData.subject);
    newFormData.append("content", formData.content);
    newFormData.append("data", formData.data);
    newFormData.append("read", JSON.stringify(formData.read));

    dispatch(
      editMessageThunk(formData, "Update fields: " + modFields.join(", "))
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    try {
      if (isCreate) {
        processCreate("New");
      } else {
        processEdit(imageAdded);
      }

      setFormData(blankMessageData);

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

  useEffect(() => {
    if (messageId) {
      setFormData(message);
    }
  }, [dispatch, message, messageId]);

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
          value={formData.subject}
          autoComplete="off"
          className="form-input"
          onChange={handleInputChange}
        />

        <label htmlFor="content">Message</label>
        <input
          id="content"
          type="text"
          placeholder="Message"
          value={formData.content}
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
