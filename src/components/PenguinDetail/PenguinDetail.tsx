import { MouseEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import {
  getPenguinThunk,
  resetPenguinThunk,
} from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import iconPhotoEmpty from "../../images/contact-photo-add.png";
import DetailPageStyles from "../../Styles/DetailPageStyles";
import ActionButtons from "../ActionButtons/ActionButtons";
import Messages from "../Messages/Messages";
import { correctAction } from "../Modals/Modals";

interface Props {
  allPenguins: IPenguin[];
  penguin: IPenguin;
}

const PenguinDetail = ({ penguin, allPenguins }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const thisPenguin = useAppSelector((state) => state.penguins.penguin);
  const { allMessages } = useAppSelector((state) => state.messages);

  const [isMessagesSelected, setMessageSelected] = useState(
    document.location.href.includes("#messages")
  );
  useParams();
  let classDescription = "";
  let classTabDescription = "";
  let classTabMessages = "";

  const penguinImage =
    penguin.image === "" && !penguin.imageBackup.includes("/")
      ? iconPhotoEmpty
      : penguin.imageBackup;

  const getDetailPrev = () => {
    const actualPos = allPenguins
      .map((penguin) => penguin.id)
      .indexOf(thisPenguin.id);
    let prevPenguinId = "";

    if (actualPos === 0 || actualPos <= -1) {
      prevPenguinId = allPenguins[allPenguins.length - 1]?.id.toString();
      correctAction("End of list!");
    } else {
      const newPos = actualPos - 1;
      prevPenguinId = allPenguins[newPos]?.id.toString();
    }

    dispatch(resetPenguinThunk());
    dispatch(getPenguinThunk(prevPenguinId));
  };

  const getDetailNext = () => {
    const actualPos = allPenguins.map((e) => e.id).indexOf(thisPenguin.id);
    let nextPenguinId = "";

    if (actualPos === allPenguins.length - 1) {
      nextPenguinId = allPenguins[0]?.id.toString();
      correctAction("Begin of list!");
    } else {
      const newPos = actualPos + 1;
      nextPenguinId = allPenguins[newPos]?.id.toString();
    }

    dispatch(resetPenguinThunk());
    dispatch(getPenguinThunk(nextPenguinId));
  };

  const handleTab = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.title === "messages") {
      setMessageSelected(true);
      navigate("#messages");
    } else {
      setMessageSelected(false);
      navigate("#description");
    }
  };

  if (isMessagesSelected) {
    classDescription = " opacity-none";
    classTabMessages = " tab-selected";
  } else {
    classTabDescription = " tab-selected";
  }

  return (
    <DetailPageStyles className="detail-container">
      <div className="penguin-container">
        <h1 className="detail-name">{penguin.name}</h1>
        <div className="img-container">
          <button
            onClick={getDetailPrev}
            className="imgDetailPrev detailPrev"
            title="btn-prev"
          />
          <div className="penguin--container">
            <img
              src={penguinImage}
              alt={`Pinguino ${penguin.name}`}
              className="detail-image"
            />
          </div>
          <button
            onClick={getDetailNext}
            className="imgDetailNext detailNext"
            title="btn-next"
          />
        </div>
        <div className={`penguin-description`}>
          <ActionButtons penguin={penguin} />
          <span className="category">{penguin.category}</span>
          <div className="detail-tabs">
            <button
              className={`tab-description${classTabDescription}`}
              title="description"
              onClick={handleTab}
            >
              Description
            </button>
            <button
              className={`tab-messages${classTabMessages}`}
              title="messages"
              onClick={handleTab}
            >
              Messages
            </button>
            {isMessagesSelected ? (
              <Messages allMessages={allMessages} penguin={penguin} />
            ) : (
              <span className={`detail-description${classDescription}`}>
                {penguin.description}
              </span>
            )}
          </div>
        </div>
      </div>
    </DetailPageStyles>
  );
};

export default PenguinDetail;
