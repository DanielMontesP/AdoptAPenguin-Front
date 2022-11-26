import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  isModalOpenActionCreator,
  modalMessageActionCreator,
  modalTypeActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch } from "../../app/redux/hooks/hooks";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import { Modal } from "../Modals/ModalPrompt";

interface Props {
  penguin: IPenguin;
}

const EditButtons = ({ penguin }: Props): JSX.Element => {
  const [isModalOpen, setModal] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  let message = "";

  const handleDelete = (): void => {
    message = "Delete permanently from database? ";
    const newModalType = "delete";

    dispatch(modalTypeActionCreator(newModalType));
    dispatch(modalMessageActionCreator(message));

    setModal((prevState) => !prevState);
    dispatch(isModalOpenActionCreator(true));
  };

  const handleEdit = () => {
    setModal(false);
    dispatch(isModalOpenActionCreator(false));

    navigate(`/penguins/id=${penguin.id}`);
  };

  return (
    <div className="edit-buttons-container">
      <button className={`menu-Edit`} onClick={handleEdit} title="btn-edit">
        <h3 className="menu-icon-label-vertical"> Edit</h3>
      </button>
      <button
        title="btn-delete"
        placeholder="btn-delete"
        className={`animatedDelete`}
        onClick={handleDelete}
      >
        <h3 className="menu-icon-label-vertical"> Delete</h3>
      </button>
      {isModalOpen && (
        <Modal
          closeModal={setModal}
          type="delete"
          idToProcess={penguin.id}
          content={message}
          form="Message"
        />
      )}
    </div>
  );
};

export default EditButtons;
