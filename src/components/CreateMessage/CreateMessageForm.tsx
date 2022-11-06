import { ChangeEvent, FormEvent, useState } from "react";
import { wrongAction } from "../Modals/Modals";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import {
  blankMessageData,
  cleanArray,
  getCurrentDate,
} from "../../utils/utils";
import { IMessage } from "../../app/redux/types/message/messageInterfaces";
import {
  createMessageThunk,
  editMessageThunk,
} from "../../app/redux/thunks/messageThunk/messageThunk";

interface Props {
  message: IMessage;
}

let modFields = [""];
let imageAdded = false;

const CreateMessageForm = ({ message }: Props): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { penguin } = useAppSelector((state) => state.penguins);
  const { user } = useAppSelector((state) => state);
  const { headerTitle } = useAppSelector((state) => state.ui);

  const isCreate = headerTitle === "New message...";

  const [formData, setFormData] = useState(blankMessageData);

  const processCreate = (type: string) => {
    dispatch(createMessageThunk(formData));
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void => {
    event.preventDefault();

    setFormData({
      ...(formData.subject ||
      formData.content ||
      formData.data ||
      formData.idPenguin ||
      formData.idUser
        ? formData
        : message),
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
          value={message.idUser || penguin.name}
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
