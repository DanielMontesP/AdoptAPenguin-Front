import { useState } from "react";
import {
  isModalOpenActionCreator,
  modalMessageActionCreator,
  modalTypeActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch } from "../../app/redux/hooks/hooks";
import { getPenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";

interface Props {
  penguin: IPenguin;
}

const EditActions = ({ penguin }: Props): JSX.Element => {
  const [, setModal] = useState(false);

  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    const message = "Options: ";
    const newModalType = "Edit";

    dispatch(getPenguinThunk(penguin.id));
    dispatch(modalTypeActionCreator(newModalType));
    dispatch(modalMessageActionCreator(message));

    setModal((prevState) => !prevState);
    dispatch(isModalOpenActionCreator(true));
  };

  return (
    <button
      title="btn-click"
      placeholder="btn-click"
      className={`bt-Edit`}
      onClick={handleClick}
    />
  );
};

export default EditActions;
