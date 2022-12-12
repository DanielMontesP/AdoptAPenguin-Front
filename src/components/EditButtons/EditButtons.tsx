import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
  isModalOpenActionCreator,
  modalMessageActionCreator,
  modalTypeActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { getMessagesThunk } from "../../app/redux/thunks/messageThunk/messageThunk";
import { getPenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import { handleNoConexion } from "../../functions/uiHandlers/uiHandlers";

interface Props {
  penguin: IPenguin;
}

const EditButtons = ({ penguin }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [, setModal] = useState(false);

  const { loading } = useAppSelector((state) => state.ui);
  const { user } = useAppSelector((state) => state);

  let message = "";

  const handleDelete = (): void => {
    if (!loading) {
      message = "Delete permanently from database? ";
      const newModalType = "delete";

      dispatch(modalTypeActionCreator(newModalType));
      dispatch(modalMessageActionCreator(message));

      setModal((prevState) => !prevState);
      dispatch(isModalOpenActionCreator(true));
    } else {
      handleNoConexion(dispatch, user.id);
    }
  };

  const handleEdit = () => {
    if (!loading) {
      dispatch(getPenguinThunk(penguin.id));
      if (penguin.id !== "") {
        dispatch(getMessagesThunk(penguin.id));
      }
      setModal((prevState) => !prevState);
      dispatch(isModalOpenActionCreator(false));

      dispatch(headerTitleActionCreator("Edit..."));
      dispatch(headerLastTitleActionCreator("Home"));
      navigate(`/penguins/id=${penguin.id}`);
    } else {
      handleNoConexion(dispatch, user.id);
    }
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
    </div>
  );
};

export default EditButtons;
