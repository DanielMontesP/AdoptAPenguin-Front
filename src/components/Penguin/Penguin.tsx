import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import { toPascalCase } from "../../functions/sysHandlers/sysHandlers";
import iconPhotoEmpty from "../../images/contact-photo-add.png";
import { Modal } from "../Modals/ModalPrompt";
import ActionButtons from "../ActionButtons/ActionButtons";
import { getPenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { getMessagesThunk } from "../../app/redux/thunks/messageThunk/messageThunk";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import EditActions from "../EditActions/EditActions";
import { handleNoConexion } from "../../functions/uiHandlers/uiHandlers";
interface Props {
  penguin: IPenguin;
}

const Penguin = ({ penguin }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.ui);
  const { user } = useAppSelector((state) => state);

  const [isModalOpen, setModal] = useState(false);
  const message = "Delete penguin: " + penguin?.name + "?";
  const navigate = useNavigate();

  const handleMoreDetail = () => {
    if (!loading) {
      dispatch(getPenguinThunk(penguin.id));
      dispatch(getMessagesThunk(penguin.id));

      navigate(`/detail/${penguin.id}`);
    } else {
      handleNoConexion(dispatch, user.id);
    }
  };

  const isURL = penguin.imageBackup?.includes("/");
  const noImage = penguin.image === "" && !isURL;
  const pathImage =
    penguin.imageBackup !== "" ? penguin.imageBackup : penguin.imageResized;

  const penguinImage = noImage ? iconPhotoEmpty : pathImage;

  const contactImageClass =
    penguin.image === "" && !isURL ? " iconPhotoEmpty" : "";

  return (
    <div className="penguin-container">
      <h1 className="penguin-name">{toPascalCase(`${penguin.name}`)}</h1>
      <EditActions penguin={penguin} />
      <div className="penguin-image-container link" onClick={handleMoreDetail}>
        <img
          src={penguinImage}
          alt={penguin.name}
          className={`penguin-image${contactImageClass}`}
        />
      </div>
      <ActionButtons penguin={penguin} />
      <div className="penguin-datalist">
        <span className="category">{toPascalCase(`${penguin.category}`)}</span>
      </div>
      <div
        className="penguin-description link"
        onClick={handleMoreDetail}
        placeholder="bt-more-detail"
      >
        {penguin.description?.substring(0, 100)}
      </div>

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

export default Penguin;
