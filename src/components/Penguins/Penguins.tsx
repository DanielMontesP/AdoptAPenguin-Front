import Penguin from "../Penguin/Penguin";
import { finishedLoadingActionCreator } from "../../app/redux/features/uiSlice/uiSlice";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import PagesStyles from "../../Styles/PagesStyles";
import { penguins } from "../../penguins-export.js";

const loadedState = finishedLoadingActionCreator();
const hidderDelete = loadedState ? "" : " display-none";

interface Props {
  allPenguins: IPenguin[];
}

const Penguins = ({ allPenguins }: Props): JSX.Element => {
  const listPenguins = allPenguins.length >= 1 ? allPenguins : penguins;

  return (
    <PagesStyles
      className={`penguins-container${hidderDelete}`}
      title="penguins-container"
    >
      <h3 className={"view-list-counter"}>
        {allPenguins.length} results found.
      </h3>
      {listPenguins.map((penguin, index) => {
        return <Penguin key={index} penguin={penguin} />;
      })}
    </PagesStyles>
  );
};

export default Penguins;
