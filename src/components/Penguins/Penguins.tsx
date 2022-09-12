import Penguin from "../Penguin/Penguin";
import { finishedLoadingActionCreator } from "../../app/redux/features/uiSlice/uiSlice";

import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import PagesStyles from "../../Styles/PagesStyles";
// import { useAppSelector } from "../../app/redux/hooks/hooks";

const loadedState = finishedLoadingActionCreator();
const hidderDelete = loadedState ? "" : " display-none";

interface Props {
  allPenguins: IPenguin[];
}

const Penguins = ({ allPenguins }: Props): JSX.Element => {
  // const { modalType } = useAppSelector((state) => state.ui);

  // const classSearchTitle =
  //   modalType === "FFeature" ? "search-title" : "display-none";

  return (
    <PagesStyles
      className={`penguins-container${hidderDelete}`}
      title="penguins-container"
    >
      <h3 className={"search-title"}>{allPenguins.length} result/s found.</h3>
      {allPenguins.map((penguin, index) => {
        return <Penguin key={index} penguin={penguin} />;
      })}
    </PagesStyles>
  );
};

export default Penguins;
