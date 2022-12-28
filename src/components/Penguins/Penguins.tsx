import Penguin from "../Penguin/Penguin";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import "../../styles/PagesStyles.css";
interface Props {
  allPenguins: IPenguin[];
}

const Penguins = ({ allPenguins }: Props): JSX.Element => {
  return (
    <div className={`penguins-container`} title="penguins-container">
      <h3 className={"penguins-counter"}>
        {allPenguins.length} results found.
      </h3>
      {allPenguins.map((penguin, index) => {
        return <Penguin key={penguin.id} penguin={penguin} />;
      })}
    </div>
  );
};

export default Penguins;
