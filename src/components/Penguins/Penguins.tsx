import Penguin from "../Penguin/Penguin";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import PagesStyles from "../../Styles/PagesStyles";

interface Props {
  allPenguins: IPenguin[];
}

const Penguins = ({ allPenguins }: Props): JSX.Element => {
  return (
    <PagesStyles className={`penguins-container`} title="penguins-container">
      <h3 className={"view-list-counter"}>
        {allPenguins.length} results found.
      </h3>
      {allPenguins.map((penguin, index) => {
        return <Penguin key={penguin.id} penguin={penguin} />;
      })}
    </PagesStyles>
  );
};

export default Penguins;
