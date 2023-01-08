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

interface Props {
  penguin: IPenguin;
}

const EditButtons = ({ penguin }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, isModalOpen } = useAppSelector((state) => state.ui);

  let message = "";

  const handleDelete = (): void => {
    if (!loading) {
      message = "Delete permanently from database? ";
      const newModalType = "delete";

      dispatch(modalTypeActionCreator(newModalType));
      dispatch(modalMessageActionCreator(message));

      dispatch(isModalOpenActionCreator(!isModalOpen));
    }
  };

  const handleEdit = () => {
    if (!loading) {
      dispatch(getPenguinThunk(penguin.id));
      if (penguin.id !== "") {
        dispatch(getMessagesThunk(penguin.id));
      }

      dispatch(isModalOpenActionCreator(!isModalOpen));

      dispatch(headerTitleActionCreator("Edit..."));
      dispatch(headerLastTitleActionCreator("Home"));
      navigate(`/penguins/id=${penguin.id}`);
    }
  };

  return (
    <div className="penguin-actions-edit">
      <button className={`modal-edit`} onClick={handleEdit} title="btn-edit">
        Edit
      </button>
      <button
        title="btn-delete"
        placeholder="btn-delete"
        className={`modal-delete`}
        onClick={handleDelete}
      >
        {" "}
        Delete
      </button>
    </div>
  );
};

export default EditButtons;
