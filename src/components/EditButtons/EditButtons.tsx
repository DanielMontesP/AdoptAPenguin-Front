import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  isModalOpenActionCreator,
  modalMessageActionCreator,
  modalTypeActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { getPenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import { Modal } from "../Modals/ModalPrompt";

interface Props {
  penguin: IPenguin;
}

const EditButtons = ({ penguin }: Props): JSX.Element => {
  const idUser = useAppSelector((state) => state.user.id);
  const { headerTitle } = useAppSelector((state) => state.ui);

  const isDetailPage = headerTitle === "Detail" ? true : false;
  const isHomePage = headerTitle === "Home" ? true : false;

  const [, setMenu] = useState(false);
  const [isModalOpen, setModal] = useState(false);

  const { modalMessage } = useAppSelector((state) => state.ui);
  const { modalType } = useAppSelector((state) => state.ui);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isFav = penguin.favs?.includes(idUser);

  const handleDelete = (): void => {
    const message = "Delete permanently from database? ";
    const newModalType = "delete";

    dispatch(modalTypeActionCreator(newModalType));
    dispatch(modalMessageActionCreator(message));

    setModal((prevState) => !prevState);
    dispatch(isModalOpenActionCreator(true));
  };

  const handleEdit = () => {
    setMenu((prevState) => !prevState);

    dispatch(getPenguinThunk(penguin.id));

    navigate(`/penguins/id=${penguin.id}`);
  };

  const selectIconEdit = isFav
    ? " bounce animatedEdit"
    : " bounce2 animatedEdit";

  const btContainerClasses = () => {
    const newClass = !isDetailPage
      ? "edit-buttons-container"
      : "detail-buttons-container";
    return newClass;
  };

  const HidderDelete = isHomePage ? " no-visible" : "";

  const classButtonDelete = isFav
    ? " bounce animatedDelete"
    : " bounce2 animatedDelete";

  return (
    <div className={btContainerClasses()}>
      <button
        className={`animated${selectIconEdit}`}
        onClick={handleEdit}
        title="btn-edit"
      />
      <button
        title="btn-delete"
        placeholder="btn-delete"
        className={`animated${classButtonDelete}${HidderDelete}`}
        onClick={handleDelete}
      />
      {isModalOpen && (
        <Modal
          type={modalType}
          idToProcess={penguin.id}
          content={modalMessage}
          closeModal={setModal}
          form="Penguin"
        />
      )}
    </div>
  );
};

export default EditButtons;
