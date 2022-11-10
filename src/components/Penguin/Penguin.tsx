import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import { toPascalCase } from "../../utils/utils";
import iconPhotoEmpty from "../../images/contact-photo-add.png";
import { Modal } from "../Modals/ModalPrompt";
import ActionButtons from "../ActionButtons/ActionButtons";
interface Props {
  penguin: IPenguin;
}

const Penguin = ({ penguin }: Props): JSX.Element => {
  const [isModalOpen, setModal] = useState(false);
  const message = "Delete penguin: " + penguin?.name + "?";
  const navigate = useNavigate();

  const handleMoreDetail = () => {
    navigate(`/detail/${penguin.id}`);
  };

  const isURL = penguin.imageBackup?.includes("/");

  const penguinImage =
    penguin.image === "" && !isURL ? iconPhotoEmpty : penguin.imageBackup;

  const contactImageClass =
    penguin.image === "" && !isURL ? " iconPhotoEmpty" : "";

  return (
    <div className="penguin-container">
      <ActionButtons penguin={penguin} />

      <h1 className="penguin-name">{toPascalCase(`${penguin.name}`)}</h1>

      <div className="penguin-image-container">
        <img
          src={penguinImage}
          alt={penguin.name}
          className={`penguin-image${contactImageClass}`}
        />
      </div>
      <div className="penguin-datalist">
        <span className="category">{toPascalCase(`${penguin.category}`)}</span>
      </div>
      <div className="penguin-description">
        {penguin.description?.substring(0, 100)}

        <span
          className="link effect"
          onClick={handleMoreDetail}
          title="btn-detail"
        >
          ...More
        </span>
      </div>

      {isModalOpen && (
        <Modal
          closeModal={setModal}
          type="delete"
          idPenguin={penguin.id}
          message={message}
        />
      )}
    </div>
  );
};

export default Penguin;
