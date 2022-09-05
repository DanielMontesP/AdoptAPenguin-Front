import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import {
  getPenguinThunk,
  resetPenguinThunk,
} from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import iconPhotoEmpty from "../../images/contact-photo-add.png";
import ActionButtons from "../ActionButtons/ActionButtons";
import { correctAction } from "../Modals/Modals";

interface Props {
  allPenguins: IPenguin[];
  penguin: IPenguin;
}

const PenguinDetail = ({ penguin, allPenguins }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const thisPenguin = useAppSelector((state) => state.penguins.penguin);

  const penguinImage =
    penguin.image === "" && !penguin.imageBackup.includes("/")
      ? iconPhotoEmpty
      : penguin.imageBackup;

  const getDetailPrev = () => {
    const actualPos = allPenguins.map((e) => e.id).indexOf(thisPenguin.id);
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

  return (
    <div className="detail-container">
      <h1 className="display-none">Detail</h1>
      <h2 className="detail-name">{penguin.name}</h2>

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

      <div className="penguin-description">
        <ActionButtons penguin={penguin} />
        <span className="category">{penguin.category}</span>
        <span className="detail-description">{penguin.description}</span>
      </div>
    </div>
  );
};

export default PenguinDetail;
