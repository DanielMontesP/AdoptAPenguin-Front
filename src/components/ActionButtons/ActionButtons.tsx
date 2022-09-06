import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  modalMessageActionCreator,
  modalTypeActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { editPenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import { cleanArray, blankFormData } from "../../utils/utils";
import { Modal } from "../Modals/ModalPrompt";

interface Props {
  penguin: IPenguin;
}

const ActionButtons = ({ penguin }: Props): JSX.Element => {
  const idUser = useAppSelector((state) => state.user.id);
  const { headerTitle } = useAppSelector((state) => state.ui);

  const isDetailPage = headerTitle === "Detail" ? true : false;
  const isHomePage = headerTitle === "Home" ? true : false;

  const [, setMenu] = useState(false);
  const [, setFormData] = useState<IPenguin>(blankFormData);
  const [isModalOpen, setModal] = useState(false);

  const { modalMessage } = useAppSelector((state) => state.ui);
  const { modalType } = useAppSelector((state) => state.ui);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isFav = penguin.favs.includes(idUser);
  const isLiker = penguin.likers.includes(idUser);

  const { user } = useAppSelector((state) => state);

  const handleDelete = (): void => {
    const message = "Delete permanently from database? ";
    const newModalType = "delete";

    dispatch(modalTypeActionCreator(newModalType));
    dispatch(modalMessageActionCreator(message));

    setModal((prevState) => !prevState);
  };

  const handleEdit = () => {
    setMenu((prevState) => !prevState);

    navigate(`/users/edit/${user.id}`);
  };

  const deleteFromLikers = () => {
    const newData = { ...penguin };
    newData.likers = newData.likers.filter((liker) => liker !== idUser);
    newData.likes = penguin.likes >= 1 ? penguin.likes - 1 : penguin.likes;

    setFormData(newData);
    dispatch(editPenguinThunk(newData, "Delete Like."));
  };

  const addToLikers = () => {
    const newData = { ...penguin };
    newData.likers = newData.likers.concat(idUser);
    newData.likes = penguin.likes + 1;

    setFormData(newData);

    dispatch(editPenguinThunk(newData, "Add Like."));
  };

  const handleLikes = () => {
    if (Array(penguin.likers)) {
      cleanArray(penguin.likers);

      isLiker ? deleteFromLikers() : addToLikers();
    }
  };

  const deleteFromFavs = () => {
    const newData = { ...penguin };
    newData.favs = penguin.favs.filter((fav) => fav !== idUser);

    setFormData(newData);
    dispatch(editPenguinThunk(newData, "Delete from favorites."));
  };

  const addToFavs = () => {
    const newData = { ...penguin };
    newData.favs = penguin.favs.concat(idUser);

    setFormData(newData);
    dispatch(editPenguinThunk(newData, "Add to favorites."));
  };

  const handleFavs = () => {
    if (Array(penguin.favs)) {
      cleanArray(penguin.favs);

      isFav ? deleteFromFavs() : addToFavs();

      navigate("/penguins/favs");
    }
  };

  const selectIconFav = isFav
    ? " bounce animatedFavDelete"
    : " bounce2 animatedFav";

  const selectIconLike = isLiker
    ? " bounce animatedLike"
    : ` bounce2 animatedLikeInit`;

  const btContainerClasses = () => {
    const newClass = !isDetailPage
      ? "buttons-container"
      : "detail-buttons-container";
    return newClass;
  };

  const HidderDelete = isHomePage ? " no-visible" : "";

  const classButtonDelete = " bounce animatedDelete";

  return (
    <div className={btContainerClasses()}>
      <button
        placeholder="btn-favs"
        onClick={handleFavs}
        className={`animated${selectIconFav}`}
      />
      <button
        className={`animated bounce animatedEdit`}
        onClick={handleEdit}
        title="btn-edit"
      />
      <button
        title="btn-delete"
        placeholder="btn-delete"
        className={`animated${classButtonDelete}${HidderDelete}`}
        onClick={handleDelete}
      />
      <span className={`likes`}>{penguin.likes}</span>
      <button
        className={`animated${selectIconLike}`}
        onClick={handleLikes}
        title="btn-likes"
      />

      {isModalOpen && (
        <Modal
          type={modalType}
          idPenguin={penguin.id}
          message={modalMessage}
          closeModal={setModal}
        />
      )}
    </div>
  );
};

export default ActionButtons;
