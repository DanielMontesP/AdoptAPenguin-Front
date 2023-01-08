import { useNavigate } from "react-router-dom";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import { toPascalCase } from "../../functions/sysHandlers/sysHandlers";
import iconPhotoEmpty from "../../images/contact-photo-add.png";
import ActionButtons from "../ActionButtons/ActionButtons";
import { getPenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { getMessagesThunk } from "../../app/redux/thunks/messageThunk/messageThunk";
import { useAppDispatch } from "../../app/redux/hooks/hooks";
import EditActions from "../EditActions/EditActions";
interface Props {
  penguin: IPenguin;
}

const Penguin = ({ penguin }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleMoreDetail = () => {
    dispatch(getPenguinThunk(penguin.id));
    dispatch(getMessagesThunk(penguin.id));

    navigate(`/detail/${penguin.id}`);
  };

  const isURL = penguin.imageBackup?.includes("/");
  const noImage = penguin.imageBackup === "" && !isURL;
  const pathImage =
    penguin.imageBackup !== "" ? penguin.imageBackup : penguin.image.toString();

  const penguinImage = noImage ? iconPhotoEmpty : pathImage;

  const contactImageClass =
    penguin.image === "" && !isURL ? " iconPhotoEmpty" : "";

  return (
    <div className="penguin-container">
      <div className="penguin-header">
        <h1 className="penguin-name">{toPascalCase(`${penguin.name}`)}</h1>
        <EditActions penguin={penguin} />
      </div>
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

        <div
          className="penguin-description link"
          onClick={handleMoreDetail}
          placeholder="bt-more-detail"
        >
          {penguin.description?.substring(0, 100)}
        </div>
      </div>
    </div>
  );
};

export default Penguin;
