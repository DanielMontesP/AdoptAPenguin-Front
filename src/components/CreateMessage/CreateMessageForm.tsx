import { ChangeEvent, FormEvent, useState } from "react";
import { wrongAction } from "../Modals/Modals";
import { useAppSelector } from "../../app/redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { blankMessageData, cleanArray } from "../../utils/utils";
import { IMessage } from "../../app/redux/types/message/messageInterfaces";

interface Props {
  message: IMessage;
}

let modFields = [""];
let imageAdded = false;

const CreateMessageForm = ({ message }: Props): JSX.Element => {
  const navigate = useNavigate();

  const { penguin } = useAppSelector((state) => state.penguins);

  const isCreate = document.location.href.includes("/create");

  const { headerLastTitle } = useAppSelector((state) => state.ui);

  const [formData, setFormData] = useState(blankMessageData);

  const processCreate = (type: string) => {
    const newFormData = new FormData();

    newFormData.append("subject", formData.subject);
    newFormData.append("content", formData.content);
    newFormData.append("data", formData.data);
    newFormData.append("idPenguin", formData.idPenguin);
    newFormData.append("read", JSON.stringify(false));
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
      id: message.id,
    });

    modFields.push(event.target.id);
  };

  const processEdit = (imageAdded: boolean) => {
    modFields = cleanArray(modFields);
    const newFormData = new FormData();

    if (imageAdded) {
      newFormData.append("_id", formData.id);
      newFormData.append("name", formData.subject);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    try {
      if (isCreate) {
        processCreate("New");
      } else {
        processEdit(imageAdded);
      }

      setFormData(blankMessageData);

      let navigateTo = "";

      switch (headerLastTitle) {
        case "Favourites":
          navigateTo = "/penguins/favs";
          break;
        case "Home":
          navigateTo = "/penguins";
          break;
        case "Likes":
          navigateTo = "/penguins/likes";
          break;
        default:
          navigateTo = "/penguins";
      }

      navigate(navigateTo);
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
          value={!isCreate ? formData.subject || message.subject : ""}
          autoComplete="off"
          className="form-input"
          onChange={handleInputChange}
        />

        <label htmlFor="content">Message</label>
        <input
          id="content"
          type="text"
          placeholder="Message"
          value={!isCreate ? message.content : ""}
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
